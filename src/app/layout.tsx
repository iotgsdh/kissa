import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BackToTopButton } from "@/components/buttons";
import { getSite } from "@/constants/site";
import { getSns } from "@/constants/sns";
import LoadingScreen from "@/components/loading-screen";
import { LoadingProvider } from "@/contexts/loading-context";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();

  return {
    title: {
      default: site.title,
      template: `%s | ${site.title}`,
    },
    description: site.description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();
  const sns = await getSns();

  return (
    <html
      lang="ja"
      className={`${notoSerif.variable} scrollbar-none antialiased`}
    >
      <body className="flex min-h-dvh flex-col text-sm lg:text-base">
        <LoadingProvider>
          <Header site={site} sns={sns} />
          {children}
          <Footer />
          <BackToTopButton />
          <LoadingScreen />
        </LoadingProvider>
      </body>
    </html>
  );
}
