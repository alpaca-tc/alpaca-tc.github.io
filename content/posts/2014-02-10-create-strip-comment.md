---
layout: post
title: 久しぶりにGemを書いている
date: 2014-02-10 12:33
comments: true
categories: [ruby]
---

最近、久しぶりにGemを書いてます。

去年から[watson-ruby](https://github.com/nhmood/watson-ruby)というinline issue manager貢献してます。

watsonは凄い便利なんですが、コードがかなりアレなのです...。

「全部リファクタリングさせてくれー！」って言っても、まだやりたい作業があるらしく「ブランチ切るから、もう少し待ってて:)」と言われたっきり...

うーむ、、なかなか全部は触れないので、とりあえず一番やっかいな部分だけ汎用的にすべく自作しました。

<!-- more -->

## どんなGem?

あらゆるプログラムソースを読み取って、**コメント行のみを取り出すGem**です。watsonでは、このコメント行を読み取って、todoの管理を行っています。

最近のwatsonのPRを見ても、対応ファイルの追加(正規表現の追記)ばかりなのです。こんなもの、他のGemにくれてしまえ！

どんなファイルタイプであれ、扱うのはコメントという概念なのだから、委譲して抽象化しちゃいましょう。

## 何が出来るようになるんだい？

あらゆるプログラムのソースコードをパースして、コメント行だけを抽象的に扱う事が出来ます。

読み取って、何らかの処理をすることが出来ます。

```ruby
# 今のところはこんな感じ。
# Gem名やmethod名は変更します
require 'strip_comment'

path = '/path/to/file'
file = StripComment::FileObject.new(path)
parser = StripComment::Parser.for(file)
parser.scan
parser.comments # => [StripComment::CodeObject::Comment, ...]
```

簡単に思いつく限りの用途はこんな感じ。

- 英語のコメントの文法チェック / 翻訳
- `[review - @alpaca-tc ここ見ておいて！]`というコメントにGit post-hookをかけて、ダイレクトメッセージを送る
- iftttとの連携

他にも色々出来そうですね。

## Vimでテスト

さっそくVimと連携してみました。

<img class="image_on_frame center" src="/images/blog/create-strip-comment/comment.gif" alt="comment.vimデモ" />

コメント行を取り出して、Gingerで文法チェックしています。

## まとめ

あとは対応ファイルを増やして、リファクタリングしたら完成です。
今`StripComment`という名前なんだけど、絶対違うよね。(´・ω・｀)良い名前が思いつかない

終わったら誰か、コードレビューして欲しいなぁ！ヽ(・∀・ )ﾉわーい
