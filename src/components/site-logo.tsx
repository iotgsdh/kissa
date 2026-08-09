"use client";

import { ROUTES } from "@/constants/routes";
import { Site } from "@/types/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteLogo({ site }: { site: Site }) {
  const pathname = usePathname();
  const HtmlTag = pathname === "/" ? "h1" : "div";

  return (
    <HtmlTag>
      <Link href={ROUTES[0].path}>
        <Image
          src={site.logo.url}
          alt={site.title}
          width={site.logo.width}
          height={site.logo.height}
          loading="eager"
          className="w-32"
        />
      </Link>
    </HtmlTag>
  );
}
