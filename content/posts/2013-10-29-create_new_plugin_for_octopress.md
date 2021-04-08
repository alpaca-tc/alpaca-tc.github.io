---
layout: post
title: "alpaca_octopressを作っている"
date: 2013-10-29 04:52
comments: true
categories: [vim, alpaca_octopress]
---

昨日言った通り、今は[alpaca_octopress.vim](https://github.com/alpaca-tc/alpaca_octopress.vim)を作っています

<!-- more -->

ブランチは`v0.3`が最新ですね。

## 使い方

`:Octopress [command] {option}`

```
" 設定はこんな感じ
let g:octopress#rake_command = 'bundle exec rake'
let g:octopress#project_url = expand('~/project/octopress')
let g:octopress#system#async = 1
```

Octopress関連で`deploy`とか`async`とかをよく使うけど、このプラグインを入れれば非同期で実行できます。
新しく記事書くときは、`:Octopress new_post 新しい記事`とやればどのディレクトリに居ても起動出来るので、記事を書くのがちょっと楽になります。

## 初めてのvital.vim

このプラグインを作る上で、初めて[vital.vim](https://github.com/vim-jp/vital.vim)さんを使ってみました。
vitalは、JavaScriptでいうjQueryみたいに、これはベストな書き方！というコードを寄せ集めたスクリプト集です。

今回は、プロセスをオブジェクト化して、非同期で実行&管理するために使ってみました。
触ってみた感じ、まだまだ人柱感が強いです。。

荒削りというか、汎用的というか、、Process周りのvitalはまだまだ利用者がいないのだろうと思います。
vimproc周りの動作もおかしいようだし、Vimからプロセス操作するのはやっぱり難しいね！

- - -

`:Octopress deploy`っと！

さて、寝よう。
