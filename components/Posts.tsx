import { FunctionComponent } from "react"
import { PostMetadata } from "../types/PostMetadata"
import Pagination from './Pagination'
import PostRow from './PostRow'

type PostsProps = {
  posts: PostMetadata[]
  totalCount: number
  currentPage: number
  perCount: number
}

const Posts: FunctionComponent<PostsProps> = ({ posts, totalCount, perCount, currentPage }) => {
  return (
    <>
      <div className="mb-10 space-y-6">
        {posts.map((post) => (
          <PostRow
            post={post}
            key={post.id}
          />
        ))}
      </div>

      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        per={perCount}
        basePath="/posts/page"
      />
    </>
  )
}

export default Posts
