import Head from 'next/head'
import { useHeaderState } from '../context/header'
import Header from './Header'
import { FunctionComponent } from "react"
import { useRouter } from 'next/router'

type LayoutProps = {
  children: React.ReactNode
  title?: string
  ogImage?: string
  description?: string
}

const defaultTitle = 'alpaca-tc'
const defaultDescription = ''

const getCurrentUrl = (): string => {
  const router = useRouter();
  const origin = 'https://alpaca.tc'

  return `${origin}${router.asPath}`
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  title,
  ogImage = "https://alpaca.tc/images/common/profile.jpg",
  description = defaultDescription
}) => {
  const headerState = useHeaderState()
  const bodyClassName = headerState.opened
    ? 'scrolling-auto overflow-hidden fixed pin-x'
    : '';

  const headTitle = title ? [title, defaultTitle].join(' - ') : defaultTitle;

  return (
    <div className={`py-8 lg:py-16 px-6 md:px-16 lg:px-24 ${bodyClassName}`}>
      <Head>
        <title>{headTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name='title' content={headTitle} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/images/common/favicon.ico" type="image/x-icon" />
        <meta name="google-site-verification" content="thSL3cUT7BV1-AENglRFIF-kv6I85JJ6_iUGAU8GaQI" />

        <meta property="og:title" content={headTitle} />
        <meta property="og:locale" content="ja_JP"/>
        <meta property="og:image" content={ogImage}/>
        <meta property="og:type" content="blog"/>
        <meta property="og:url" content={getCurrentUrl()}/>
        <meta property="og:site_name" content={defaultTitle}/>
        <meta property="og:description" content={description} />
        <meta property="fb:app_id" content="224701561024840" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@alpaca_tc" />
        <meta name="twitter:creator" content="@alpaca_tc" />
      </Head>

      <Header />

      <div className="lg:pl-32 mt-12">{children}</div>
    </div>
  )
}

export default Layout
