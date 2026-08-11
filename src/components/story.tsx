"use client";

import { ROUTES } from "@/constants/routes";
import { ReadMoreButton } from "./buttons";
import StoryCard from "./story-card";
import type { Story } from "@/types/story";

export default function Story({ stories }: { stories: Story[] }) {
  return (
    <section>
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h2 className="mb-4">
          <span className="font-noto-serif me-4 text-2xl">Story</span>
          <span className="text-xs">ストーリー</span>
        </h2>
        {stories.length > 0 ? (
          <div>
            <div className="mb-16 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
              {stories.slice(0, 6).map((story, i) => (
                <StoryCard key={story.id} index={i} story={story} />
              ))}
            </div>
            <div>
              <ReadMoreButton href={ROUTES[1].path} />
            </div>
          </div>
        ) : (
          <p>現在、掲載中のストーリーはありません。</p>
        )}
      </div>
    </section>
  );
}
