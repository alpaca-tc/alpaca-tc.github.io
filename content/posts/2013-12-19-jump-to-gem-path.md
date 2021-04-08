---
layout: post
title: Vim中級者を脱する path編
date: 2013-12-19 08:02
comments: true
categories: vim
---

はい、pathとは`:set path`で出てくるやつのことです。
実際にはみなさん`gf`やファイル補完などでお世話になっていると思います。

今回はpathとは何かを説明して、.rbファイルのクラスからGemの定義元へ飛ぶ方法をやってみましょう。

<!-- more -->

**方法だけ知りたい人は、一番下までスクロールしてください**

# pathとは？

Vimにおけるpathとは、`set path?`で出てくるpathです。

適当にファイルを開いてコマンドを打ってみましょう。

```
:set path?
path=.,/usr/include
```

これを設定しておくことで何が嬉しいかというと、編集中の変数の定義元へ飛べたり、ファイルを検索出来たりします。つまるところ、Vimが*何かを探すときの基準になる*ディレクトリ達を指定することができます。

補完プラグインや、Vimの基本機能などもpathに依存していることが多いため、裏側では結構活躍している設定でもあります。

## `gf`でGemの定義元に飛ぶ

`gf`は通常、カーソル

Rubyを編集する際、Vimのビルトインの`ftplugin/ruby.vim`が読み込まれ、`gf`が自動的に関数にマッピングされます。

```
:set filetype=ruby
:nmap gf
n  gf          *@:<C-U>exe <SNR>121_gf(v:count1,"gf",'edit')<CR>
```

このおかげで、通常の`gf`が拡張されて幾つかのケースで`gf`が使えるようになります。(Rails.vimも同じ手法を使っていますね。)

具体的には`require 'path/to/file'`やload, autoloadで書いたファイルパスへ飛ぶことができます。

内部では拡張子を取り除いたり、ファイル名に不要な文字を変換したりしていますが、そのオプションについては、今回は割愛します。

### pathにRubyのload\_pathを追加する

Rubyを編集中に、Gemの定義元へ移動する話をしましょう。

まずRubyについて理解しておく必要があるのは、load_pathの仕組みです。Rubyは`require`などを使用したときに、指定されたファイルを`$LOAD_PATH`のディレクトリ一覧の中から探します。

下記のようなコマンドを打つことで、デフォルトの$LOAD_PATHを探すことができます。

```ruby
ruby -e 'puts $LOAD_PATH'
```

Gemfileを定義した場合、この$LOAD_PATHにそれらのGemの場所が追加されるので`require`で使うことがきるようになるんですね。

それでは、VimにもGemfileから取ってきたディレクトリ一覧を与えてやることで、定義元を探し出せるようにしましょう。

### Gemfileからディレクトリ一覧を取り出す

`bundle show --paths`を使うことで、一覧情報を取り出せます。

```
$ bundle show --paths
/Users/alpaca-tc/.rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/RedCloth-4.2.9
/Users/alpaca-tc/.rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/bundler-1.3.5
/Users/alpaca-tc/.rbenv/versions/2.0.0-p247/lib/ruby/gems/2.0.0/gems/chunky_png-1.2.5
...
```

この情報を`setl path=...`と与えてやれば、`gf`を使って定義元に飛べるようになります。

### `set path=`を使って定義する

[こちらのスクリプト](https://gist.github.com/8031905)をvimrcに貼付けましょう。[vital.vim](https://github.com/vim-jp/vital.vim)依存です(unite.vim, neocompleteがあれば動作します)

これで、GemPathを読み込む`:LoadGem`というコマンドが作られます。

下記のような動作で定義元に飛べるのが確認できると思います。

<img class="image_on_frame center" src="/images/blog/jump-to-gem-path/hM4zx40RmT.gif" alt="gemジャンプデモ" />

無事動いていますね。

## まとめ

今回はpathについて、簡単に説明しました。

次回は、pathを活用してさらに`include`, `includeexpr`あたりをやります。

この辺を勉強すると、自分の環境用にファイル補完を作り上げられます。 neocompleteのfile/includeあたりが書けるようになりますよ〜
