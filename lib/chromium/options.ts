const executablePath = (() => {
  if (process.platform === 'win32') {
    return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  } else if (process.platform === 'linux') {
    return '/usr/bin/google-chrome'
  } else {
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }
})()

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

export const defaultOptions: Options = {
  args: [],
  executablePath,
  headless: true
};
