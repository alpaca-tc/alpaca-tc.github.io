---
layout: post
title: NeoComplete vs YouCompleteMe
date: 2013-12-10 00:04
comments: true
categories: vim
---

この記事は[Vim Advent Calendar 2013](https://atnd.org/events/45072)の10日目です。

先日は[@Linda](https://twitter.com/Linda_pp)さんの[無数のパッチを組み合わせて君だけの MacVim を作ろう！](http://rhysd.hatenablog.com/entry/2013/12/09/001219)でした。

大学卒業までに、自分専用Vimを作ろうと思っている自分にとって大変参考になる記事でした。

# NeoComplete VS YouCompleteMe

さてさて、本日のAdvent CalendarではVimの補完プラグインの2大巨頭を比較してみようと思います。

<!-- more -->

- [NeoComplete](https://github.com/Shougo/neocomplete.vim) - (Shougoさん作)
- [YouCompleteMe](https://github.com/Valloric/YouCompleteMe) - (Valloricさん作)

元々、僕は**大のShougo wareファン**です。(Sourceや、本体への貢献も少ししています)

そんな僕もVimを探求する気持ちから、ついYouCompleteMeに手を出してしまいました!!!


**「は...速いぞこいつ！！」**

その補完速度の衝撃さることながら、他にも素晴らしいことが。

つい、NeoCompleteからの乗り換えが脳裏をよぎり、2週間使ってみることにしました。

## 何について書くの？

結論から言うと、NeoCompleteに戻ってきました。

しかし、**NeoCompleteに改善の余地がある**ことに気付きました。

「YCMのここが良かったから、NeoCompleteに取り入れよう！」という話をしたいと思います。

## YouCompleteMeの良かった点

- **補完が早い**
- **ファイル補完**が素晴らしい
- 設定がほぼ不要
- jedi.vim / clang-completeとの連携が容易
- fuzzy補完が使いやすい！
- YCM、と略しやすい。←

補完スピードに関しては、感動しました。

### ファイル補完機能

特筆すべきはファイル補完機能についてです。

使ってわかる、YCMのファイル補完の素晴らしさ。

<img class="image_on_frame center" src="/images/blog/file_complete.png" alt="YCMのファイル補完機能" />

- "[Dir], [File]"で、補完候補の種類を入力している
- ファイル補完時、バッファ補完などのノイズが入らない

今まで、NeoCompleteで満足していたんですが、YCMを使って初めて改善の余地があることに気付きました。

## YouCompleteMeの悪かった点

- 補完の種類が少ない
- カスタマイズができない。
- 補完候補の`dup`フラグが全てオン

いや、一応カスタマイズしてNeoCompleteの移植できたんですけどね。疲れました。

## NeoCompleteを改善する

さて、YCMを使って2週間。良いところをいくつか取り入れましょう。

**(追記: ファイル補完に関する修正は、本家に取り込まれました)**

### 1. file補完のノイズを改善する

デフォルトのNeoCompleteのfile補完のrankが低いため、ファイル補完時に他の候補が上にきてしまいます。

ファイル補完の優先順位をあげましょう。

```
call neocomplete#custom#source('file', 'rank', 10)
```

これに関しては、**元々のファイル補完のrankがなぜ低いのか疑問**です。理由があるのでしょうか。

### 2. file補完で[Dir], [File]を表示する

NeoCompleteに[パッチ](https://gist.github.com/qickstarter/7872458)をあてます。

これで、YouCompleteMeと同じファイル補完を実現できます。

### 3. 補完速度を向上する

YCMでは、補完が少し止まる感覚が一切ありませんでした。

NeoCompleteはsourceを駆け巡って、頑張って補完候補を取得しているのである程度は仕方ないです。

ただ、自分の環境にあわせれば、補完スピードはあがるはずです。

```
" 極端な例ですが、下記のような操作で補完をチューニングできます

" 補完を始めるキーワード長を長くする
let g:neocomplete#sources#syntax#min_keyword_length = 4
let g:neocomplete#auto_completion_start_length = 4

" 補完が止まった際に、スキップする長さを短くする
let g:neocomplete#skip_auto_completion_time = '0.2'

" 使用する補完の種類を減らす
" 現在のSourceの取得は `:echo keys(neocomplete#variables#get_sources())`
" デフォルト: ['file', 'tag', 'neosnippet', 'vim', 'dictionary', 'omni', 'member', 'syntax', 'include', 'buffer', 'file/include']
let g:neocomplete#sources = {
  \ '_' : ['vim', 'omni', 'include', 'buffer', 'file/include']
  \ }

" 特定のタイミングでのみ使う補完は、直接呼び出すようにする
inoremap <expr><C-X><C-F>  neocomplete#start_manual_complete('file')
inoremap <expr><C-X><C-K>  neocomplete#start_manual_complete('dictionary')
inoremap <expr><C-X>s      neocomplete#start_manual_complete('neosnippet')
```

## まとめ

浮気して、彼女の良さに気付くパターンです。

YCMを使って気付きました。なんだかんだ**NeoCompleteが最高**ですね！！
