import Image from "next/image";
import Navigation from "./navigation";
import Sns from "./sns";
import { getSite } from "@/constants/site";
import { getSns } from "@/constants/sns";

export default async function Footer() {
  const site = await getSite();
  const sns = await getSns();

  return (
    <footer className="bg-surface">
      <div className="mx-auto flex flex-col items-center px-4 py-16 lg:max-w-7xl lg:flex-row lg:justify-between lg:pe-0">
        <div className="mb-12 lg:mb-0">
          <Image
            src={site.logo.url}
            alt={site.title}
            width={site.logo.width}
            height={site.logo.height}
            loading="eager"
            className="w-32"
          />
        </div>
        <div className="w-full lg:w-auto">
          <Navigation />
          {sns.length > 0 && <Sns sns={sns} />}
        </div>
      </div>
      <div className="flex justify-center p-4 tracking-widest">
        <small>&copy; 2026 {site.title}</small>
      </div>
    </footer>
  );
}
