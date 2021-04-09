import '../styles/global.scss'
import { AppProps } from 'next/app'
import { HeaderProvider } from '../context/header'
import Head from 'next/head'
import { GA_ID } from "../lib/gtag"
import withPageView from "../hooks/withPageView"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  withPageView()

  return (
    <HeaderProvider>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-44082439-2"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_ID}');
            `
          }}
        >
        </script>
      </Head>

      <Component {...pageProps} />
    </HeaderProvider>
  )
}

export default App
