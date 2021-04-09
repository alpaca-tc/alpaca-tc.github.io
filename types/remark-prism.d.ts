declare module 'remark-prism' {
  import { Plugin } from 'unified'

  type RemarkPrismOptions = {
    transformInlineCode?: boolean
  }

  /* eslint @typescript-eslint/no-empty-interface: "off" */
  interface Parse extends Plugin<[RemarkPrismOptions?]> {}
}
