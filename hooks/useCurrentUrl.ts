import { useRouter } from "next/router";

export const useCurrentUrl = (): string => {
  const router = useRouter();
  const origin = 'https://alpaca.tc'

  return `${origin}${router.asPath}`
}
