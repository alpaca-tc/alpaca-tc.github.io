export type PostMetadata = {
  id: string
  title: string
  date: string
}

export type Post = {
  content: string
  rawContent: string
} & PostMetadata
