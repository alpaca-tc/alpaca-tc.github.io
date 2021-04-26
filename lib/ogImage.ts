import { readFileSync } from 'fs';
import { sanitizeHtml } from './chromium/sanitizer';
import { getScreenshot } from "./chromium"
import { HEIGHT, WIDTH } from "../lib/chromium"
import { formatDate } from "./formatDate"

const profileImage = readFileSync(`${__dirname}/../public/images/profile.jpg`).toString('base64')
const profileSource = `data:image/jpeg;base64, ${profileImage}`

const getCss = (): string => {
  const background = 'white';
  const foreground = 'black';
  const lightForeground = 'gray';
  const radial = 'lightgray';

  const footerLineHeight = 30
  const footerHeightPx = 70
  const footerBackground = '#24606A'

  return `
  * {
    padding: 0;
    margin: initial;
  }

  body {
    font-family: -apple-system, 'Inter', "BlinkMacSystemFont", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    background: ${footerBackground};
  }

  .main-wrapper {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background: ${background};
    background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
    background-size: 100px 100px;
    height: ${HEIGHT - footerLineHeight}px;
  }

  .main {
    height: 100%;
    width: ${WIDTH - 100}px;
    margin: initial auto;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    flex-direction: column;
  }

  .footer {
    display: flex;
    height: 100px;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }

  .footer-line {
    height: ${footerLineHeight}px;
    width: 100%;
  }

  .author {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .author-image {
    height: ${footerHeightPx}px;
    width: ${footerHeightPx}px;
    border-radius: ${footerHeightPx}px;
    overflow: hidden;
  }

  .author-image img {
    width: 100%;
  }

  .figcaption {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    height: ${footerHeightPx}px;
    line-height: ${footerHeightPx}px;
    margin-left: 12px;
  }

  .figcaption .author-name {
    font-size: 32px;
    font-weight: 600;
  }

  .figcaption .author-date {
    margin-left: 12px;
    font-size: 32px;
    color: ${lightForeground};
  }

  .site-domain {
    display: flex;
    margin-left: auto;
    align-items: center;
    justify-content: center;
  }

  .home-icon {
    height: 30px;
    display: inline-block;
    vertical-align: bottom;
  }

  .home-icon svg {
    height: 30px;
    line-height: 30px;
  }

  .site-domain-tip {
    display: inline-block;
    font-size: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    margin-left: 8px;
  }

  .heading {
    display: flex;
    width: 100%;
    flex: 2;
    align-items: center;
    justify-content: center;
    font-size: 86px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    color: ${foreground};
    line-height: 1.4;
  }`;
}

const getHtml = (title: string, date: string) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${getCss()}</style>
      </head>
      <body>
        <div class="main-wrapper">
          <div class="main">
            <div class="heading">
              ${sanitizeHtml(title)}
            </div>

            <div class="footer">
              <figure class="author">
                <div class="author-image">
                  <img
                    class="author-image"
                    src="${profileSource}"
                    width="240"
                    height="240"
                  />
                </div>
                <figcaption class="figcaption">
                  <span class="author-name">@alpaca-tc</span>
                  <span class="author-date">published on ${formatDate(date)}</span>
                </figcaption>
              </figure>

              <div class="site-domain">
                <div class="home-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-home fa-w-18 fa-2x"><path fill="currentColor" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" class=""></path></svg>
                </div>
                <div class="site-domain-tip">alpaca.tc</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export const generateOgImage = async (title: string, date: string): Promise<Buffer | string> => {
  const html = getHtml(title, date)
  return await getScreenshot(html, 'png')
}
