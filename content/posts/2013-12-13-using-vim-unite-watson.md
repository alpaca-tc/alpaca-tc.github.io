---
layout: post
title: Unite.vimとwatsonを使ったワークフロー
date: 2013-12-13 02:29
comments: true
categories: vim
---

最近、vim-unite-watsonを開発しました。

これが、watsonの作者であるnhmoodさんにも好評で、僕自身ワークフローが変化して、だいぶ作業しやすくなりました。

今回は、タスク管理をしたい人向けに、僕なりのワークフロー管理を紹介します。

<!-- more -->

# ワークフローとVim

僕は普段、Webサービスの構築・保守を行う仕事をしています。

そこでは、基本的なフローは次のような流れです。

1. 新機能・バグに対してIssueを発行する(あるいは既にTODOリストにある)
2. トピックブランチを作る
3. コードを書く
4. コミット -> Pull-Requestを送る -> マージする

では、Vimを一度も閉じることなくこれらの作業をしてみます。

## 1. Issueの発行

### 1-1. TODOをコードに入力する

<img class="image_on_frame center" src="/images/blog/workflow_1.png" alt="本番環境用にViewを作成すると記入する" />

### 1-2. IssueをGithubにあげる

インラインIssue管理の[watson](/blog/ruby/how-to-use-watson.html)を使って、GithubにIssueをあげます

<img class="image_on_frame center" src="/images/blog/workflow_2.png" alt=":Watsonのデモ" />

Watsonを使えば、Vimから簡単にIssue管理を行うことが出来ますね。

## 2. 作業の目処を立てる

さて、これでIssueは挙げられたので、次はコードの改修をしていきます。

### 2-1. トピックブランチを作る

ブランチの作業は、[vim-unite-giti](https://github.com/alpaca-tc/vim-unite-giti)を使います。

```
:Unite giti/branch
```

新しいブランチの名前を入力して、`[checkout branch]`の行を選択します。

<img class="image_on_frame center" src="/images/blog/workflow_3.png" alt="Unite gitiのデモ" />

すると、新しいブランチが作られました。

### 2-2. コードの改修を行う場所に印をつけて行く

コードの改修は、多くの場合幾つかのファイルに跨がります。

そのため、経験から作業が必要な箇所に目処をつけて、コメントを書いて行きます。

<img class="image_on_frame center" src="/images/blog/workflow_4.png" alt="" />

<img class="image_on_frame center" src="/images/blog/workflow_5.png" alt="" />

<img class="image_on_frame center" src="/images/blog/workflow_6.png" alt="" />

todoの内容は、watsonによって管理されるので、vim-unite-watsonを使えば一覧としてみることができます。

```
:Unite watson/dirty
```

<img class="image_on_frame center" src="/images/blog/workflow_7.png" alt="unite-watsonのdemo" />

これで、issueを解決するために必要な作業の一覧を自分で作ることが出来ました。

Unite上のコメントを選択すると、該当箇所に飛べます。

後は、

1. 該当箇所に飛ぶ
2. コードを修正する
3. 解決したら、コメントを削除する

を`:Unite watson/dirty`が空になるまで繰り返します。

watsonの結果リストが空になれば、issueの問題を解決したことになり、次の作業に移ります。

### 3. GithubにPull-Requestする

これは、各々方法が分かれるかと思います。

Vimから出ないでPull-Requestを送るには、`:!git push` && `:!hub pull-request -h ...`というのが一番分かりやすいでしょうか。

僕は、`:Unite giti/pull_request`で送るようにしています。

## まとめ

Watsonやgitiはかなり便利です。

特に、watsonはコーディング作業をマネジメントしたい人に向いていると思います。
作業時間の見積もりや、タスク管理を考えながらコーディングする人には向いているプラグインなのではないでしょうか。

僕は経営学部にいるので、すっかりタスク管理や時間計測を気にしちゃうようになりました。。

**今回紹介したプラグイン**

- [vim-unite-watson](https://github.com/alpaca-tc/vim-unite-watson.vim)
- [vim-unite-giti (本家)](https://github.com/kmnk/vim-unite-giti)
- [vim-unite-giti (giti/pull\_request追加版)](https://github.com/alpaca-tc/vim-unite-giti)
