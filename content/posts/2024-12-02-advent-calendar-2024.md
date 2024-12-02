---
title: Railsで任意のキャッシュストアを移行する
date: 2024-12-02 19:00
categories: ruby
---

[SmartHR Advent Calendar 2024](https://qiita.com/advent-calendar/2024/smarthr)の2日目です。

Railsでは `Rails.cache` でキャッシュストアを扱うことができます。  
このキャッシュストアを、保存先の変更や、gemの変更等で別のキャッシュストアに移行することが稀にあります。

今回は、そんなキャッシュストアの移行手順について書いていきます。

## 1. ハイブリッドのキャッシュストアを定義する

本番環境でキャッシュストアを変更する際には、新旧のキャッシュストアを一気に入れ替えると不具合が起きて困るでしょう。  
まずは、移行期間には双方のキャッシュストアが使えるようなハイブリッドのキャッシュストアを定義します。

```ruby
class HybridCache < ActiveSupport::Cache::Store
  def initialize(new_cache:, old_cache:)
    @new_cache = new_cache
    @old_cache = old_cache
  end

  def read(...)
    old_cache.read(...) || new_cache.read(...)
  end
  # fetch/exist?/read_multi/fetch_multi を同様に実装する

  def clear
    old_cache.clear
    new_cache.clear
  end
  # delete/delete_matched/write/write_multi/increment/decrement 等を同様に実装する

  def silence!
    old_cache.silence!
    new_cache.silence!
  end

  def mute
    old_cache.mute do
      new_cache.mute do
        yield
      end
    end
  end

  private

  attr_reader :old_cache, :new_cache
end
```

```ruby
config.cache_store = Hanica::HybridCache.new(
  old_cache: ActiveSupport::Cache::XxxCacheStore.new(...),
  new_cache: ActiveSupport::Cache::XxxCacheStore.new(...)
)
```

## 2. デプロイする

ハイブリッドのキャッシュストアを定義したら、デプロイして本番環境でキャッシュを同期していきます。  

実際のところ、新旧どちらのキャッシュ結果を優先するかで実装は若干変わりますが、新旧のキャッシュストアをうまく稼働させることで、移行期間中に新しいキャッシュストアにもキャッシュが反映されていくようにしています。

## 3. 新しいキャッシュストアに移行する

最後に、十分に移行期間が経過して新しいキャッシュストアにキャッシュが書き込まれたら、新しいキャッシュストアに移行します。

```ruby
config.cache_store = ActiveSupport::Cache::XxxCacheStore.new(...)
```

これにて、Railsで任意のキャッシュストアを移行する手順を紹介しました。  
実際には[redis-activesupport](https://github.com/redis-store/redis-activesupport)からRails本体のRedis実装に移行したのですが、この手順で問題なく移行できました。  

以外と、誰も手順を公開していなかったので参考になれば幸いです。
