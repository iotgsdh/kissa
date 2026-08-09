import { client } from "@/libs/microcms";
import { Blog } from "@/types/blog";
import { News } from "@/types/news";
import { Story } from "@/types/story";
import type { MetadataRoute } from "next";

const SITE_URL = "https://kissa.tw08iwckpyvz48pfu0sx-262.workers.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, blogs, stories] = await Promise.all([
    client.get({ endpoint: "news" }),
    client.get({ endpoint: "blog" }),
    client.get({ endpoint: "story" }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/story`, lastModified: new Date() },
    { url: `${SITE_URL}/shopping`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
    { url: `${SITE_URL}/news`, lastModified: new Date() },
    { url: `${SITE_URL}/about`, lastModified: new Date() },
    { url: `${SITE_URL}/contact`, lastModified: new Date() },
  ];

  const newsPages = news.contents.map((item: News) => ({
    url: `${SITE_URL}/news/${item.id}`,
    lastModified: new Date(item.updatedAt),
  }));

  const blogPages = blogs.contents.map((item: Blog) => ({
    url: `${SITE_URL}/blog/${item.id}`,
    lastModified: new Date(item.updatedAt),
  }));

  const storyPages = stories.contents.map((item: Story) => ({
    url: `${SITE_URL}/story/${item.id}`,
    lastModified: new Date(item.updatedAt),
  }));

  return [...staticPages, ...newsPages, ...blogPages, ...storyPages];
}
