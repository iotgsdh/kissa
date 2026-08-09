import Pagination from "@/components/pagination";
import { ROUTES } from "@/constants/routes";
import { getSite } from "@/constants/site";
import { getNews } from "@/libs/news";
import type { News } from "@/types/news";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "News",
};

export default async function News({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const data = await getNews();
  const news = data;
  const totalPages = Math.ceil(news.length / limit);
  const site = await getSite();

  return (
    <main className="grid grow">
      <div className="mx-auto flex w-full max-w-screen flex-col px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            News
          </span>
          <span className="text-xs">ニュース</span>
        </h1>
        <p className="mb-16 text-xs whitespace-pre-wrap lg:text-sm">
          {site.news}
        </p>
        {news.length > 0 ? (
          <section className="flex grow flex-col justify-between">
            <div className="mb-16">
              {news.slice(offset, offset + limit).map((item: News) => (
                <h2 key={item.id}>
                  <Link
                    href={`${ROUTES[4].path}/${item.id}`}
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
          <p>
            現在、お知らせはありません。
            <br />
            最新情報は随時掲載いたします。
          </p>
        )}
      </div>
    </main>
  );
}
