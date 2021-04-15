import Link from 'next/link'
import dayjs from '../lib/dayjs'
import { PostMetadata } from '../types/PostMetadata'
import { FunctionComponent } from "react"

type PrevNextPostNavProps = {
  prevPost?: PostMetadata,
  nextPost?: PostMetadata,
}

const PrevNextPostNav: FunctionComponent<PrevNextPostNavProps> = ({ prevPost, nextPost }) => {
  const prevPostLink = prevPost ? (
    <Link href={`/posts/${prevPost.id}`}>
      <a className="block lg:flex-half text-gray-600 transition duration-300 hover:text-gray-900 mt-1 mb-1 pt-4 pb-4 border border-solid border-l-0 border-r-0 border-b-0">
        <div>
          <span className="block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-2 no-underline">
            前の記事
          </span>

          <span className="block text-gray-500 uppercase text-xs tracking-wide no-underline">
            {dayjs(prevPost.date).format('YYYY-MM-DD')}
          </span>

          <div className="underline">
            {prevPost.title}
          </div>
        </div>
      </a>
    </Link>
  ) : null

  const nextPostLink = nextPost ? (
    <Link href={`/posts/${nextPost.id}`}>
      <a className="block lg:flex-half text-gray-700 transition duration-300 hover:text-gray-900 mt-1 mb-1 pt-4 pb-4 border border-solid border-l-0 border-r-0 border-b-0">
        <div>
          <span className="block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-2 no-underline">
            次の記事
          </span>

          <span className="block text-gray-500 uppercase text-xs tracking-wide no-underline">
            {dayjs(nextPost.date).format('YYYY-MM-DD')}
          </span>

          <div className="underline">
            {nextPost.title}
          </div>
        </div>
      </a>
    </Link>
  ) : null

  return (
    <div className="border-solid border-t-1 border-b-1 border-gray-900">
      {prevPostLink}
      {nextPostLink}
    </div>
  )
}

export default PrevNextPostNav
