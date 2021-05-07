---
title: ActiveRecordでbitmaskを扱う
date: 2021-05-07 20:00
categories: diary
---

ActiveRecordでbitmaskを扱うgemを数年前に書きました。  
[alpaca-tc/active_record_bitmask](https://github.com/alpaca-tc/active_record_bitmask)

ぼちぼちデキはいいんですが、今まで宣伝し忘れて居たので紹介します。

## bitmaskを扱えると何が嬉しいのか

bitmaskを利用すると、複数の値を1カラムで表現することができます。

```ruby
class User < ApplicationRecord
  # rolesはintのカラム
  #
  # 下記の例では{ administrator: 1, provider: 2, guest: 4 } にマッピングされる
  bitmask(roles: [:administrator, :provider, :guest])
end

# administrator = 1, guest = 4なので 合計値は5となる
user = User.new(roles: [:administrator, :guest])
user.save! #=> DBのrolesには 5 が記録される
user.roles #=> [:administrator, :guest]

user.roles?(:administrator) #=> true
user.roles?(:guest) #=> true
user.roles?(:provider) #=> false
```

## 既存gem(bitmask_attributes)との比較

すでにメンテナンスされていないですが、[joelmoss/bitmask_attributes](https://github.com/joelmoss/bitmask_attributes)というgemがありました。

このgemも同様の機能を提供していたのですが、いくつか気になる点がありました。

- コード読み込み時にカラム情報を取得するので、DBが存在していないと即エラーになる
- ビットマスクのカラムへのクエリが数式で実行されるため、indexを利用できない

なにより、メンテナンスされていないので利用には不安がありました。

### indexを使うための工夫

bitmask\_attributesでは、検索時に `where("column & ? > 0", value)` のようなクエリを発行していました。これでは計算が必要なのでindexを利用することはできません。

active\_record\_bitmaskは、これを解決するためにクエリを発行する前に、対象となる値を算出することにしました。  
例えば、マッピングが`{ administrator: 1, provider: 2, guest: 4 }` であれば、`administrator: 1`を含む可能性のあるbitmask値は `[1, 3, 5, 7]` のいずれかになることが明らかです。 
このように、あらかじめ算出した値をwhere句に渡すことで、インデックスを利用してbitmaskカラムを扱えるようにしました。

## おわりに

利用シーンとしては、権限や機能制限のフラグなどの管理がやりやすいです。
後から新しい値を追加した時にも、わざわざカラムを追加せず済んでいいですよ。

ぜひお使いください。
