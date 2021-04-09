import "../types/window.d"

export const GA_ID = 'UA-44082439-2'

export const pageview = (path: string): void => {
  gtag('config', GA_ID, { page_path: path })
}
