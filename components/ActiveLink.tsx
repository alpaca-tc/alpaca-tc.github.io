import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { ReactElement, FunctionComponent } from 'react'

type ActiveLinkProps = {
  children: ReactElement | string
  className?: string
  hrefRe?: RegExp
  activeClassName?: string
} & LinkProps

const ActiveLink: FunctionComponent<ActiveLinkProps> = ({ children, hrefRe, activeClassName, className, ...props }) => {
  const { href } = props
  const router = useRouter()

  if ((hrefRe && hrefRe.test(router.pathname)) || router.pathname === href) {
    className = `${activeClassName} ${className}`
  }

  return <Link {...props} className={className}>{children}</Link>
}

export default ActiveLink
