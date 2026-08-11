import Pagination from "@/components/pagination";
import { ROUTES } from "@/constants/routes";
import { getSite } from "@/constants/site";
import { getShopping } from "@/libs/shopping";
import type { Shopping } from "@/types/shopping";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shopping",
};

export default async function Shopping({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage =
    typeof params.page === "string" ? parseInt(params.page) : 1;
  const limit = 12;
  const offset = (currentPage - 1) * limit;
  const data = await getShopping();
  const shopping = data;
  const totalPages = Math.ceil(shopping.length / limit);
  const site = await getSite();

  return (
    <main className="grid grow">
      <div className="mx-auto flex w-full max-w-screen flex-col px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            Shopping
          </span>
          <span className="text-xs">ショッピング</span>
        </h1>
        <p className="mb-16 text-xs whitespace-pre-wrap lg:text-sm">
          {site.shopping}
        </p>
        {shopping.length > 0 ? (
          <section className="flex grow flex-col justify-between">
            <div className="mb-16 grid gap-y-8 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3">
              {shopping.slice(offset, offset + limit).map((item: Shopping) => (
                <div key={item.id}>
                  <Link href={`${ROUTES[2].path}/${item.id}`}>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      sizes="(max-width: 767px) calc(100vw - 16px * 2), (max-width: 1023px) calc(50vw - 16px * 2), (max-width: 1280px) calc(33vw - 16px * 4), 405px"
                      loading="eager"
                      preload={true}
                      className="mb-4 aspect-square object-cover"
                    />
                    <h2 className="font-noto-serif mb-2 text-base font-bold">
                      {item.productName}
                    </h2>
                  </Link>
                  <span className="block text-end">
                    ¥{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </section>
        ) : (
          <div>
            <p>現在、掲載している商品はありません。</p>
            <p>
              コーヒーのある暮らしを楽しめるアイテムを、
              これから少しずつ紹介していきます。
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
