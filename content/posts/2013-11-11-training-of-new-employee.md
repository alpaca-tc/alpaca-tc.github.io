---
layout: post
title: Vimを使って新人教育
date: 2013-11-11 05:21
comments: true
categories: vim
---

嬉しいことに、一緒に働く仲間が2人増えました。

まだRubyに慣れていないそうなので、はじめの一ヶ月は教育期間を挟みます。

新人の方もvimmerなので、そのためのプラグインを作りました。

<img class="image_on_frame center" src="/images/blog/11_11.png" alt="Vimのデモ" />

**[assignment.vim](https://github.com/enfactv/assignment)**

<!-- more -->

インストールはごく簡単です。

```
NeoBundle 'alpaca-tc/assignment'`

let g:assignment#path = expand('~/path/to/assignment')
```

### 良かったこと

- GitHubの使い方がわからなくても、Vimから徐々に取り組めること
- 問題のやり取りが楽になったこと
- 自動テストがあるので、リモート勤務でも採点できること

### 悪かったこと

- 一問一答の形式って効率悪いよね...

とりあえず一ヶ月はこの形式で進めて、Rubyに慣れてもらおうかと思います。

## まとめ

正直、今日は書くことがなかっただけです。えへ。
暇だなー、俺初級者かなーと思う方が入れば、試しに問題に挑戦してみてください。

1. プラグインをインストール
2. `:AssignmentInit ~/インストール先ディレクトリ`を実行して初期化
3. vimrcに`let g:assignment#path = expand('~/path/to/assignment')`を追加
4. `:Assignment solve <tab>`で問題を選択
5. Guardをまわしながら解くのみ！

初めは、8クイーン問題や、RubyのDSLを作る問題などです。
初級者向けですが、少しは暇つぶしにはなると思いますよ！
