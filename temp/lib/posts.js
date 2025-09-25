import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { parseMarkdown } from './parseMarkdown';
const postsDirectory = path.join(process.cwd(), './content/posts');
const readMarkdown = (id) => {
    const basename = `${id}.md`;
    const fullPath = path.join(postsDirectory, basename);
    const fileBody = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileBody);
    return matterResult;
};
const parsePostMetaData = async (id) => {
    const matterResult = readMarkdown(id);
    const header = matterResult.data;
    return {
        id,
        title: header.title,
        date: header.date,
        // tags: (matterResult.data.tags as string).trim().split(","),
    };
};
const parsePost = async (id) => {
    const postMetadata = await parsePostMetaData(id);
    const matterResult = readMarkdown(id);
    const rawContent = matterResult.content;
    const content = await parseMarkdown(rawContent);
    const post = Object.assign(postMetadata, { content, rawContent });
    return post;
};
export const getAllPosts = async () => {
    const fileNames = fs.readdirSync(postsDirectory);
    const promises = fileNames.map(async (fileName) => await parsePostMetaData(fileName.replace('.md', '')));
    const posts = await Promise.all(promises);
    return posts;
};
export const getPost = async (id) => {
    return (await parsePost(id));
};
export const sortPosts = (posts, direction = 'desc') => {
    return posts.sort((a, b) => {
        if (direction === 'desc') {
            if (a.date < b.date) {
                return 1;
            }
            else {
                return -1;
            }
        }
        else {
            if (a.date < b.date) {
                return -1;
            }
            else {
                return 1;
            }
        }
    });
};
export const paginatePosts = (posts, per = 8, initPage = 1) => {
    const page = initPage > 1 ? initPage : 1;
    const offset = (page - 1) * per;
    const last = offset + per - 1;
    return posts.slice(offset, last);
};
