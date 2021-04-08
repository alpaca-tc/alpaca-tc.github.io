---
layout: post
title: インラインTODO管理のWatsonを使う
date: 2013-12-03 23:49
comments: true
categories: ruby
---

最近、Githubのトレンドにも入っていた[Watson]( https://goosecode.com/watson/ )を紹介します。

<!-- more -->

<img class="image_on_frame center" src="/images/blog/watson.png" alt="watsonのデモ" />

## インラインTODO管理とは何か

もしあなたがエンジニアなら、次のようなコメントを見たことがあると思います。

```ruby
class ApplicationController < ActionController::Base
  def logged_in?
    # TODO 管理ユーザーと処理を分ける
    ...
  end
end
```

このように、コード内には至る所にコメントが書かれています。
単なるコードの説明に限らず、修正が必要な内容を記述したものも多くあります。

しかしながら、しばしばこういったコメントは放置され、コードの中に埋もれたままになってしまうこともあります。

Watsonは、コード内に書かれたコメントを走査し、近代的な管理ツールに流し込むことでIssueを管理するツールです。

## どうやって使うのか

watsonを使って、コード内に記述されたコメントを洗い出して、GithubのIssueに登録してみましょう。

### ステップ1: watsonのインストール

```sh
$ gem install watson
```

### ステップ2: watsonの初期化

```sh
$ cd path/to/project_dir
$ watson
# 一旦<Ctrl-C>で終了してください。
```

`.watsonrc`が自動的に作成されるので、プロジェクトに合わせて走査するディレクトリなどを設定します。

例として、Railsプロジェクト用の[.watsonrc](https://gist.github.com/7770689)を貼付けておきます。

### ステップ3: watsonの実行！！

watsonを使うときは、独自のタグを使ってコメントを書いておきます。

- `[todo] - タスクの内容を記入する`
- `[review] - 他の人に意見を求めるような内容を記入する`
- `[fix] - バグの内容を記入する`

試しに、適当なファイルを開いて、上記のようなフォーマットでコメントを記入してみてください。

後は、再度`watson`と打って実行！

めでたしめでたし。
プロジェクト内のTODOなどが、一覧で出力されます。

### ステップ4: githubへIssue登録する

先ほどの出力した内容を、Githubへ一括同期しましょう。

まず、Githubのリポジトリをwatsonに認識させます

```sh
$ watson --remote github
```

英語のコメントに沿って、情報を入力していきましょう。


続いて、Issueを登録します。

```sh
$ watson --update
```

処理が終わると、Githubのissueへの登録が完了です。

<img src="image_on_frame center" src="/images/blog/watson_issue_preview.png" alt="githubのissueプレビュー" />

## まとめ

watsonは先月ぐらいに注目され始めた新しいプロジェクトです。

今後は、コメントを活用して様々な処理を行えるように拡張されると思うので、動向が楽しみですね。

### watsonの現状

- Ruby初心者の人が作ったため、コードがよろしくない(PR中)
- 今のところ対応している管理ツールは、githubとbitbucket。
- 安定版に必要な機能が未実装。なので、新機能のPRがなかなか取り入れられない状況。数ヶ月待たないといけなさそう。
- 対応しているファイルタイプがまだ少ない
