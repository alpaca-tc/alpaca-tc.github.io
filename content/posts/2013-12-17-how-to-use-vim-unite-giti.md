---
layout: post
title: 仕事が捗る！VimからGitを使う最適解
date: 2013-12-17 23:36
comments: true
categories: vim
---

先日の記事でもチラッと出てきた[vim-unite-giti](https://github.com/kmnk/vim-unite-giti)というプラグインがあります。

**ものすごーーーく便利**なプラグインなんですが、何故かほとんど話を聞かないプラグインです。

先日の記事でも、git系のプラグインは「知らなかった」という話を沢山聞きました。せっかくなので使い方を紹介します。

<!-- more -->

## 今回紹介するのはvim-unite-giti!!

何はともあれ、**まずは動画をみてくれ。**

<iframe src="https://www.youtube.com/embed/jCgcpIO9oBs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

とにかく、uniteインターフェースは操作を覚えることが少ない。

今回も、幾つかのUniteコマンドを使っているけれど、基本的に「選択」→「アクション」の動作しかない。

### :Unite giti/status

add, unstage, checkoutなどの操作が簡単ですね

conflictがあれば、すぐ見れます。「選択」→「commitアクション」と進めば、指定したファイルだけのコミットもお手軽に作れます(!!)

### :Unite giti/branch

tracking, chckout, deleteなどの操作が簡単ですね。

branchを切るのにわざわざShellを使うなんて。あなた、Vimと触れ合う時間が減ってしまうではないですか。

### :Unite giti/log

紹介していませんが、普通に便利です。vimdiffなどを見る事も簡単です。

## vim-unite-giti以外のプラグイン

### *git-vim* :GitDiff, :Git push

こちらは、特に驚きはないので初めて使う人以外は見なくてもいいです。

<iframe src="https://www.youtube.com/embed/wWI3Wb-0Vw4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

言わずもがな、コマンド名の通りです。

git-vimを使って何がうれしいかと言うと、それなりに補完ができる点です。

### *fugitive* :Gcommit, :Gblame

すでに語り尽くされているので、ここでは取り上げません。

他のプラグインにもにたようなコマンドがありますが、色付きなのと、機能性が優れているのでfugitiveがおすすめです。

## vimrc

今回の動画で使用したvimrcと同じような設定です

[vimrc Gist](https://gist.github.com/qickstarter/8008989)

## まとめ

ujihisaさんに憧れてのYoutube記事です。笑

余談ですが、作者の[kmnk](https://github.com/kmnk)さんのコードは**めちゃくちゃ奇麗**です。

今までで読んできた中で、*一番奇麗なVimLのコード*でした。ほどよい抽象化、適切な命名、整理されたファイル達。率直に、この人と一緒に仕事出来る人は幸せだろうなぁと感じました。

vim-unite-gitiを作ってくださって感謝します。

