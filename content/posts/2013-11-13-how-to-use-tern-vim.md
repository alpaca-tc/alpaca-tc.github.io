---
layout: post
title: JavaScript補完プラグインのTernはすごいヤツ
date: 2013-11-13 14:40
comments: true
categories: vim
---

**「え、JavaScriptを書いているのに、Tern使ってないの？」**

ダサい。イケてない。
あぁ、残念。

<!-- more -->

[Tern](https://github.com/marijnh/tern)は、marijnhという凄いエンジニアの人が作っている**JavaScriptの動的補完プラグイン**

コードを動的にパースして、今カーソルがある変数の型まで調べて補完しちゃってくれる。

設定をすれば、jQueryなどのプラグインでの諸々も補完しちゃう凄いやつなのだ。

```
if has('python') && executable('npm')
  NeoBundleLazy 'marijnh/tern_for_vim', {
        \ 'build' : 'npm install',
        \ 'autoload' : {
        \   'functions': ['tern#Complete', 'tern#Enable'],
        \   'filetypes' : 'javascript'
        \ }}
endif
```

まぁ、何はともあれ一度使ってみてください。
