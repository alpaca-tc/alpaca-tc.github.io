import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import { getAllPosts, getPost } from '../../lib/posts'
import { Post } from '../../types/PostMetadata'
import Layout from '../../components/Layout'
import PostHero from '../../components/PostHero'

interface Params extends ParsedUrlQuery {
  id: string
}

type PostProps = {
  post: Post
}

const PostPage: FunctionComponent<PostProps> = (props) => {
  const { post } = props

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout title={post.title}>
        <article className="max-w-3xl md:mt-6 rounded-xl mx-auto bg-white dark:bg-cool-gray-800">
          <PostHero post={post} />
          <div
            className="prose max-w-3xl mx-auto dark:text-cool-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  const ids = posts.map(({ id }) => ({ params: { id } }))

  return {
    fallback: false,
    paths: ids,
  }
}

export const getStaticProps: GetStaticProps<PostProps, Params> = async (
  context,
) => {
  const params = context.params as Params
  const post = await getPost(params.id) as Post

  return {
    props: { post },
  }
}

export default PostPage
