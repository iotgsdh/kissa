import Blog from "@/components/blog";
import Hero from "@/components/hero";
import News from "@/components/news";
import Story from "@/components/story";
import { getSite } from "@/constants/site";
import { getBlog } from "@/libs/blog";
import { getNews } from "@/libs/news";
import { getStories } from "@/libs/story";

export default async function Home() {
  const site = await getSite();
  const data1 = await getStories();
  const stories = data1;
  const data2 = await getNews();
  const news = data2;
  const data3 = await getBlog();
  const blog = data3;

  return (
    <main className="bg-surface grow">
      <p className="bg-background px-4 py-5 text-center text-xs tracking-(--letter-spacing) whitespace-pre-wrap lg:text-sm">
        {site.top}
      </p>
      <Hero stories={stories} />
      <News news={news} />
      <Story stories={stories} />
      <Blog blog={blog} />
    </main>
  );
}
