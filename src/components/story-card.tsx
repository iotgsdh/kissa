"use client";

import { ROUTES } from "@/constants/routes";
import { Story } from "@/types/story";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function StoryCard({
  index,
  story,
}: {
  index: number;
  story: Story;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [string, setString] = useState<string | undefined>("");
  const imageLinkRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef(null);
  const pathname = usePathname();
  const isTop = pathname === ROUTES[0].path;
  const HtmlTag = isTop ? "h3" : "h2";
  const ref = isTop ? imageLinkRef : titleRef;
  const loading = isTop ? "lazy" : "eager";

  // DOMParser
  useEffect(() => {
    const parse = () => {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(story.content, "text/html");
      const p = parsed.querySelector("p");
      const string = p?.textContent;
      const slicedString = string?.slice(0, 80);

      setString(slicedString);
    };

    parse();
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <article key={story.id} className="relative">
      <div className="mb-2">
        <span className="me-4 text-2xl font-bold italic">#{index + 1}</span>
        <span className="text-accent before:bg-accent relative ps-2 text-2xl font-bold before:absolute before:top-1/2 before:left-0 before:inline-block before:h-[1em] before:w-1 before:-translate-y-1/2">
          {story.category[0]}
        </span>
      </div>
      <div className={`${!isTop && "mb-4"} relative overflow-hidden`}>
        <Link
          href={`${ROUTES[1].path}/${index + 1}`}
          ref={imageLinkRef}
          className={`after:bg-surface relative right-0 bottom-0 left-0 block overflow-hidden after:absolute after:top-0 after:transition-[translate] after:duration-(--duration) ${isVisible && "after:-translate-x-full"} ${!isTop && "after:invisible"}`}
        >
          <Image
            src={story.image1.url}
            alt={story.name1 + (story.name2 ? " " + story.name2 : "")}
            width={story.image1.width}
            height={story.image1.height}
            sizes="(max-width: 767px) calc(100vw - 16px * 2), (max-width: 1280px) calc(50vw - 16px * 2), 608px"
            loading={loading}
            preload={isTop ? false : true}
            className="aspect-4/3 object-cover lg:transition-[scale,filter] lg:duration-(--duration) lg:hover:scale-105 lg:hover:brightness-50"
          />
        </Link>
        <HtmlTag
          ref={titleRef}
          className={`mb-4 text-lg font-bold transition-[translate,opacity] duration-[calc(var(--duration)*4)] lg:text-xl 2xl:text-2xl ${!isTop && "absolute right-0 bottom-0 left-0 w-full px-4"}`}
        >
          <Link
            href={`${ROUTES[1].path}/${index + 1}`}
            className={`grid py-2 ${!isTop && "gap-y-2"}`}
          >
            {isTop ? (
              <>
                <span className="underline underline-offset-(--underline-offset)">
                  {story.catch1}
                </span>
                <span className="justify-self-end underline underline-offset-(--underline-offset)">
                  {story.catch2}
                </span>
              </>
            ) : (
              <>
                <span className="bg-surface justify-self-start px-2">
                  {story.catch1}
                </span>
                <span className="bg-surface justify-self-end ps-2">
                  {story.catch2}
                </span>
              </>
            )}
          </Link>
        </HtmlTag>
      </div>
      <p>
        {string}
        {string && string.length === 80 && "…"}
      </p>
    </article>
  );
}
