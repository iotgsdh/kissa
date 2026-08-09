import { getSite } from "@/constants/site";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default async function About() {
  const site = await getSite();

  return (
    <main className="grow">
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            About
          </span>
          <span className="text-xs">{site.title}について</span>
        </h1>
        <p className="mb-16 whitespace-pre-wrap">{site.about}</p>
        <p className="text-xs">
          当サイトでは
          <Link
            href="https://unsplash.com/ja"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-(--underline-offset)"
          >
            Unsplash
          </Link>
          の画像を使用しております。
        </p>
      </div>
    </main>
  );
}
