---
layout: post
title: neocomplete.vimのfile_includeを使いこなす
date: 2014-01-11 13:25
comments: true
categories: vim
---

この記事は[Vim Advent Calendar 2013](https://atnd.org/events/45072)の42日目の記事になります。

# Neocomplete.vimのfile\_includeを使いこなす

さて、今回の記事ではneocompleteのfile\_includeを使いこなしてみます。

<img class="image_on_frame center" src="/images/blog/file-include-by-neocomplete/completion_capture.png" alt="neocomplete_file_include" />

<!-- more -->

file\_includeとは、ファイルパスを補完してくれるアレです。file補完との違いは、特定のキーワードや変換を含んだ補完が出来る点です。

1. キーワード(`require`や`#include`)があると補完が始まり
2. 指定されたパスの中から候補を探し、変換して表示します。(例:`system.os`)

内部では、path, include, includeexprなどが使われています。(pathの参考 -> [Vim中級者を脱する Path編](/blog/vim/jump-to-gem-path.html))

## neocompleteを拡張する

file\_includeを拡張する際には、neocompleteの設定をしてあげる必要があります。それぞれ、次のように5つ変数をファイルタイプ毎に設定します。

指定しなければ、デフォルトの部分の変数が使用されます

```
" Liquidで画像pathを補完する

" デフォルト &l:path(検索対象のディレクトリ`,`区切り)
let g:neocomplete#sources#include#paths.liquid =
  \ '/Users/alpaca-tc/projects/alpaca-tc.github.io/source'

" デフォルト &l:include(正規表現にマッチしたら補完を開始)
let g:neocomplete#sources#include#patterns.liquid =
  \ '\({\s*%\(\s\+\w\+\)\+\(\s*\|\s\+[a-zA-Z0-9_#\?\!]\+\)\@=\|{\s*{\(\s\+\w\+\)\+\(\s*\|\s\+[a-zA-Z0-9_#\?\!]\+\)\@=\)'

" デフォルト &l:includeexpr(ファイルパスを出力する際に変換する)
let g:neocomplete#sources#include#exprs.liquid =
  \ 'substitute(v:fname, "^/", "", "")'

" デフォルト '.'(区切り文字の指定)
let g:neocomplete#sources#file_include#delimiters.liquid = '/'

" デフォルト [](補完するファイル拡張子フィルター)
let g:neocomplete#sources#file_include#exts.liquid =
  \ ['png', 'jpg', 'gif', 'jpeg', 'ico']
```

## 解説いる？

先ほどのコードを読めば、だいたい分かると思います。(あなたがVimmerなら！)

もし、マイナーな言語でfile\_include補完があった方が便利ならば、拡張してみてくださいー。

あるいは、&l:include, &l:includeexprなどで対応出来ているかもしれませんが。neocomplete.vim自体に設定が少ないのはそういうことです、(よね...？)

個人的には、フレームワーク毎にfile\_includeが使いたい所存です。

## Railsのimage\_pathを補完してみる

最後です。

Railsでimage\_pathを入力する際に、typoが多いので補完で対応してみます。

こんな感じで色々対応出来るはずなので、誰か本格的なRails用カスタマイズを作ってみてくれたらうれしいです！

```
" Rails.vimが必須
function! s:setup_include_file_for_rails()
  if !exists('b:rails_root') || !exists('g:neocomplete#sources#include#paths')
    return
  endif

  let g:neocomplete#sources#include#patterns.haml =
        \ '^\s*\<\%(image_path\|image_tag\)\>'
  let g:neocomplete#sources#include#paths.haml =
        \ b:rails_root . '/app/assets/images'
  let g:neocomplete#sources#include#exprs.haml =
        \ "substitute(substitute(v:fname,'::','/','g'),'$','','')"
  let g:neocomplete#sources#file_include#exts.haml =
        \ ['png', 'jpg', 'gif', 'jpeg', 'ico']
  let g:neocomplete#sources#file_include#delimiters.haml = '/'
endfunction
command! RailsView call s:setup_include_file_for_rails()
```

**うっほい！**

<img class="image_on_frame center" src="/images/blog/file-include-by-neocomplete/completion_for_rails_view.png" alt="completion_for_rails_view" />

Shougoさんいつもありがとうございます。本当に。

ちなみに、tpopeさんはこんな感じの事を剛腕で捩じ伏せて実現しています。Vimガチ勢怖い...。

## Vim Advent Calendar 45

前日は@osyo\_mangaさんの[textobj の両端へ移動する operator つくった](https://d.hatena.ne.jp/osyo-manga/20140110/1389342122)でした。

は！またosyoさんということは...!? と思っていたら、やはりVim Advent Calendarの今後の投稿者が居ませんでした;(

このブログを見ているあなた！(特にここまで読み切ったVim狂)

どうせVimmerしか居ない事は分かっています。**ぜひ書いてください** -> [osyoさん](https://twitter.com/manga_osyo)に「記事書きたいですー」とリプライ飛ばしましょうー！
