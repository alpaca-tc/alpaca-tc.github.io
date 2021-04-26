import core from 'puppeteer-core';
import { defaultOptions } from './options';
import { ScreenshotOptions } from 'puppeteer-core/lib/types';

let _page: core.Page | null;

const getPage = async (): Promise<core.Page> => {
  if (_page) {
    return _page;
  }

  const options = defaultOptions;
  const browser = await core.launch(options);
  _page = await browser.newPage();

  return _page;
}

export const WIDTH = 1200
export const HEIGHT = 626

export const getScreenshot = async (html: string, type: ScreenshotOptions['type']) => {
  const page = await getPage();

  await page.setViewport({ width: WIDTH, height: HEIGHT });
  await page.setContent(html);

  const file = await page.screenshot({ type });

  return file as Buffer;
}
