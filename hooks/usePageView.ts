import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview } from "../lib/gtag"

const usePageView = (): void => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
}

export default usePageView;
