---
title: nextjsの静的配信ブログで自前生成のog-imageを配信する
date: 2021-05-07 20:00
categories: diary
---

og-imageってなんだっけというと、記事をシェアする際に画面に表示されるコレです。

<img class="image_on_frame center" src="https://opengraph.githubassets.com/0a2f84a49c6dded83bcddc8e522ca657eccedcb932ac44fa89733e8a6afeb8ee/alpaca-tc/alpaca-tc.github.io/pull/7" alt="参考のog-image" />

zenn.devといいGitHubといい、最近はコンテンツの内容を元に動的に生成されたリッチなog-imageが増えてきました。

この記事では、流行りのog-image生成方法をおさらいしつつ、このブログが採用したやり方を紹介します。

## og-image生成の主流

最近よく見るog-imageの生成方法は、og-imageを生成するマイクロサービスを立てて、動的に画像を生成するやり方です。

<a href="https://og-image.vercel.app/hello_world.png" target="_blank">https://og-image.vercel.app/hello_world.png</a>

例えば、上のURLを開くとパスの `hello_world` の部分をテキストに変換してこんな画像を生成してくれます。

<img class="image_on_frame center" src="https://og-image.vercel.app/hello_world.png" alt="hello_world" />

なので、あとはURLをmetaに追記するだけでog-imageの対応が完了します。

```html
<meta name="twitter:img:src" content="https://og-image.vercel.app/hello_world.png">
```

このやり方は、URLを指定するだけでog-imageを作ることができるので楽ちんです。

## og-imageを自前で生成する

このブログはNext.jsで書かれており、`next export` で出力したHTMLをgithub pagesで配信しています。
先ほど紹介したようなマイクロサービスのやり方だと、管理するhostが増えるのでgithub pagesの旨味がなくなります。

そこで、このブログでは古典的なデプロイ時にog-imageを生成する戦略を取りました。

### どうやってog-imageを生成しているか

このブログではheadless Chromeの[puppeteer](https://github.com/puppeteer/puppeteer)を使っています。

いい感じにスタイルをあてたHTMLをChromeに喰わせて、レンダリングされた画面をpngに変換する画像生成を行っています。
下記のように、HTMLを生成する処理と、HTMLからpngに変換する処理を実行することで、簡単に画像生成ができます。

```typescript
import core from 'puppeteer-core';
import fs from 'fs'

const executablePath = (() => {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  } else if (process.platform === 'linux') {
    return '/usr/bin/google-chrome'
  } else {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }
})()

const browser = await core.launch(
  args: [],
  executablePath,
  headless: true
)
const page = await browser.newPage();

const width = 1200
const height = 626

const getScreenshot = async (html: string, type: string = 'png'): Promise<Buffer> => {
  const page = await getPage();

  await page.setViewport({ width, height });
  await page.setContent(html);

  const file = await page.screenshot({ type });

  return file as Buffer;
}

const generateHtml = (title: string): string => {
  // サンプルコードなので省略
  // ここではCSSは<style>に埋め込んで、og-imageのデザインをHTMLで表現する
  return `
    <!DOCTYPE html>
    <html>
      <head>...</head>
      <body>...</body>
    </html>
  `
}

titles.forEach(async ({ title }) => {
  const html = generateHtml(title)
  const buf = await getScreenshot(html)
  await fs.promises.writeFile(`public/og-images/${title}.png`, buf, 'ascii')
})
```

あとはこれを実行すれば、og-imageの出来上がりです。
それっぽい画像を作ることができました。

<img class="image_on_frame center" src="/og-images/2021-05-06-generated-og-images.png" alt="nextjsの静的配信ブログでog-imageを配信する" />

なお、いくつか細かい処理を省略しているので、実際の処理についてはgithubを見てください
[alpaca-tc/alpaca-tc.github.io](https://github.com/alpaca-tc/alpaca-tc.github.io/blob/master/scripts/generate_og_image.ts)

## 感想

今回自前で処理を書くにあたって、世の中のマイクロサービスを眺めてみたんですが、どれも似たようなものでした。
この処理をマイクロサービスに移せば、og-imageの動的生成もできるので、案外そんなものだったのかと思いました。
