import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping",
};

export default function Shopping() {
  return (
    <main className="grow">
      <div className="mx-auto px-4 py-16 lg:max-w-7xl">
        <h1 className="mb-8">
          <span className="font-noto-serif mb-2 block text-2xl md:me-4 md:inline">
            Shopping
          </span>
          <span className="text-xs">ショッピング</span>
        </h1>
        <p className="mb-16 text-xs lg:text-sm">テキスト</p>
      </div>
    </main>
  );
}
