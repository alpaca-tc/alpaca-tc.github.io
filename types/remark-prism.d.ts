declare module 'remark-prism' {
  import { Plugin, Processor } from 'unified'

  export type RemarkPrismOptions = {
    transformInlineCode?: boolean
  }

  const remarkPrism: Plugin<[RemarkPrismOptions?] | [Processor?, RemarkPrismOptions?]>

  export default remarkPrism
}
