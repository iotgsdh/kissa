import Pagination from "@/components/pagination";
import StoryCard from "@/components/story-card";
import { getSite } from "@/constants/site";
import { getStories } from "@/libs/story";
import type { Story } from "@/types/story";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
};

export default async function Story({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = 6;
  const offset = (currentPage - 1) * limit;
  const data = await getStories();
  const stories = data;
  const totalPages = Math.ceil(stories.length / limit);
  const site = await getSite();

  return (
    <main className="grow">
      <div className="mx-auto px-4 py-16 md:max-w-max lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            Story
          </span>
          <span className="text-xs">ストーリー</span>
        </h1>
        <p className="mb-16 text-xs whitespace-pre-wrap lg:text-sm">
          {site.story}
        </p>
        {stories.length > 0 ? (
          <section>
            <div className="mb-16 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
              {stories
                .slice(offset, offset + limit)
                .map((story: Story, i: number) => (
                  <StoryCard key={story.id} index={offset + i} story={story} />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </section>
        ) : (
          <p>現在、掲載中のStoryはありません。</p>
        )}
      </div>
    </main>
  );
}
