---
layout: post
title: ここまで出来る！RubyのSplat Operatorまとめ
date: 2014-02-12 04:16
comments: true
categories: ruby
---

Splat Operatorとは、`*`のことです

<img class="image_on_frame center" src="/images/blog/how-to-use-star/capture.png" alt="SplatOperator" />

この前、友人にコードレビューしてもらっていたら

「え、Rubyってこんな書き方出来るんですか？」と言われて、「知らない人もいるんだなぁ」と思ったので簡単なまとめ

<!-- more -->

# Splat Operatorの色んな使い方

Splat Operatorは、応用の幅が広いです。

結構当たり前だと思っていましたが、コード読書しないと見る機会は少ないかも。

## 1-1. 配列に変換する

まずは基本編。配列に変換してやりましょう

文字列やsymbolは`.to_a`が無いですが、`*`を使えばどの変数でも配列に出来ちゃいます。

```ruby
string = *"string"
p string #=> ["string"]

symbol = *:symbol
p symbol #=> [:symbol]

hash = *{ hash: nil }
p hash #=> [[:hash, nil]]

range = *(1..10)
p range #=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## 1-2. 親クラスの引数を気にしない

またまた基本編。`*`を引数に指定してやれば、親クラスの引数は知らなくても大丈夫。

`*`だけで出来ることを知らない人はいるかも。

```ruby
class Child < Super
  def initialize(*)
    super
  end
end
```

## 1-3. 間の引数をまとめる

引数の最後にSplat Operatorを使うことはよくありますが、間はなかなか見ないですね。

blockで引数を取るときに、間の引数をまとめる事が出来ます。

メソッドやProc,lambdaでも同様の動作です。

```ruby
list = [[:first, :second, :third, :fourth, :fifth]]
list.each do |first, *mid, last|
  p first  #=> :first
  p mid    #=> [:second, :third, :fourth]
  p last   #=> :fifth
end

# もちろん、こんなことも出来ます
first, *other = [1, 2, 3]
p other #=> [2, 3]
```

## 1-4. `**`を使う

キーワード引数って、まだあまり普及してないですね。互換性が気になるからだろうか？

`**`はキーワード引数を取るときに、余った引数をまとめます。

```ruby
def hoge(first: 1, second: 2, **others)
  p others #=> { third: 3 }
end
hoge(first: 1, second: 2, third: 3)
```

多分これはSplat Operatorと呼ばない。

## まとめ

こんな書き方が出来るSplat Operatorって本当に便利ね！

( ﾟ∀ﾟ)o彡ﾟんぎもぢいい!!

```ruby
class Integer
  def upto_with_exception(to, **options)
    exception_array = *options[:except] #=> nilでも何でもおかまいなし！
    exceptions = Hash[exception_array.zip]

    self.upto(to) { |i| p i unless exceptions.has_key?(i) }
  end
end

1.upto_with_exception(5) #=> 1, 2, 3, 4, 5
1.upto_with_exception(5, except: 3) #=> 1, 2, 4, 5
1.upto_with_exception(5, except: 2..3) #=> 1, 4, 5
1.upto_with_exception(5, except: [4, 5]) #=> 1, 2, 3
```
