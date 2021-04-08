---
layout: post
title: kamipoさんのアドバイスと拠点を跨いだ勉強会
date: 2020-12-18 17:21
comments: true
categories: ruby
---

この記事は[京都開発拠点アドベントカレンダー](https://adventar.org/calendars/5425) 18日目の記事です。

マネーフォワードには開発拠点が複数ありますが、技術情報はSlackで議論・共有されています。  
今日はそんなSlackの中から、東京拠点と京都拠点を跨いで開催した「Railsへコントリビュートする勉強会」について、東京拠点の[アルパカ隊長](https://github.com/alpaca-tc)が紹介します。

## はじまりのSlack

ふとした時に、社内SlackのRubyチャンネルでこんな会話がありました。

> <img width="20" alt="@alpaca-tc" src="/images/blog/kamipo-san-no-advice-to-kyoten-wo-mataida-benkyou-kai/alpaca-tc.jpg"> @alpaca-tc
>
> 程よい難易度で、kamipoさんが「これ自分がやらんでもええやろ」みたいなissueがあれば
>
> このslackに投げてもらって
>
> 誰かシニアエンジニアがサポートしつつ、新卒がRailsコントリビュートするみたいなのやりたい:eyes:

すると、kamipoさんからすぐ解決できるものは見た瞬間に直してしまっていると前置きがあった上で、
こんなissueを教えてもらいました。

<!-- more -->

> <img width="20" alt="@kamipo" src="/images/blog/kamipo-san-no-advice-to-kyoten-wo-mataida-benkyou-kai/kamipo.png"> @kamipo
>
> 簡単じゃないけど直したほうがいいと思ってるやつだとたとえば [rails/rails#35204](https://github.com/rails/rails/issues/35204) とか。
>
>
> これはautomatic_inverse_ofがバグっててinverse_ofって一対一の関係になるはずなのに
>
> belongs_to :user と belongs_to :writer の両方ともinverse_ofが :user と誤認されるってバグで、
>
> 起きてることに気づきづらいから直したほうがいいんだけど
>
> inverse_of: false すれば回避できるから優先順位が低い、とかそういう系のはいっぱいある。

ふーむ、パッと見はよく分かりません。程よい難易度を感じます。  
追加でかなり詳しいアドバイス(ほぼ答え)をいただいて、早速チャレンジですヽ(・∀・ )ﾉ

## 拠点を跨いで勉強会を開催

昨今のコロナ禍によってオンライン化が一気に進みました。(僕も、今年は数回しか出社していません)  
おかげで、拠点間を跨ぐオンライン勉強会も突発的に開催できるようになりました。

### 当日の流れ

今回は、京都の開発メンバーを含めた数人のメンバーを募り、Discordで話しながらkamipoさんのアドバイスを紐解いていくことになりました。

#### まずはセットアップ

[Contributing to Ruby on Rails](https://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html)からActiveRecordに関するセットアップ手順を抜粋して、各自でローカル環境をセットアップしていきます。  
その上で、先ほどのissueを再現するテストコードを書いて、テストが失敗する状態を再現しました。

[当日のセットアップ手順書](https://gist.github.com/alpaca-tc/e53fa34a55ebee4a170b54a87c266761)

#### 続いて調査

そして、全員の環境でテストが失敗する状態になったら、kamipoさんにいただいたアドバイスを調査していきます。

> <img width="20" alt="@kamipo" src="/images/blog/kamipo-san-no-advice-to-kyoten-wo-mataida-benkyou-kai/kamipo.png"> @kamipo
>
> このissueを参照してるここ [rails/rails#36708](https://github.com/rails/rails/pull/36708#discussion_r307672794) でも言及してるんですが、
>
> automatic_inverse_ofは改善可能で改善すれば自ずとこの問題も解決されます。具体的には :foreign_key オプションをinverse_of判定に含めることでこれまで判定不能だったinverse_of判定も可能になります。
>  
> このissue自体はforeign_key未指定の同一クラス参照してるassociationがある場合にforeign_keyの一致を判定せずにクラスが一致するかどうかだけでinverse_of判定してることが問題なのだと思います。

ざっくり言うと、[このissue](https://github.com/rails/rails/issues/35204)はモデルの関連を指定した時に、判定の条件漏れがあることが原因のようです。  
みんなで[`ActiveRecord::Reflection#automatic_inverse_of`](https://github.com/ktmouk/rails/blob/98ee2a40bf2df9ee2f7daca5532b71eace410fba/activerecord/lib/active_record/reflection.rb#L602)あたりを読み進めて、inverse_ofの判定処理に誤りがあることを発見しました。

## PRが完成

わいわい話しながらPRができたところで、kamipoさんにPRを見てもらって更にアドバイスをいただきました。

- よほどのことがない限り1PR 1commitになるようにするのがのぞましい [contribution guide](https://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html#squashing-commits)
- レビュアーがまだ知らない情報は、ぜんぶPRに含めてくれるほうがレビューのハードルが下がるので頑張って欲しい
  - レビュアーが、わざわざこれは正しい変更だと解説コメントしなくてもいいぐらい書くといい
  - 完全さよりもコンテキストを共有する気持ちが重要

貴重なアドバイスをいただきながら、完成したPRがこちらです。

[rails/rails#40643](https://github.com/rails/rails/pull/40643)

このPRは無事マージされ、Rails6.1.0でリリースされています🎉

## Slackでの四方山話

今回は勉強会の話を抜粋しましたが、普段からSlackでは様々なトピックの技術系の話題がなされています。  
個人的にも、kamipoさんにアドバイスをいただけたおかげで、直近1ヶ月で4つほどPRを送ることができました。

- [複数DBに対応したrails console --sandbox](https://github.com/rails/rails/pull/40704)
- [serializeにデフォルト値を渡せるようにする](https://github.com/rails/rails/pull/40545)
- [6.1.0.rc1のバグ修正 1](https://github.com/rails/rails/pull/40538)
- [6.1.0.rc1のバグ修正 2](https://github.com/rails/rails/pull/40547)

ひとりでOSSへ取り組むのは難しさがありますが、Slackで議論ができるとハードルがグッと下がって踏み出しやすくなりますね。

## まとめ

今回の勉強会の件もそうですが、弊社では拠点に関係なくこういった技術の話題でワイワイできます。
ぜひ皆さんも遊びにきてくださいヽ(・∀・ )ﾉ

まとめ
**「kamipoさんはすごい人」**

---

(※kamipoさんは弊社社員ではなく、善意でSlackのチャンネルに入ってくださっています。)
