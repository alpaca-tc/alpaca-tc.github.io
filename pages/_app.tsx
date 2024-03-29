import '../styles/global.scss'
import { AppProps } from 'next/app'
import { HeaderProvider } from '../context/header'
import { GA_ID } from "../lib/gtag"
import usePageView from "../hooks/usePageView"
import Script from "next/script"

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  usePageView()

  return (
    <HeaderProvider>
      <Script
        id="gtag"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `
        }}
      >
      </Script>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-44082439-2" />

      <Component {...pageProps} />
    </HeaderProvider>
  )
}

export default App
