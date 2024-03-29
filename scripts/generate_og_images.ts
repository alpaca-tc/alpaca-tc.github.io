import fs from "fs";
import { join } from "path";
import { getAllPosts } from "../lib/posts";
import { PostMetadata } from "../types/PostMetadata";
import { generateOgImage } from "../lib/ogImage";
import { eachLimit } from "../lib/eachLimit";

const baseDir = "public/og-images";

const preflight = async (): Promise<void> => {
  if (fs.existsSync(baseDir)) {
    await fs.promises.rm(baseDir, { recursive: true });
  }

  await fs.promises.mkdir(baseDir);

  // warm up
  await generateOgImage("test", "2020-01-01");
};
(async () => {
  console.log("== Generate og-image");

  await preflight();

  const posts = await getAllPosts();

  eachLimit<PostMetadata>(posts, 1, async ({ id, title, date }) => {
    const fileName = `${id}.png`;
    const buf = await generateOgImage(title, date);
    const distPath = join(baseDir, fileName);

    console.log(`== Write ${distPath}`);

    await fs.promises.writeFile(distPath, buf, "ascii");
  }).then(() => {
    console.log("== Done");
    process.exit();
  });
})();

export { };
