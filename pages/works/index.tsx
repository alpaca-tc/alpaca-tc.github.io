import path from 'path'
import fs from 'fs'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '../../components/Layout'
import { parseMarkdown } from '../../lib/parseMarkdown'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Works: React.FC<Props> = (props) => {
  return (
    <Layout title="works">
      <article className="max-w-3xl md:mt-6 rounded-xl bg-white dark:bg-cool-gray-800">
        <div
          className="prose max-w-3xl mx-auto dark:text-cool-gray-100"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </article>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const markdownPath = path.join(process.cwd(), './content/works/works.md')
  const rawMarkdown = fs.readFileSync(markdownPath, 'utf8')
  const content = await parseMarkdown(rawMarkdown)

  return {
    props: { content },
  }
}

export default Works
