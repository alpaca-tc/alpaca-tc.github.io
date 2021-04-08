---
layout: post
title: "octopressとセットで入れておきたいVimプラグインまとめ"
date: 2013-11-01 17:06
comments: true
categories: [vim]
---

Octopressは利用者が一部なので、デフォルトのVimではなにも対応していません。
プラグイン無しでも利用することもできますが、正直使いにくいですよね。

最低限下記のプラグインぐらいは入れておきましょう。

<!-- more -->

## [vim-liquid](https://github.com/tpope/vim-liquid)

`liquid`はoctopress(jekyll)で採用されているテンプレートエンジンです。

このプラグインを入れると、ファイルタイプの検知や、キーワードのハイライトをしてくれるようになります。
何が良いかというと、そのおかげで`neocomplete.vim`や`matchit.vim`などの他のプラグインもliquid用に対応してくれるんですよね。

```
NeoBundleLazy 'tpope/vim-liquid', { 'autoload' : {
      \ 'filetypes' : 'liquid'
      \ }}
```

## [vim-octopress](https://github.com/tangledhelix/vim-octopress)

VimからOctopressのコマンド操作をするプラグインです。
`:Octopress [command][{option}]`で実行することができます。

1. `:Octopress new_post title`
2. `:Octopress gen_deploy`

この2回の操作で、新しい記事をアップロードできます。

```
NeoBundleLazy 'tangledhelix/vim-octopress', { 'autoload' : {
      \ 'commands': 'Octopress',
      \ }}
```

## [alpaca_octopress](https://github.com/alpaca-tc/alpaca_octopress.vim)

`vim-octopress`の非同期実行版です。
人柱属性のある方はこちらをオススメします。

```
NeoBundleLazy 'alpaca-tc/alpaca_octopress.vim', { 'autoload' : {
      \ 'branch': 'v0.3',
      \ 'functions' : 'octopress#complete',
      \ 'commands': {
      \   'name' : 'Octopress',
      \   'complete' : 'customlist,octopress#complete',
      \ },
      \ }}
```

## まとめ

Octopressはかなりエンジニアと相性が良いプロジェクトだと思います。
ついでにVimmerの方は、これらのプラグインを入れてより親和性を高めましょう！
