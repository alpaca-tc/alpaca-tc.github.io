---
layout: post
title: Rustでブラウザからバイナリをパースする
date: 2020-12-21 17:21
comments: true
categories: rust
---

この記事は[Rust Advent Calendar 2020](https://qiita.com/advent-calendar/2020/rust) 21日目の記事です。

お仕事のメインはRuby/TypeScriptを使っていますが、新しいことを学びたいなーと思って、Rustを勉強し始めてみました。  
今回はWebAssemblyを使って、ブラウザからバイナリファイルをパースする処理を書いてみます。

## RustをWebAssemblyに変換する

この手の記事は沢山あるので、ざっくりやり方だけ書いておきます。  
[`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen)と[`wasm-pack`](https://github.com/rustwasm/wasm-pack)をインストールして、

```
# Cargo.toml
[package]
name = "app"
version = "0.0.1"
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.63"
```

```rust
# src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
struct ApplicationRunner();

#[wasm_bindgen]
impl ApplicationRunner {
    pub fn new() {}
}
```

```html
# index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <script type='module'>
      import init, { ApplicationRunner } from './app.js'

      (async () => {
        await init('/app.wasm')
        new ApplicationRunner()
      })()
    </script>
  </body>
</html>
```

あとは `wasm-pack` を使ってコンパイルすれば完成です。
めちゃ簡単。

```
$ wasm-pack build --no-typescript --dev --target web --out-dir ./public
```

## ファイルを読み込む

続いて、ブラウザから、ファイルを指定してRustにパースさせる導線を作っていきます。  
先ほど定義した `ApplicationRunner` をnewしたタイミングで、イベントをlistenしたDOMをレンダリングしておきます。

DOMの生成には `virtual_dom_rs` と `web_sys` と `js_sys` を使います。  
すごく単純な例では、こんな感じでDOMをマウントすることができます。

```rust
let vdom = html! { <div></div> };
let window = web_sys::window().unwrap()
let dom_updater = DomUpdater::new_append_to_mount(vdom, &window.document().unwrap().body().unwrap());
dom_updater.update(vdom);
```

今回はファイルの読み込みをしたいので、vdomの中身を書き換えて、inputタグにイベントを仕込んだDOMにしてみます。

```rust
html! {
  <input
    type="file"
    onchange=move |event: web_sys::InputEvent| {
        let target = event.target().unwrap();
        let input = target.dyn_ref::<HtmlInputElement>().unwrap();
        let files = input.files().unwrap();
        let file = files.item(0).unwrap();

        let file_reader = web_sys::FileReader::new().unwrap();
        file_reader.read_as_array_buffer(&file).unwrap();

        let mut onload = Closure::wrap(Box::new(move |event: Event| {
            let file_reader: FileReader = event.target().unwrap().dyn_into().unwrap();
            let file = file_reader.result().unwrap();
            let file = js_sys::Uint8Array::new(&file);

            let mut bytes = vec![0; file.length() as usize];
            file.copy_to(&mut bytes);

            // ここにファイルの中身のパースを開始する処理を追加する
            do_something(&bytes)
        }) as Box<FnMut(_)>);

        file_reader.set_onload(Some(onload.as_ref().unchecked_ref()));
        onload.forget();
    }
  >
}
```

## ファイルをパースする

ファイルの読み込みする処理が書けたので、次はファイルをパースしていきます。  
単にバイナリを読んでいくだけであれば `std::io::Cursor` だけでいけますが、little endianを読み込もうとするとやや操作が面倒です。  

そこで、[byteorder](https://docs.rs/byteorder/1.3.4/byteorder/)を使って読み込んでいきます。  
下記の例では、今後UTF8の文字列変換や特定のバイナリに特化した読み込みに対応する時に拡張しやすくするために、読み取り用のwrapperを用意しました。  
単純なzipファイルのパースであれば、file name fieldやextra fieldなどの可変長のfieldがあるため、指定長でvecやstringを返すメソッドも用意するといいかもしれません。

```rust
use byteorder::{BigEndian, ByteOrder, LittleEndian, ReadBytesExt};

pub struct Binary<'a> {
    cursor: Cursor<&'a [u8]>,
}

impl<'a> Binary<'a> {
    pub fn new(bytes: &[u8]) -> Binary {
        Binary {
            cursor: Cursor::new(bytes),
        }
    }

    pub fn position(&mut self) -> u64 {
        self.cursor.position()
    }

    pub fn read_little_u16(&mut self) -> Result<u16, Error> {
        Ok(self.cursor.read_u16::<LittleEndian>().unwrap())
    }

    pub fn read_little_u32(&mut self) -> Result<u32, Error> {
        Ok(self.cursor.read_u32::<LittleEndian>().unwrap())
    }

    pub fn read_u16(&mut self) -> Result<u16, Error> {
        Ok(self.cursor.read_u16::<BigEndian>().unwrap())
    }

    pub fn read_u32(&mut self) -> Result<u32, Error> {
        Ok(self.cursor.read_u32::<BigEndian>().unwrap())
    }

    pub fn read_i16(&mut self) -> Result<i16, Error> {
        Ok(self.cursor.read_i16::<BigEndian>().unwrap())
    }

    pub fn read_i32(&mut self) -> Result<i32, Error> {
        Ok(self.cursor.read_i32::<BigEndian>().unwrap())
    }
}
```

### パース処理を書いていく

過去にRubyでpsdやzipのパーサを書いたことがあるのですが、これらは仕様書通りの単純な構造だったので、同様に先頭から読み込んでstructに詰めていくだけでいけそうです。  
今回はzipのヘッダーをパースする処理の書いてみます。

```rust
// == LocalFileHeader
//
// local file header signature     4 bytes  (0x04034b50)
// version needed to extract       2 bytes
// general purpose bit flag        2 bytes
// compression method              2 bytes
// last mod file time              2 bytes
// last mod file date              2 bytes
// crc-32                          4 bytes
// compressed size                 4 bytes
// uncompressed size               4 bytes
// file name length                2 bytes
// extra field length              2 bytes
struct LocalFileHeader {
    pub signature: u32,
    pub version: u16,
    pub general_purpose_bit_flag: u16,
    pub compression_method: u16,
    pub last_modified_file_time: u16,
    pub last_modified_file_date: u16,
    pub crc_32: u32,
    pub compressed_size: u32,
    pub uncompressed_size: u32,
    pub file_name_length: u16,
    pub extra_field_length: u16,
}

impl LocalFileHeader {
    pub fn from_bytes(bytes: &[u8]) -> Result<LocalFileHeader, Error> {
        let mut binary = Binary::new(bytes);

        let signature = binary.read_little_u32()?;
        let version = binary.read_little_u16()?;
        let general_purpose_bit_flag = binary.read_little_u16()?;
        let compression_method = binary.read_little_u16()?;
        let last_modified_file_time = binary.read_u16()?;
        let last_modified_file_date = binary.read_u16()?;
        let crc_32 = binary.read_u32()?;
        let compressed_size = binary.read_u32()?;
        let uncompressed_size = binary.read_u32()?;
        let file_name_length = binary.read_u16()?;
        let extra_field_length = binary.read_u16()?;

        Ok(LocalFileHeader {
            signature,
            version,
            general_purpose_bit_flag,
            compression_method,
            last_modified_file_time: last_modified_file_time,
            last_modified_file_date,
            crc_32,
            compressed_size,
            uncompressed_size,
            file_name_length,
            extra_field_length,
        })
    }
}
```

とても簡単ですね。

## パースした内容をHTMLにレンダリングする

では、最後にパースした内容をHTMLへレンダリングしてみます。  
諸々省略しているのでこのままでは動きませんが、雰囲気としてはこんな感じでDOMを生成して、初めに作ったDomUpdaterのupdateに返り値のVirtualNodeを渡せばOKです。

```rust
// let local_file_header = LocalFileHeader::from_bytes(&bytes)
// let vdom = render(...)
// dom_updater.update(vdom); という感じで使う
fn render(local_file_header: &LocalFileHeader) -> VirtualNode {
    html! {
      <div>
        <span>
          signature: {format!("{:X}", local_file_header.signature)}
          <br>
          version: {format!("{:X}", local_file_header.version)}
          <br>
          general_purpose_bit_flag: {format!("{:X}", local_file_header.general_purpose_bit_flag)}
          <br>
          compression_method: {format!("{:X}", local_file_header.compression_method)}
          <br>
          last_modified_file_time: {format!("{:X}", local_file_header.last_modified_file_time)}
          <br>
          last_modified_file_date: {format!("{:X}", local_file_header.last_modified_file_date)}
          <br>
          crc_32: {format!("{:X}", local_file_header.crc_32)}
          <br>
        </span>
      </div>
    }
}
```

## まとめ

今回は`wasm-bindgen`を使ってブラウザでファイルをパースする処理を書いてみました。  
もう少しパース処理を作り込んでいけば、画像変換やzipの再圧縮などいろいろな処理を書くことができそうです。

可能であれば、仕事でもちゃんとRust書いてみたいのでReal Worldの活用事例をもっと知りたいなぁと思いました(´・ω・｀)
