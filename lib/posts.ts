import path from 'path'
import fs from 'fs'
import matter, { GrayMatterFile } from 'gray-matter'
import { PostMetadata, Post } from '../types/PostMetadata'
import { parseMarkdown } from './parseMarkdown'

const postsDirectory = path.join(process.cwd(), './content/posts')

interface PostHeader {
  layout: string
  title: string
  date: string
  comments: boolean
  categories: string
}

const readMarkdown = (id: string): GrayMatterFile<string> => {
  const basename = `${id}.md`
  const fullPath = path.join(postsDirectory, basename)
  const fileBody = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileBody)

  return matterResult
}

const parsePostMetaData = async (id: string): Promise<PostMetadata> => {
  const matterResult = readMarkdown(id)
  const header = matterResult.data as PostHeader

  return {
    id,
    title: header.title,
    date: header.date,
    // tags: (matterResult.data.tags as string).trim().split(","),
  } as PostMetadata
}

const parsePost = async (id: string): Promise<Post> => {
  const postMetadata = await parsePostMetaData(id)
  const matterResult = readMarkdown(id)
  const content = await parseMarkdown(matterResult.content)
  const post = Object.assign(postMetadata, { content }) as Post

  return post
}

export const getAllPosts = async (): Promise<PostMetadata[]> => {
  const fileNames = fs.readdirSync(postsDirectory)
  const promises = fileNames.map(async (fileName) => await parsePostMetaData(fileName.replace('.md', '')))
  const posts = await Promise.all(promises)

  return posts
}

export const getPost = async (
  id: string,
): Promise<Post> => {
  return (await parsePost(id))
}

export const sortPosts = (
  posts: PostMetadata[],
  direction: 'asc' | 'desc' = 'desc',
): PostMetadata[] => {
  return posts.sort((a, b) => {
    if (direction === 'desc') {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    } else {
      if (a.date < b.date) {
        return -1
      } else {
        return 1
      }
    }
  })
}

export const paginatePosts = (posts: PostMetadata[], per = 8, initPage = 1): PostMetadata[] => {
  const page = initPage > 1 ? initPage : 1
  const offset = (page - 1) * per
  const last = offset + per - 1

  return posts.slice(offset, last)
}
