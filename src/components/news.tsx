import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { ReadMoreButton } from "./buttons";
import type { News } from "@/types/news";

export default function News({ news }: { news: News[] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h2 className="mb-4">
          <span className="font-noto-serif me-4 text-2xl">News</span>
          <span className="text-xs">ニュース</span>
        </h2>
        {news.length > 0 ? (
          <div className="mb-16">
            {news.slice(0, 3).map((item) => (
              <h3 key={item.id}>
                <Link
                  href={`${ROUTES[4].path}/${item.id}`}
                  className="block truncate border-b border-dotted py-4"
                >
                  {item.title}
                </Link>
              </h3>
            ))}
          </div>
        ) : (
          <p>
            現在、お知らせはありません。
            <br />
            最新情報は随時掲載いたします。
          </p>
        )}
        {news.length > 0 && (
          <div>
            <ReadMoreButton href={ROUTES[4].path} bg={"light"} />
          </div>
        )}
      </div>
    </section>
  );
}
