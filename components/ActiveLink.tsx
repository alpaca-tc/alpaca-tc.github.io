import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import React, { ReactElement, FunctionComponent } from 'react'

type ActiveLinkProps = {
  children: ReactElement
  hrefRe?: RegExp
  activeClassName?: string
} & LinkProps

const ActiveLink: FunctionComponent<ActiveLinkProps> = ({ children, hrefRe, activeClassName, ...props }) => {
  const { href } = props
  const router = useRouter()
  const child = React.Children.only(children)

  const className =
    ((hrefRe && hrefRe.test(router.pathname)) || router.pathname === href)
      ? activeClassName
      : child.props.className

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default ActiveLink
