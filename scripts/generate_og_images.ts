import fs from 'fs'
import { join } from 'path'
import { getAllPosts } from "../lib/posts"
import { generateOgImage } from "../lib/ogImage"

const baseDir = 'public/og-images'

const preflight = async (): Promise<void> => {
  if (fs.existsSync(baseDir)) {
    await fs.promises.rmdir(baseDir, { recursive: true })
  }

  await fs.promises.mkdir(baseDir)
}

;(async () => {
  console.log("== Generate og-image")

  await preflight();

  const posts = await getAllPosts()

  const promises = posts.map(async ({ id, title, date }) => {
    const fileName = `${id}.png`
    const buf = await generateOgImage(title, date)
    const distPath = join(baseDir, fileName)

    console.log(`== Write ${distPath}`)

    await fs.promises.writeFile(distPath, buf, 'ascii')
  })

  Promise.all(promises).then(() => {
    console.log("== Done")
    process.exit()
  })
})()

export {}
