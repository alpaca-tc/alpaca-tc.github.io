---
layout: post
title: Gemを書くときに知っておきたい3つの事
date: 2014-02-18 20:52
comments: true
categories: ruby
---

先日から書き続けていた[CommentExtractor](https://github.com/alpaca-tc/comment_extractor)が、大枠完成しました。

<img class="image_on_frame center" src="/images/blog/i-have-almost-finished-implementing-comment-parser/capture.png" alt="CommentExtractor" />

さて、今回Gemを書くときに役に立った、便利なTipsを幾つか紹介します！

<!-- more -->

内容はバラバラです。笑

1. READMEに視覚情報を追加する
2. RubyGemsからGemを削除する
3. RSpecをキレイに書く

## 1.READMEに視覚情報を追加する

READMEには視覚的なバッヂを追加出来ます。Gemを書くときには、ぜひとも入れておきたい情報ですね。

- [![Gem Version](https://badge.fury.io/rb/comment_extractor.png)](https://badge.fury.io/rb/comment\_extractor)
- [![Build Status](https://travis-ci.org/alpaca-tc/comment_extractor.png?branch=v1.0.0)](https://travis-ci.org/alpaca-tc/comment\_parser)
- [![Coverage Status](https://coveralls.io/repos/alpaca-tc/comment_extractor/badge.png?branch=v1.0.0)](https://coveralls.io/r/alpaca-tc/comment\_extractor?branch=v1.0.0)

もちろん、登録すれば無料で作ることが出来ます。

詳しくは[コチラの記事](https://elgalu.github.io/2013/add-achievement-badges-to-your-gem-readme/)を読んでみましょう。

## 2.RubyGemsからGemを削除する

間違えてRubyGemsにPushしてしまった！

そんなときに便利なyankコマンド。意外と知られていない。

```sh
gem yank gem_name -v 1.0.0
```

ただ、これをやっても論理削除されるだけのようですねぇ。多分。

このバージョン使うなよ！新しいの使えよ！ってときに使うコマンドだと思います。

## 3.RSpecをキレイに書く

RSpecをキレイに書く方法は、ある程度伝統があります。

- [BetterSpecs](https://betterspecs.org/)
- [Some RSpec Tips and Best Practices](https://bitfluxx.com/2011/05/23/some-rspec-tips-and-best-practices.html)

今回は、ある程度RSpecを書ける人向けに、検索してもあまり出てこない情報(検索しにくい？)を提供したいと思います。

### Syntaxについて

#### be\_truthy, be\_falsy

RSpecが新しくなって、`be_true`, `be_false`→`be_truthy`, `be_falsy`となりました。
今までは、厳密に`true`で無くてもテストが通っちゃいましたからね。

#### 現在の主題であるクラスを取得する

RSpecでは`described_class`というメソッドを使用出来ます。
`describe KlassName do...`で指定したKlassNameが格納されます。

これを使えば、クラス名に依存せずにテストを書く事ができますね。

#### ExampleGroupを作る

ご存知の通り、Railsのテストではcontroller, model, viewで使えるメソッドが大きく異なります。
それは、RSpecのexample\_groupという機能を使って、テストの種類を元にModuleをincludeしているからです。

これを使えば、複数のファイルで共通する内容を簡単に記述する事が出来ます。
次のような感じですね。

```ruby
# spec_helper.rb
RSpec.configure do |config|
  config.include ExampleGroupModuleName, type: :optional, example_group: {
    file_path: Regexp.compile(%w[spec comment_extractor extractor .*.rb].join('[\\\/]'))
  }
end
```

```ruby
RSpec.configure do |config|
  config.add_setting :source_code_path, default: 'spec/assets/source_code'
end

module ExampleGroupModuleName
  def source_code_path(file_name = nil)
    dir = RSpec.configuration.source_code_path
    file_name ? "#{dir}/#{file_name}" : dir
  end

  def self.included(k)
    k.class_eval do
      let(:instance) { described_class.new(source_code) }
      let(:source_code) { source_code_path(file_name) }

      describe '.new' do
        subject { instance }
        let(:file_name) { 'filename.rb' }
        it { expect { subject }.to_not raise_error }
      end
    end
  end
end
```

これを使えば、まとまったテストをスッキリ書く事ができますね。

## まとめ

ざっくばらんに書きました。
Gemを作るのは簡単なので、みなさんも作ってみてください！

では！
