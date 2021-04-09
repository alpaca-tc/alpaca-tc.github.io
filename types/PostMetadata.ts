export type PostMetadata = {
  id: string
  title: string
  date: string
  // coverUrl: string
  // tags: string[]
  // description: string
  // theme: string
  // series: string
}

export type Post = {
  content: string
} & PostMetadata
