import { NextButton, PrevButton } from "@/components/buttons";
import { ROUTES } from "@/constants/routes";
import { getSns } from "@/constants/sns";
import { getStories } from "@/libs/story";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getStories();
  const story = data[id - 1];

  return {
    title: `${story.name1 + (story.name2 ? " " + story.name2 : "")}`,
  };
}

export default async function StoryDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const data = await getStories();
  const story = data[id - 1];
  const pageId = Number(id);
  const sns = await getSns();

  return (
    <main className="grow">
      <section>
        <div className="py-16">
          {story ? (
            <div>
              <h1 className="font-noto-serif mx-auto mb-10 px-4 text-center text-2xl lg:max-w-7xl">
                <span className="block">{story.name1}</span>
                {story.name2 && (
                  <span className="block text-base">{story.name2}</span>
                )}
              </h1>
              <div className="relative mb-16">
                <Image
                  src={story.image1.url}
                  alt={story.image1.alt}
                  width={story.image1.width}
                  height={story.image1.height}
                  sizes="100vw"
                  preload={true}
                  loading="eager"
                  className="mb-4 aspect-4/3 w-full object-cover md:aspect-auto md:h-120 2xl:h-192"
                />
                <div className="md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0 md:mx-auto md:flex md:max-w-xl md:items-start md:justify-end md:p-4 lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl">
                  <p className="story-detail-catch grid gap-y-1 px-4 text-lg font-bold underline underline-offset-(--underline-offset) md:mx-0 md:flex md:flex-col md:gap-y-4 md:px-0 md:text-3xl md:no-underline lg:max-w-7xl 2xl:text-4xl">
                    <span className="md:bg-surface md:h-fit md:px-4 md:py-1">
                      {story.catch1}
                    </span>
                    <span className="md:bg-surface justify-self-end md:h-fit md:py-1 md:ps-4">
                      {story.catch2}
                    </span>
                  </p>
                </div>
              </div>
              {/* content */}
              <div
                dangerouslySetInnerHTML={{ __html: story.content }}
                className="content mx-auto mb-16 grid gap-y-4 px-4 lg:max-w-5xl"
              />
              {/* info */}
              <div className="mb-16 px-4">
                <div className="bg-surface mx-auto rounded-md p-4 shadow-md lg:max-w-5xl">
                  {story.image2 && (
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={story.image2.url}
                        alt={story.image2.alt}
                        width={story.image2.width}
                        height={story.image2.height}
                        sizes="(max-width: 1280px) calc(100vw - 16px * 2 * 2), 992px"
                        loading="lazy"
                        className="aspect-4/3 w-full object-cover md:aspect-auto md:h-90"
                      />
                    </div>
                  )}
                  <div className="border-border border-b py-4 text-center">
                    <span className="block text-base md:text-xl">
                      {story.name1}
                    </span>
                    {story.name2 && (
                      <span className="text-xs md:text-base">
                        {story.name2}
                      </span>
                    )}
                  </div>
                  <dl>
                    {story.tel && (
                      <div className="border-border border-b py-4 md:grid md:grid-cols-[160px_auto] lg:grid-cols-[240px_auto]">
                        <dt className="font-bold">お問い合わせ</dt>
                        <dd>
                          <Link href={`tel:${story.tel.replaceAll("-", "")}`}>
                            {story.tel}
                          </Link>
                        </dd>
                      </div>
                    )}
                    {story.open && (
                      <div className="border-border border-b py-4 md:grid md:grid-cols-[160px_auto] lg:grid-cols-[240px_auto]">
                        <dt className="font-bold">営業時間</dt>
                        <dd className="whitespace-pre-wrap">{story.open}</dd>
                      </div>
                    )}
                    {story.address && (
                      <div className="border-border border-b py-4 md:grid md:grid-cols-[160px_auto] lg:grid-cols-[240px_auto]">
                        <dt className="font-bold">住所</dt>
                        <dd>
                          {story.address}
                          {story.map && (
                            <Link
                              href={story.map}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tracking-normal"
                            >
                              ［ Googleマップ ］
                            </Link>
                          )}
                        </dd>
                      </div>
                    )}
                    {story.link && (
                      <div className="border-border border-b py-4 md:grid md:grid-cols-[160px_auto] lg:grid-cols-[240px_auto]">
                        <dt className="font-bold">関連リンク</dt>
                        <dd>
                          <Link
                            href={story.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="wrap-anywhere underline underline-offset-(--underline-offset)"
                          >
                            {story.link}
                          </Link>
                        </dd>
                      </div>
                    )}
                  </dl>
                  {(story.x || story.instagram || story.facebook) && (
                    <div className="pbs-4 flex justify-center md:justify-end">
                      {story.twitter && (
                        <Link
                          href={story.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4"
                        >
                          <Image
                            src={sns[0].path}
                            alt={sns[0].name}
                            width={16}
                            height={16}
                            className="aspect-square"
                          />
                        </Link>
                      )}
                      {story.instagram && (
                        <Link
                          href={story.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4"
                        >
                          <Image
                            src={sns[1].path}
                            alt={sns[1].name}
                            width={16}
                            height={16}
                            className="aspect-square"
                          />
                        </Link>
                      )}
                      {story.facebook && (
                        <Link
                          href={story.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4"
                        >
                          <Image
                            src={sns[2].path}
                            alt={sns[2].name}
                            width={16}
                            height={16}
                            className="aspect-square"
                          />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mx-auto grid gap-y-4 px-4 lg:max-w-5xl lg:grid-cols-2 lg:gap-x-8 xl:px-0">
                <PrevButton
                  label="Prev"
                  href={`${ROUTES[1].path}/${pageId - 1}`}
                  bg="light"
                  disabled={pageId === 1 ? true : false}
                />
                <NextButton
                  label="Next"
                  href={`${ROUTES[1].path}/${pageId + 1}`}
                  bg="light"
                  disabled={pageId === data.length ? true : false}
                />
              </div>
            </div>
          ) : (
            <p>現在、掲載中のストーリーはありません。</p>
          )}
        </div>
      </section>
    </main>
  );
}
