---
layout: post
title: Rubyのクラス変数について詰まったのでヘルプ
date: 2013-12-16 01:10
comments: true
categories: ruby
---

基本的に、仕事でクラス変数を扱うことはほぼ無いです。

今回は遊びのコードを書いていて、悩んだことをまとめました。

<!-- more -->

# Rubyのクラス変数の扱いが難しい...。

これ、結構Ruby書いている自分でも初めて遭遇して悩む問題だった。

まず、次のような動くコードを書いてみた。

```ruby
class Base; end

class Node < Base
  @@val = 'Node'
end

class Branch < Base
  @@val = 'Branch'
end

p Node.class_variable_get('@@val') #=> 'Node'
p Branch.class_variable_get('@@val') #=> 'Branch'
```

ふむ、それぞれの派生クラスでクラス変数が使えますね。

では、続いて基底クラスにもクラス変数を与えてみる。

```ruby
class Base
  @@val = nil
end

class Node < Base
  @@val = 'Node'
end

class Branch < Base
  @@val = 'Branch'
end

p Node.class_variable_get('@@val') #=> 'Branch'
p Branch.class_variable_get('@@val') #=> 'Branch'
```

Ooops!!! 派性クラス内のクラス変数が、基底クラス変数を参照しよる！！

## 解決編

やりたいことは、派生クラスの子クラスに共通の変数を持たせるということ。

うーん、意外と難しい！

どうもクラス変数という感じではなくなるけれど、こうするしかないのだろうか...。

メソッドにしてみたら、とっても気持ちが悪い。

```ruby
class Base
  class << self
    private

    def val
      'Base'
    end
  end
end

class Node < Base
  class << self
    private

    def val
      'Node'
    end
  end
end

class Branch < Base
  class << self
    private

    def val
      'Branch'
    end
  end
end

p Node.send(:val) #=> 'Node'
p Branch.send(:val) #=> 'Branch'
```

これだと、一応コードとして動く。 ただ、**これは無いだろ感**あるよね。

しかし、クラスインスタンス変数だと継承されないし、こうするしかないのかなぁ。

**だれか正しい方法があれば、教えてください！** >_<

### 追記

思いついたんだけど、継承するときにクラスインスタンス変数を渡せばいいのかな？

どうでしょう。

```ruby
class Base
  @val = 'Base'

  def self.inherited(klass)
    klass.instance_variable_set('@val', @val)
  end
end

class Node < Base; end
class Branch < Base; end

p Node.instance_variable_get('@val') #=> 'Base'
p Branch.instance_variable_get('@val') #=> 'Base'
```
