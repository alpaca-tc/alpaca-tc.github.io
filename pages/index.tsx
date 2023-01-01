import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '../components/Layout'
import { getAllPosts, sortPosts, paginatePosts } from '../lib/posts'
import Posts from "../components/Posts"

type Props = InferGetStaticPropsType<typeof getStaticProps>

const perCount = 10
const page = 1

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = sortPosts(await getAllPosts(), 'desc')
  const posts = paginatePosts(allPosts, perCount, 1)

  return {
    props: {
      totalPostsCount: allPosts.length,
      posts,
    },
  }
}

const Index: React.FC<Props> = (props) => {
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
