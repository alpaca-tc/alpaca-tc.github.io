import Image from 'next/image'
import Link from 'next/link'
import {
  useHeaderState,
} from '../context/header'
import ActiveLink from './ActiveLink'
import { FunctionComponent } from "react"

const postPathRe = /^(?:\/|\/posts\/.*)$/

const Header: FunctionComponent = () => {
  const headerState = useHeaderState()

  return (
    <>
      <div className="relative z-20 flex justify-between items-center">
        <div className="flex lg:flex md:block items-center max-w-full">
          <div className="mb-0 md:mb-4 lg:mb-0 flex flex-shrink-0 pr-4 md:pr-6 lg:pr-12">
            <Link href="/">
              <div className="inline-block h-10 w-10 md:h-12 md:w-12 lg:h-20 lg:w-20">
                <a className="flex items-center no-underline">
                  <Image
                    src="/images/profile.jpg"
                    alt=""
                    className="rounded-full"
                    width="100%"
                    height="100%"
                  />
                </a>
              </div>
            </Link>
          </div>

          <div>
            <Link href="/">
              <a className="block text-black no-underline font-bold text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight">
                alpaca-tc
              </a>
            </Link>

            <div className="hidden md:flex mt-3 lg:mt-4 uppercase tracking-wide text-xs space-x-6">
              <ActiveLink
                href="/"
                hrefRe={postPathRe}
                activeClassName="text-black font-semibold no-underline hover:text-black"
              >
                <a className="text-gray-500 font-semibold no-underline hover:text-black">
                  Posts
                </a>
              </ActiveLink>
              <ActiveLink
                href="/about_me"
                activeClassName="text-black font-semibold no-underline hover:text-black"
              >
                <a className="text-gray-500 font-semibold no-underline hover:text-black">
                  About Me
                </a>
              </ActiveLink>
              <ActiveLink
                href="/works"
                activeClassName="text-black font-semibold no-underline hover:text-black"
              >
                <a className="text-gray-500 font-semibold no-underline hover:text-black">
                  Works
                </a>
              </ActiveLink>
              <a
                href="https://github.com/alpaca-tc"
                className="text-gray-500 font-semibold no-underline hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/alpaca-tc"
                className="text-gray-500 font-semibold no-underline hover:text-black"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="block md:hidden" onClick={headerState.toggleHeader}>
          <button className="block">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className={`text-black h-6 w-6 ${
                headerState.opened ? 'hidden' : 'block'
              }`}
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className={`text-black h-6 w-6 ${
                headerState.opened ? 'block' : 'hidden'
              }`}
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden z-10 bg-white fixed pt-24 pin block ${
          !headerState.opened && 'hidden'
        }`}
      >
        <div className="space-y-8 overflow-y-auto pt-6 pb-8 px-12 max-h-full overflow-y-auto">
          <Link href="/">
            <a
              onClick={headerState.closeHeader}
              className="block text-black font-bold no-underline"
            >
              Posts
            </a>
          </Link>

          <Link href="/about_me">
            <a
              onClick={headerState.closeHeader}
              className="block text-black font-bold no-underline"
            >
              About Me
            </a>
          </Link>

          <Link href="/works">
            <a
              onClick={headerState.closeHeader}
              className="block text-black font-bold no-underline"
            >
              Works
            </a>
          </Link>

          <a
            onClick={headerState.closeHeader}
            href="https://github.com/alpaca-tc"
            className="block text-black font-bold no-underline"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            onClick={headerState.closeHeader}
            href="https://twitter.com/alpaca-tc"
            className="block text-black font-bold no-underline"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
