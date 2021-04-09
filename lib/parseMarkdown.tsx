import unified from 'unified'
import markdown from "remark-parse"
import remark2rehype from 'remark-rehype'
import highlight from "remark-prism"
import stringify from "rehype-stringify"

export const parseMarkdown = async (content: string): Promise<string> => {
  return (await unified()
    .use(markdown)
    .use(highlight as typeof remark2rehype) // FIXME: 指定なしで動くように types/remark-prism.d.ts を修正する
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(stringify, { allowDangerousHtml: true })
    .process(content))
    .toString()
}
