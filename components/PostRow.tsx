import { FunctionComponent } from 'react'
import { PostMetadata } from "../types/PostMetadata"
import Link from "next/link"
import dayjs from '../lib/dayjs'

type PostRowProps = {
  post: PostMetadata
}

const PostRow: FunctionComponent<PostRowProps> = ({ post }) => {
  return (
    <div>
      <span className="block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-1">
        {dayjs(post.date).format('YYYY-MM-DD')}
      </span>
      <Link href={`/posts/${post.id}`}>
        <a className="text-lg text-black font-bold no-underline hover:underline">
          {post.title}
        </a>
      </Link>
    </div>
  )
}

export default PostRow
