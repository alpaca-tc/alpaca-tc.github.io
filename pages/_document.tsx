import Document, {
  Html,
  Main,
  NextScript,
} from 'next/document'

import { Head as DocumentHead } from 'next/document'

class CustomDocument extends Document {
  public render(): JSX.Element {
    return (
      <Html lang="ja">
        <DocumentHead />
        <body className="font-sans text-black leading-tight antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
