---
title: Railsプロジェクトの便利集
date: 2021-05-23 20:00
categories: diary
---

Railsプロジェクトで、自分が好んで使っている便利なものをまとめてみました。

## core_ext編

### sort\_byは安定ソートではないので、with\_indexを組み合わせて安定ソートを行う

<a target="_blank" href="https://gist.github.com/alpaca-tc/ed793961f2db438abaae3c00b7e303fa">https://gist.github.com/alpaca-tc/ed793961f2db438abaae3c00b7e303fa</a>

## RSpec編

### partial viewでインスタンス変数を呼び出していないことをチェックするテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/c19f00d583234a2c73eda6d8378b8c50">https://gist.github.com/alpaca-tc/c19f00d583234a2c73eda6d8378b8c50</a>

### モデルが変更された際に、参照元・参照先の双方に関連が定義されていることをチェックするテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/d53dee5977746256717c7522988b13d8">https://gist.github.com/alpaca-tc/d53dee5977746256717c7522988b13d8</a>

### テーブルが変更された際に、外部キーの定義漏れがないことをチェックするテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/6a6c024b11a2a0e09713b510362e6bd2">https://gist.github.com/alpaca-tc/6a6c024b11a2a0e09713b510362e6bd2</a>

### 重複するインデックスが存在しないことをチェックするテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/6c3f63d8d4c560a23d703f9274e4453f">https://gist.github.com/alpaca-tc/6c3f63d8d4c560a23d703f9274e4453f</a>

### FactoryBotの定義一覧を読み込んで、定義漏れや不正な定義がないことをテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/ab80f0c5233068d3266548df87acda59">https://gist.github.com/alpaca-tc/ab80f0c5233068d3266548df87acda59</a>

### テーブルの追加・変更があった際に、i18nの定義漏れがないことをテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/8b9424285346e4c080e345146971a883">https://gist.github.com/alpaca-tc/8b9424285346e4c080e345146971a883</a>

### rake db:seedが壊れていないことを保証するテスト

<a target="_blank" href="https://gist.github.com/alpaca-tc/bf739f3806e7ed672ac01fd7730edbd3">https://gist.github.com/alpaca-tc/bf739f3806e7ed672ac01fd7730edbd3</a>

### sidekiq-cronの定義がvalidであることをチェックする

<a target="_blank" href="https://gist.github.com/alpaca-tc/78842345cefaa55a827da15091a9cde3">https://gist.github.com/alpaca-tc/78842345cefaa55a827da15091a9cde3</a>

## ActiveModel/ActiveRecord編

### 特定の条件下でのカラムの値を宣言的に定義する拡張

<a target="_blank" href="https://gist.github.com/alpaca-tc/fcf53b364f3bf24bba3b57d122e81ba9">https://gist.github.com/alpaca-tc/fcf53b364f3bf24bba3b57d122e81ba9</a>

### クエリに呼び出し元を含める

<a target="_blank" href="marginalia">marginalia</a>みたい処理のミニマム版  
<a target="_blank" href="https://gist.github.com/alpaca-tc/97b875d63e0e798537e0e3d5c234e0b5">https://gist.github.com/alpaca-tc/97b875d63e0e798537e0e3d5c234e0b5</a>

### カラムの値がtrue/falseのいずれかであることを保証するvalidator

これデフォルトでRailsに欲しいんだけど。 `presence: true` だとnilを検知できないのよね。
<a target="_blank" href="https://gist.github.com/alpaca-tc/aa691507766dfde2474a4f2896df0bb7">https://gist.github.com/alpaca-tc/aa691507766dfde2474a4f2896df0bb7</a>

### 別のユーザーのデータを紐づけないことを保証するvalidator

<a target="_blank" href="https://gist.github.com/alpaca-tc/174347329edec75e9e4d4f8bdd650834">https://gist.github.com/alpaca-tc/174347329edec75e9e4d4f8bdd650834</a>

### 余分な空白を除去するString型

<a target="_blank" href="https://gist.github.com/alpaca-tc/8b65ca576afafb70a19d0a5581fa0632">https://gist.github.com/alpaca-tc/8b65ca576afafb70a19d0a5581fa0632</a>

### 渡された値でクラスを初期化する型(ActiveModel用)

<a target="_blank" href="https://gist.github.com/alpaca-tc/80b9fd778b38695bae639006a803ecbf">https://gist.github.com/alpaca-tc/80b9fd778b38695bae639006a803ecbf</a>

### 渡された値から数値以外の文字列を削除する型(主に電話番号用)

<a target="_blank" href="https://gist.github.com/alpaca-tc/c105905c8f3c2b06c6c5428edf25fa72">https://gist.github.com/alpaca-tc/c105905c8f3c2b06c6c5428edf25fa72</a>

### ActiveModelでenum-likeな定義を使う拡張

<a target="_blank" href="https://gist.github.com/alpaca-tc/93ec316bdf7c7e764166d0fb44416de1">https://gist.github.com/alpaca-tc/93ec316bdf7c7e764166d0fb44416de1</a>

### ActiveRecordでUSE INDEXを使うための拡張

<a target="_blank" href="https://gist.github.com/alpaca-tc/6c3dcd979e27547be688add4e1619294">https://gist.github.com/alpaca-tc/6c3dcd979e27547be688add4e1619294</a>

## ridgepole編

### ridgepoleで定義するindex名をhashのランダム名で定義する拡張(古いRailsっぽい挙動)

<a target="_blank" href="https://gist.github.com/alpaca-tc/2ad519e91be5eb5067c8ff06c6c8a3d2">https://gist.github.com/alpaca-tc/2ad519e91be5eb5067c8ff06c6c8a3d2</a>

### ridgepoleで定義する全ての主キー・外部キーをunsignedで定義する拡張

<a target="_blank" href="https://gist.github.com/alpaca-tc/322d86a2e48e3a9aa33655fd83b2671c">https://gist.github.com/alpaca-tc/322d86a2e48e3a9aa33655fd83b2671c</a>
