import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { getAllPosts, getPost, sortPosts } from '../../lib/posts'
import { Post, PostMetadata } from '../../types/PostMetadata'
import Layout from '../../components/Layout'
import PostHero from '../../components/PostHero'
import PrevNextPostNav from '../../components/PrevNextPostNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useCurrentUrl } from '../../hooks/useCurrentUrl'

interface Params extends ParsedUrlQuery {
  id: string
}

type PostProps = {
  post: Post,
  prevPost?: PostMetadata,
  nextPost?: PostMetadata,
}

const buildUrlForTwitter = (currentUrl: string, post: Post): string => {
  const url = new URL("https://twitter.com/share")
  url.searchParams.append('url', currentUrl)
  url.searchParams.append('text', `${post.title} | `)

  return url.href
}

const buildUrlForFacebook = (currentUrl: string): string => {
  const url = new URL("https://www.facebook.com/share.php")
  url.searchParams.append('u', currentUrl)

  return url.href
}

const buildPath = (id: string): string => {
  return `og-images/${id}.png`
}

const PostPage: React.FC<PostProps> = (props) => {
  const { post, prevPost, nextPost } = props
  const currentUrl = useCurrentUrl()
  const urlForTwitter = buildUrlForTwitter(currentUrl, post)
  const urlForFacebook = buildUrlForFacebook(currentUrl)
  const description = post.rawContent.replace(/[#\n]/g, '').slice(0, 160)
  const ogImage = `https://alpaca.tc/${buildPath(post.id)}`

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout title={post.title} ogImage={ogImage} description={description}>
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
