import Pagination from "@/components/pagination";
import { ROUTES } from "@/constants/routes";
import { getSite } from "@/constants/site";
import { getBlog } from "@/libs/blog";
import type { Blog } from "@/types/blog";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const data = await getBlog();
  const blog = data;
  const totalPages = Math.ceil(blog.length / limit);
  const site = await getSite();

  return (
    <main className="grid grow">
      <div className="mx-auto flex w-full max-w-screen flex-col px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            Blog
          </span>
          <span className="text-xs">ブログ</span>
        </h1>
        <p className="mb-16 text-xs whitespace-pre-wrap lg:text-sm">
          {site.blog}
        </p>
        {blog.length > 0 ? (
          <section className="flex grow flex-col justify-between">
            <div className="mb-16">
              {blog.slice(offset, offset + limit).map((item: Blog) => (
                <h2 key={item.id}>
                  <Link
                    href={`${ROUTES[3].path}/${item.id}`}
                    className="block truncate border-b border-dotted py-4"
                  >
                    {item.title}
                  </Link>
                </h2>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </section>
        ) : (
          <p>現在、公開中の記事はありません。</p>
        )}
      </div>
    </main>
  );
}
