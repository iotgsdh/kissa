import { NextButton, PrevButton } from "@/components/buttons";
import { ROUTES } from "@/constants/routes";
import { getShopping } from "@/libs/shopping";
import { Shopping } from "@/types/shopping";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getShopping();
  const shopping = data.find((item: Shopping) => item.id === id);

  return {
    title: shopping.productName,
  };
}

export default async function ShoppingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getShopping();
  const shopping = data;
  const reverse = shopping.reverse();
  const item = reverse.find((item: Shopping) => item.id === id);
  const itemIndex = reverse.indexOf(item);
  const prev = reverse[itemIndex - 1]?.id;
  const next = reverse[itemIndex + 1]?.id;

  return (
    <main className="flex grow flex-col">
      <section className="flex grow flex-col">
        <div className="mx-auto flex w-full grow flex-col px-4 py-16 lg:max-w-5xl">
          {item ? (
            <div className="flex grow flex-col">
              <div className="mb-16">
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 1280px) calc(100vw - 16px * 2), 992px"
                  loading="eager"
                  preload={true}
                  className="mb-4 aspect-square object-cover"
                />
                <h1 className="font-noto-serif mb-2 text-base font-bold">
                  {item.productName}
                </h1>
                <span className="mb-8 block text-end">
                  ¥{item.price.toLocaleString()}
                </span>
                <p>{item.description}</p>
              </div>
              {/* purchase link */}
              <div className="mb-16">
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface bg-accent block rounded-full px-8 py-4 text-center text-base font-bold"
                >
                  購入
                </Link>
              </div>
              {/* navigation buttons */}
              <div className="grid grow items-end gap-y-4 lg:grid-cols-2 lg:gap-x-8">
                <PrevButton
                  label="Prev"
                  href={`${ROUTES[2].path}/${prev}`}
                  bg="light"
                  disabled={itemIndex === 0 ? true : false}
                />
                <NextButton
                  label="Next"
                  href={`${ROUTES[2].path}/${next}`}
                  bg="light"
                  disabled={itemIndex + 1 === reverse.length ? true : false}
                />
              </div>
            </div>
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
      </section>
    </main>
  );
}
