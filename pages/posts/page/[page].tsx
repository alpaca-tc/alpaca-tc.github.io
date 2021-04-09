import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Layout from '../../../components/Layout'
import Posts from '../../../components/Posts'
import {
  getAllPosts,
  sortPosts,
  paginatePosts,
} from '../../../lib/posts'
import { PostMetadata } from '../../../types/PostMetadata'

interface IndexProps {
  page: number
  totalPostsCount: number
  posts: PostMetadata[]
}

interface Params extends ParsedUrlQuery {
  page: string
}

const perCount = 10

export const getStaticProps: GetStaticProps<IndexProps, Params> = async (
  { params }
) => {
  const page = parseInt((params || {}).page || '', 10) || 1
  const allPosts = sortPosts(await getAllPosts(), 'desc')
  const posts = paginatePosts(allPosts, perCount, page)

  return {
    props: {
      totalPostsCount: allPosts.length,
      posts,
      page,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const totalPostsCount = allPosts.length
  const totalPages = totalPostsCount / perCount
  const paths = []

  for (let page = 0; page <= totalPages; page++) {
    paths.push({ params: { page: (page + 1).toString() } })
  }

  return {
    fallback: true,
    paths: paths,
  }
}

const Index: FunctionComponent<IndexProps> = (props) => {
  const { totalPostsCount, posts, page } = props

  return (
    <Layout title={`Posts - ${page}`}>
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
