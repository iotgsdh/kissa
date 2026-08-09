import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { ReadMoreButton } from "./buttons";
import type { Blog } from "@/types/blog";

export default function Blog({ blog }: { blog: Blog[] }) {
  return (
    <section className="bg-background">
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h2 className="mb-4">
          <span className="font-noto-serif me-4 text-2xl">Blog</span>
          <span className="text-xs">ブログ</span>
        </h2>
        {blog.length > 0 ? (
          <div className="mb-16">
            {blog.slice(0, 3).map((item) => (
              <h3 key={item.id}>
                <Link
                  href={`${ROUTES[3].path}/${item.id}`}
                  className="block truncate border-b border-dotted py-4"
                >
                  {item.title}
                </Link>
              </h3>
            ))}
          </div>
        ) : (
          <p>現在、公開中の記事はありません。</p>
        )}
        {blog.length > 0 && (
          <div>
            <ReadMoreButton href={ROUTES[3].path} bg={"light"} />
          </div>
        )}
      </div>
    </section>
  );
}
