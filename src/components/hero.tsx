"use client";

import { ROUTES } from "@/constants/routes";
import { useLoading } from "@/contexts/loading-context";
import { Story } from "@/types/story";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero({ stories }: { stories: Story[] }) {
  const [current, setCurrent] = useState(0);
  const { loadingFinished } = useLoading();

  useEffect(() => {
    if (!loadingFinished) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.slice(0, 4).length);
    }, 4000);

    return () => clearInterval(timer);
  }, [stories, loadingFinished]);

  return (
    <div className="h-120 2xl:h-192">
      <div className="relative grid h-full place-content-center">
        {stories.length > 0 ? (
          <div>
            {stories.slice(0, 4).map((story, i) => (
              <div
                key={story.id}
                className={`absolute top-0 right-0 bottom-0 left-0 transition-[visibility,opacity] duration-[calc(var(--duration)*4)] ${current === i ? "visible opacity-100" : "invisible opacity-0"}`}
              >
                <Link
                  href={`${ROUTES[1].path}/${i + 1}`}
                  className="block h-full"
                >
                  <div className="h-full">
                    <Image
                      src={story.image1.url}
                      alt={story.name1 + (story.name2 ? " " + story.name2 : "")}
                      width={story.image1.width}
                      height={story.image1.height}
                      sizes="100vw"
                      preload={true}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 right-0 bottom-0 left-0 mx-auto flex max-w-xl justify-end p-4 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl">
                    <div
                      className={`opacity-0 ${loadingFinished ? "animate-fade-in-down" : "animate-fade-in-down-delay"}`}
                    >
                      <div className="bg-surface mb-4 px-5 py-4">
                        <span className="font-noto-serif after:bg-foreground pbe-2 relative mb-2 block after:absolute after:bottom-0 after:left-1/2 after:block after:h-px after:w-4 after:-translate-x-1/2 2xl:text-2xl">
                          Story
                        </span>
                        <span className="text-4xl font-bold italic 2xl:text-6xl">
                          #{i + 1}
                        </span>
                      </div>
                      <p className="vertical-rl flex w-full flex-col justify-between text-2xl font-bold 2xl:text-4xl">
                        <span className="bg-surface block h-fit px-4 py-1 lg:not-landscape:py-1.5">
                          {story.catch1}
                        </span>
                        <span className="bg-surface block h-fit py-1 pt-4 lg:not-landscape:py-1.5">
                          {story.catch2}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Coming Soon</p>
        )}
        <div className="absolute top-[75%] left-[5%] flex h-40 w-2 justify-center 2xl:top-[85%]">
          <span className="bg-secondary block h-full w-px"></span>
          <span className="bg-secondary animate-fade-slide-down absolute top-0 right-0 bottom-0 left-0 block size-2 rounded-full"></span>
        </div>
      </div>
    </div>
  );
}
