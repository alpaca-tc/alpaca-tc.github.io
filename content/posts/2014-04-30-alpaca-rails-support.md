---
layout: post
title: Railsの補助プラグインを書いた
date: 2014-04-30 00:46
comments: true
categories: vim
---

# もうLocaleファイルに迷わない！

<img class="image_on_frame center" src="/images/blog/alpaca-rails-support/screen_shot_1.png" alt="screen_shot_1" />

休日を利用して、久しぶりにRails関連のVimScriptを書いたよ:)

<!-- more -->

## Railsとlocalesファイル

きっかけは、とあるプロジェクトに立てられたIssueであった。

> **言語ファイルが大きすぎてどこを編集しているのか全く分からなくなる。**  
> **もはや人が書くようなファイルじゃない。**  
>
> 便利なエディタがあるならエディタに頼ってもいいけどざっと探した感じ見つけられなかったので、いい解決方法があれば教えて欲しいです。

おっしゃる通り、懸念すべき事項である。  
多国籍に対応したプロジェクトをRailsで作った経験があると分かるが、気をつけていても**localesはカオス**になってしまう。  

しかし、次の発言で少し様相が変わる。

<img class="image_on_frame center" src="/images/blog/alpaca-rails-support/screen_shot_3.png" alt="issue" />

**SublimeText2が有力...だと？**

~~何を寝ぼけたこt~~

alpaca-tcはVimの人である。Vimで解決しんぜよう。

## Railsの補助プラグイン

丁度、僕も今Railsで開発をしている。  
痒いところが幾つかあったので、休日に孫の手を作ることにした。

**[Alpaca Rails Support](https://github.com/alpaca-tc/alpaca_rails_support)**

といっても、時間があまり無かったので**3つの簡素な機能**でまとめた。

### I18nの探索

本題の機能である「localesの編集をサポートする」プラグインである。  
キーを探索して、Uniteにぶち込んでくれる。

<img class="image_on_frame center" src="/images/blog/alpaca-rails-support/screen_shot_4.png" alt="Find_local" />

探索は少し荒いので、Yamlをキレイに書いていなければ動かない。

### Routesの補完

個人的に一番欲しかった機能である  
たかだかRoutesのスペルミスで、BetterErrorsと挨拶したくない。

<img class="image_on_frame center" src="https://raw.githubusercontent.com/alpaca-tc/alpaca_rails_support/master/assets/routes_completion.png" alt="reoute補完" />

ようやく`rake routes | grep ...`の地獄から解放されるヾ(\*´∀｀\*)ﾉ

### I18nのプレビュー

特に必要は無かったけれど、思いついてしまったので作った。

<img class="image_on_frame center" src="https://raw.githubusercontent.com/alpaca-tc/alpaca_rails_support/master/assets/preview_locales.gif" alt="preview" />

**( ﾟ∀ﾟ)o彡ﾟギミックかっけー！**

vim-easy-motionやvim-overと同じ方法を取り入れていて  
`while 1`と`getchar()`の組み合わせでkeypressを補足している。

新鮮な方法だったので、一番気に入っている。

## 今後

もう少ししたら、オンラインのlocales探索アルゴリズムを実装しようと思っている。  
VimScriptでアルゴリズムらしい手法を使ったことは無いので、楽しみである。
