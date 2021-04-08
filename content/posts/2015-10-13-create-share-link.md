---
layout: post
title: シェアリンクの作り方
date: 2015-10-13 21:31
comments: true
categories: rails
---

最近Railsでシェアリンクを実装したので紹介します。
みんなはどうやって実装しているのだろう？  

↓こんなURLね

```
https://alpaca.tc/shares/uIx90S
```

実装面白かったので紹介してみます＞＜

<!-- more -->

ちなみに僕の実装方法は、ポリモーフィックなカラムを持つ`share_links`テーブルを作って、シェアしたいrecordを紐付けることで実現した。  

ユニークなキーが必要なため`id`を使用していてに、2度クエリを発行しているのだけど、パフォーマンスを気にするなら`LAST_INSERT_ID`を使って一度のクエリで済ます方が良い。

```ruby
class CreateShareLinks < ActiveRecord::Migration
  def change
    create_table :share_links do |t|
      t.references :sharable, polymorphic: true, null: false
      t.string :uuid
      t.timestamps null: false

      t.index :uuid, unique: true
      t.index [:sharable_type, :sharable_id], unique: true
    end
  end
end
```

```ruby
# lib/share_link_uuid.rb
require 'digest/sha2'

module ShareLinkUuid
  # URLで使用可能な文字列
  HEX64 = [*('0'..'9'), *('A'..'Z'), *('a'..'z'), '_', '-'].freeze

  def self.generate(id, length)
    digest = Digest::SHA512.hexdigest(id.to_s).to_i(16).to_s(8)

    uuid = digest.gsub(/\d{2}/) do |token|
      HEX64[token.to_i(8).to_s(10).to_i]
    end

    uuid[0...length]
  end
end

# app/models/share_link.rb
class ShareLink < ActiveRecord::Base
  UUID_LENGTH = 6

  belongs_to :sharable, polymorphic: true, required: true
  validates :uuid, absence: { if: :new_record? }, presence: { if: :persisted? }
  validates :sharable_type, inclusion: { in: %w(Item) }
  after_create :save_uuid

  private

  def save_uuid
    @uuid_length ||= UUID_LENGTH
    update_uuid!(@uuid_length)
  rescue ActiveRecord::RecordNotUnique
    # UUIDの長さを増やして再試行
    @uuid_length += 1
    retry
  end

  def update_uuid!(length)
    uuid = ShareLinkUuid.generate(id, length)
    update!(uuid: uuid)
  end

  module Sharable
    extend ActiveSupport::Concern

    included do
      has_one :share_link, as: :sharable, dependent: :destroy

      scope :shared, -> { joins(:share_link) }
      scope :not_shared, -> { where.not(id: shared) }
    end
  end
end

# app/models/item.rb
class Item 
  include ShareLink::Sharable
end
```

```
Rails.application.routes.draw do
  resources :shares, only: [:create], controller: :share_links
end

class ShareLinksController < ApplicationController
  def create
    @share_link = ShareLink.new(share_link_params)

    if @share_link.save
      render format: :json
    else
      render :error
    end
  end

  private

  def share_link_params
    params.require(:share_link).permit(
      :sharable_type, :sharable_id
    ).merge(user: current_user)
  end
end
```


うーん、もっと良い方法ありそうだナ...
