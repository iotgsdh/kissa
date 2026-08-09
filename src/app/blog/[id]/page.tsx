import { NextButton, PrevButton } from "@/components/buttons";
import { ROUTES } from "@/constants/routes";
import { getBlog } from "@/libs/blog";
import { Blog } from "@/types/blog";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getBlog();
  const blog = data.find((item: Blog) => item.id === id);

  return {
    title: blog.title,
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getBlog();
  const blog = data;
  const reverse = blog.reverse();
  const item = reverse.find((item: Blog) => item.id === id);
  const itemIndex = reverse.indexOf(item);
  const prev = reverse[itemIndex - 1]?.id;
  const next = reverse[itemIndex + 1]?.id;

  return (
    <main className="flex grow flex-col">
      <section className="flex grow flex-col">
        <div className="mx-auto flex w-full grow flex-col px-4 py-16 lg:max-w-5xl">
          {item ? (
            <div className="flex grow flex-col">
              <h1 className="mb-10 text-lg font-bold lg:text-xl">
                {item.title}
              </h1>
              {/* content */}
              <div
                dangerouslySetInnerHTML={{ __html: item.content }}
                className="content mb-16 grid gap-y-4"
              />
              <div className="grid grow items-end gap-y-4 lg:grid-cols-2 lg:gap-x-8">
                <PrevButton
                  label="Prev"
                  href={`${ROUTES[3].path}/${prev}`}
                  bg="light"
                  disabled={itemIndex === 0 ? true : false}
                />
                <NextButton
                  label="Next"
                  href={`${ROUTES[3].path}/${next}`}
                  bg="light"
                  disabled={itemIndex + 1 === reverse.length ? true : false}
                />
              </div>
            </div>
          ) : (
            <p>現在、公開中の記事はありません。</p>
          )}
        </div>
      </section>
    </main>
  );
}
