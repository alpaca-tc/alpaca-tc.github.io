---
layout: post
title: 'Vimを勉強し始めました #1'
date: 2013-11-21 09:11
comments: true
categories: learning_vim
---

# Vim読書会 #1

先日から続けているVim読書会(一人)ですが、
今回からモチベーションのために記事にあげて行おうと思います。

*本日読むソースコード*

**Vim-0.3**

- cmdline.c
- cmdtab.h
- cmdcmds.c

<!-- more -->

## cmdline.c L3723行

cmdline.c: functions for reading in the command line and executing it

```c
// L650:
static char_u * DoOneCmd(buff) char_u *buff; {
```

この関数で、コマンドラインからの入力を処理してます。
関数の前半部分で入力をパースして、後半部分でコマンドを分岐しています。

分岐部分はこんな感じですね。

```c
L1111:
cmdswitch:
  switch (cmdidx)
  {
    /*
     * quit current window, quit Vim if closed the last window
     */
    case CMD_quit:
      ...

    case CMD_qall:
      ...
```

`:quit`の処理を変更したかったら、`case CMD_quit`以下を変更すればいいです。

## cmdtab.h L337行

また、`CMD_...`といった定数は`cmdtab.h`で初期化されており、全てのコマンドが定義されています。
コマンドは、ユニークなID,コマンド名,受け付ける引数がここで定義されます。

そのコマンドの実際の動作は、`cmdline.c`にべた書きされているという感じでしょうか。

Vim-3.0の書き方だと、コマンドがひとつ増える度に`cmdline.c`の分岐がひとつ増えるというヘビーな書き方なので、新しいバージョンではリファクタリングされてそう。

## cmdcmds.c L541行

cmdcmds.c: functions for command line commands

`cmdcmds.c`は、`cmdline.c`でのコマンドの分岐で重なる部分の関数をまとめたもの、といった印象です。
Wordpressでいうfunctionsのような感じかな。一応、他の場所でも使える感じに仕上がっています。

この中には、`do_align`や`doshell`といった、想像につく名前の関数がありますね。
`CMD_move`で分岐した場合は、こちらに飛ばされます。

## まとめ

コマンド関連の細かい実装を見るのは大変ですが、全体的に見ると読みやすかったです。
Vimのオプションやコマンド名が、そのまま変数に使われているので読みやすかったです。

`:echo`などのコマンドを追加する場合は、ここら辺を弄るだけでなんとかなりそうですね！
次回トライしてみます。
