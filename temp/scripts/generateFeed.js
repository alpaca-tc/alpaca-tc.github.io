import fs from "fs";
import { Feed } from "feed";
import { getAllPosts, sortPosts } from "../lib/posts";
const BASE_URL = "https://alpaca.tc/";
const fetchEntries = async () => {
    const posts = sortPosts(await getAllPosts(), 'desc');
    const entries = posts.map((post) => ({
        id: post.id,
        title: post.title,
        date: new Date(post.date),
        updated: new Date(post.date),
        content: "",
        link: `${BASE_URL}posts/${post.id}`,
    }));
    return entries;
};
const buildFeed = async () => {
    const entries = await fetchEntries();
    const responseFeed = new Feed({
        id: "https://alpaca.tc/",
        title: "alpaca-tc",
        description: "",
        link: "https://alpaca.tc/",
        // updated: entries[0]!.updated,
        copyright: "alpaca-tc",
    });
    entries.forEach((entry) => {
        responseFeed.addItem(entry);
    });
    return responseFeed;
};
(async () => {
    const feed = await buildFeed();
    await fs.promises.writeFile("public/feed.xml", feed.atom1(), 'utf8');
    await fs.promises.writeFile("public/rss.xml", feed.rss2(), 'utf8');
})();
