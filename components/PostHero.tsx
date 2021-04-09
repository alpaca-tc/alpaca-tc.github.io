import { FunctionComponent } from "react"
import { Post } from "../types/PostMetadata"
import dayjs from '../lib/dayjs'

type PostHeroProps = {
  post: Post
}

const PostHero: FunctionComponent<PostHeroProps> = ({ post }) => {
  return (
    <>
      <div className="text-grey-dark uppercase font-semibold text-xs tracking-wide">
        {dayjs(post.date).format('YYYY-MM-DD')}
      </div>
      <h1 className="text-2xl font-extrabold text-black leading-tight mt-1 mb-6">
        {post.title}
      </h1>
    </>
  )
}

export default PostHero
