import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Layout from '../components/Layout'
import { getAllPosts, sortPosts, paginatePosts } from '../lib/posts'
import { PostMetadata } from '../types/PostMetadata'
import Posts from "../components/Posts"

interface IndexProps {
  totalPostsCount: number
  posts: PostMetadata[]
}

const perCount = 10
const page = 1

export const getStaticProps: GetStaticProps<IndexProps, ParsedUrlQuery> = async () => {
  const allPosts = sortPosts(await getAllPosts(), 'desc')
  const posts = paginatePosts(allPosts, perCount, 1)

  return {
    props: {
      totalPostsCount: allPosts.length,
      posts,
    },
  }
}

const Index: FunctionComponent<IndexProps> = (props) => {
  const { totalPostsCount, posts } = props

  return (
    <Layout title="alpaca-tc">
      <div className="mt-12 space-y-6">
        <Posts
          posts={posts}
          totalCount={totalPostsCount}
          perCount={perCount}
          currentPage={page}
        />
      </div>
    </Layout>
  )
}

export default Index
