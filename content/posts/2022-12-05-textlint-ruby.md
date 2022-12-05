---
title: textlintでRubyファイルを文章校正できるようにした話
date: 2022-12-05 17:00
categories: job
---

これは [SmartHR アドベントカレンダー](https://qiita.com/advent-calendar/2022/smarthr)の5日目の記事です。

SmartHRでは [textlint](https://github.com/textlint/textlint) という文書の校正ツールを利用しています。[過去の記事はこちら](https://shanaiho.smarthr.co.jp/n/n881866630eda)

<img class="image_on_frame center" src="/images/blog/textlint-ruby/textlint-ruby.png" alt="textlintの検知例" />

しかし、今までtextlintはRubyファイルに対応していませんでした。

この度は [textlint-ruby](https://github.com/kufu/textlint-ruby) というtextlintでRubyファイルを解析できるようにするためのプラグインを作成したので、ご紹介します。

## textlint-rubyの仕組み

textlintで何かを解析するためには、文章をパースして文字列のデータ構造を抽出する必要があります。

例えば、下記のプログラムでは `APIでエラーが発生しました` という文字列がtextlintに渡すべき値になります。

```ruby
def create
  redirect_to(root_path, error: 'APIでエラーが発生しました')
end
```

textlint-rubyでは、[ripper](https://docs.ruby-lang.org/ja/latest/class/Ripper.html)を使ってRubyファイルを解析して、抽出した文字列等をtextlint用のASTに変換してくれます。

## textlint-rubyの使い方

textlintはすでに導入済みとします。

まずは、対象プロジェクトのGemfileにRubyファイルの解析を担うtextlint-rubyを追加します。

```ruby
# Gemfile
group :development, :test do
  gem 'textlint-ruby'
end
```

その後、textlintのプラグインを追加します。

```shell
$ yarn add --dev textlint-plugin-ruby
or
$ npm install --dev textlint-plugin-ruby
```

`.textlintrc` に設定を追加すれば設定は完了です。

```json
{
  "plugins": {
    "ruby": {
      "execCommand": ["bundle", "exec", "textlint-ruby", "--stdio"]
    }
  }
}
```

## 終わりに

SmartHRに入社して2週目の時に「Rubyの会社なのにtextlintでパースできないのなんで??」と思い立って、数時間でこのプラグインを作成しました。  
今となっては、会社の主要プロダクトのほとんどに導入されており、会社のバリューである「一語一句に手間ひまかける」の一助を担っています。

このプラグインの作成にあたって、textlint本体にもPRを送って外部プロセスを呼び出せる仕組みになりました。  
もし他のプログラミング言語に対応したいときでも、同じ発想でプラグインを作成できるはずです。

みなさまもどうぞお試しあれ。
