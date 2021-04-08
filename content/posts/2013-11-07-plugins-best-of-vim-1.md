---
layout: post
title: オススメなVimのプラグイン紹介
date: 2013-11-07 05:22
comments: true
categories: vim
---

普段使っているプラグインの中で、*これはイケてる！*と思ったプラグインを4つ紹介。

<!-- more -->

## [auto-pairs](https://github.com/jiangmiao/auto-pairs)

- `{}`、`()`などの、対応する文字を*自働入力*
- 括弧の片方が消えた時や、重複する時に*自働で調整してくれる*
- `innoremap ( ()<Left>`とか未だにやっているのダサくない？

```
" [本家](https://github.com/jiangmiao/auto-pairs)
" Lazy loading用に修正済み
NeoBundleLazy 'alpaca-tc/auto-pairs', { 'autoload' : {
      \ 'insert': 1 }}

let hooks = neobundle#get_hooks('auto-pairs')
function! hooks.on_post_source(bundle)
  call auto_pairs#try_init()
endfunction
unlet hooks
```

## [vim-easy-align](https://github.com/junegunn/vim-easy-align)

- 使いやすさ抜群の*整列用プラグイン*
- `Alignta`がメジャーだけど、正直使いにくいよね。

<img class="image_on_frame center" src="https://raw.github.com/junegunn/i/master/vim-easy-align.gif" alt="vim-easy-align DEMO" />

```
NeoBundleLazy 'junegunn/vim-easy-align', { 'autoload': {
      \ 'commands' : ['EasyAlign'] }}
```

## [indentLine](https://github.com/Yggdroot/indentLine)

- イケてる、*インデント表示プラグイン*
- `vim-indent-guides`は画面がうるさくなるから嫌！っていう人向け

```
if has('conceal')
  NeoBundleLazy 'Yggdroot/indentLine', { 'autoload' : {
        \   'commands' : ['IndentLinesReset', 'IndentLinesToggle'],
        \   'filetypes': g:my.ft.program_files,
        \ }}
endif
```

## [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors)

- SublimeTextの複数マーク&同時編集 の機能を実現するプラグイン
- 実装に関しては完全に「こいつ無茶しやがって...」状態。

```
NeoBundleLazy 'terryma/vim-multiple-cursors', { 'autload': {
      \ 'function_prefix': 'multiple_cursors',
      \ }}
```

今回紹介したプラグインは、かなりシンプルに洗練されています。
使っているだけでも、作者の男前さを感じられる。そんなプラグインだと思います。
