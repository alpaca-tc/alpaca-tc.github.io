import { unified } from 'unified'
import remarkParse from "remark-parse"
import remarkRehype from 'remark-rehype'
import highlight from "remark-prism"
import stringify from "rehype-stringify"

export const parseMarkdown = async (content: string): Promise<string> => {
  return (await unified()
    .use(remarkParse)
    .use(highlight)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(stringify, { allowDangerousHtml: true })
    .process(content))
    .toString()
}
