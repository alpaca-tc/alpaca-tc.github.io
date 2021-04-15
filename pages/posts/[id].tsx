import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Head from 'next/head'
import { getAllPosts, getPost, sortPosts } from '../../lib/posts'
import { Post, PostMetadata } from '../../types/PostMetadata'
import Layout from '../../components/Layout'
import PostHero from '../../components/PostHero'
import PrevNextPostNav from '../../components/PrevNextPostNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/router'

interface Params extends ParsedUrlQuery {
  id: string
}

type PostProps = {
  post: Post,
  prevPost?: PostMetadata,
  nextPost?: PostMetadata,
}

const currentUrl = (): string => {
  const router = useRouter()
  return `${process.env.origin}${router.asPath}`
}

const buildUrlForTwitter = (post: Post): string => {
  const url = new URL("https://twitter.com/share")
  url.searchParams.append('url', currentUrl())
  url.searchParams.append('text', `${post.title} | `)

  return url.href
}

const buildUrlForFacebook = (): string => {
  const url = new URL("https://www.facebook.com/share.php")
  url.searchParams.append('u', currentUrl())

  return url.href
}

const PostPage: FunctionComponent<PostProps> = (props) => {
  const { post, prevPost, nextPost } = props
  const urlForTwitter = buildUrlForTwitter(post)
  const urlForFacebook = buildUrlForFacebook()

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

          <div className="flex justify-end mt-4 h-10 bg">
            <a href={urlForTwitter} data-url="" data-via="" data-width="120" data-counturl="" rel="nofollow noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faTwitter} className="h-7 text-gray-400 hover:text-black transition duration-300 cursor-pointer" />
            </a>

            <a href={urlForFacebook} className="ml-4" data-url="" data-via="" data-width="120" data-counturl="" rel="nofollow noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faFacebook} className="h-7 text-gray-400 hover:text-black transition duration-300 cursor-pointer" />
            </a>
          </div>
        </article>

        <aside className="max-w-3xl md:mt-6 mx-auto bg-white">
          <PrevNextPostNav prevPost={prevPost} nextPost={nextPost} />
        </aside>
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
  const allPosts = sortPosts(await getAllPosts())
  const postIndex = allPosts.map(({ id }) => id).indexOf(post.id)
  const prevPost = allPosts[postIndex - 1] || null
  const nextPost = allPosts[postIndex + 1] || null

  return {
    props: {
      post,
      prevPost,
      nextPost
    },
  }
}

export default PostPage
