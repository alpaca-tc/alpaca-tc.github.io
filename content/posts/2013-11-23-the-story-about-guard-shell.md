---
layout: post
title: Guard-shellが便利だった話
date: 2013-11-23 01:34
comments: true
categories: ruby
---

[Guard](https://github.com/guard/guard)って便利ですよねー。

あの、ファイルをwatchして、変更を検知したらアクションをグルグル回すやつです。

最近Vimの開発をしていて、あー変更と同時にコンパイルしてくれたらいいのになぁ。

Guardを使って実現してみました。

<!-- more -->

# guard + guard-shell

おなじみのGuardにshellコマンドを実行できるようにします。

*GuardでC言語を自動コンパイル！！！*

```ruby
# Gemfile
source 'https://rubygems.org'

gem 'guard'
gem 'guard-shell'
```

```ruby
# Guardfile
group :vim3 do
  guard :shell do
    target_dir = 'vim-3\.0/src'
    watch(%r!^#{target_dir}/(.+)\.(c|h)!) do
      `cd #{target_dir} && make`
      `cd #{target_dir} && make debug`
    end
  end

  ...
end
```

ポイントは、*group*と*guard :shell ...*ですね。

## guardのDSL *group*

groupのDSLを使うと、guardの設定を切り替えることができます。

例えば、バージョン毎にgroupで設定をわけておけば、不必要な部分でguardが動作することを防ぐことができます。
僕の場合は、vimのバージョン毎に設定を切り替えることで不必要なコンパイルを防いでいます。

また、分けてあるgroupを切り替えるときは、guardのコンソールで`scope vim3`と打てば切り替わります。

(起動時にscopeを指定する場合は、`guard --group vim3`)

## guard-shellを使う

guard-shellは、ファイルの変更をフックにしてshellコマンドを実行するgemです。

と、あたかもshellに特化したネーミングですが、実際はただ単にwatchに渡したブロックを評価するだけのシンプルなやつです。

下記のようにすれば、ファイルが保存されたと同時に`hogepiyoooooooooooooo`と教えてくれます。
わーい。

```ruby
# Guardfile
guard :shell do
  watch(/.*/) { |m| `say hogepiyoooooooooooooo` }
end
```


## まとめ

*guard-shell便利。*



(ホゲピヨーーーーーって言うのかと思ったら、「ホージピュゥ」って何か冷めた感じに返された。。。)

