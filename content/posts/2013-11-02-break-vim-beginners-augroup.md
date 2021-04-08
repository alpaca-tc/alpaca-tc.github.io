---
layout: post
title: "Vim中級者を脱する augroup編"
date: 2013-11-02 02:30
comments: true
categories: vim
---

## augroup, autocmdを理解する

**所要時間 3分**

### この記事を読むべき人

- `augroup`を理解していない人
- `:source`コマンドを使う人

<!-- more -->

## そもそもautocmdって？

これは何をしているコマンドなのか分解してみましょう。

```
autocmd BufNewFile * echo 'This is new file'
```

1. autocmdのコマンドを開始しますよ
2. `BufNewFile`というタイミングでこのコマンドを実行しますよ
3. 全てのバッファで`echo 'This is new file'`を実行しますよ

となります。

このように、保存時や新規のファイルといったタイミングでコマンドを実行できます。

## では、augroupはなんのために存在するの？

`augroup`は、`autocmd`をグループでまとめるためのコマンドです。こんな感じて使われます。

```
augroup EditNewFile
  autocmd!
  autocmd BufNewFile * echo 'This is new file'
augroup END
```

例えば、`autocmd`が設定されているvimrcを、`:source ~/.vimrc`で再度読み込むとしましょう。

するとどうなるかというと、通常は**`autocmd`が重複して2度設定されます**
当然、その`autocmd`が発火するときに2度実行されるので、実行が遅くなります。

それを防ぐために`augroup`を使います。

## ベストプラクティスは？

つまるところ、`augroup`は`autocmd`をまとめて初期化する場合に使用します。
具体例を上げると、下記のような形になります。

```
augroup MyAutoCmd
  autocmd! " => このaugroupに紐づいたautocmdを消し去ります
augroup END

...

augroup MyAutoCmd
  autocmd BufNewFile * echo 'This is new file'
  autocmd BufNewFile,BufRead *.haml setf haml
augroup END
```

こうすることで、2重に設定されることのない設定になります。

## もう一歩踏み込んでみる

autocmdの設定方法をVimのRuntimeから学んでみましょう。

```
:edit $VIMRUNTIME/filetype.vim
```

これはファイルタイプの定義を行っているファイルです。

augroupが宣言されているので、一覧を`:autocmd filetypedetect`でみれることが分かります。

驚くことに、もの凄い数のコマンドを実行してファイルタイプを設定していることが分かります。

### ftdetectを知る

filetype.vimにて`runtime! ftdetect/*.vim`と書かれており、`~/.vim/ftdetect/*`を読み込んでいることが分かります。

つまり、ファイルタイプの設定は`ftdetect`以下で設定するのがベターとされています。

```
" ~/.vim/ftdetect/coffee.vim
autocmd BufNewFile,BufRead *.coffee    setf coffee
```

といった設定にて、ファイルタイプを検出できるようになります。
`augroup filetypedetect`の宣言内なので、グループの宣言は不要です。

## 本日の脱Vim中級者

vimrcでファイルタイプの検出をしている方は、`~/.vim/ftdetect`以下に設定を移してみましょう。
