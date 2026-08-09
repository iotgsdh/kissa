"use client";

import Image from "next/image";
import { HamburgerButton } from "./buttons";
import Navigation from "./navigation";
import SiteLogo from "./site-logo";
import Sns from "./sns";
import { useEffect, useState } from "react";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Site } from "@/types/site";
import type { Sns as SnsItem } from "@/types/sns";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLoading } from "@/contexts/loading-context";

export default function Header({ site, sns }: { site: Site; sns: SnsItem[] }) {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(width < 1024px)");
  const { loadingFinished } = useLoading();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const initMounted = () => setMounted(true);
    initMounted();
  }, []);

  useScrollLock(isActive, isMobile, loadingFinished);

  if (!isMounted) {
    return null;
  }

  return (
    <header
      className={`bg-surface sticky top-0 right-0 bottom-0 left-0 z-[calc(infinity)] shadow-lg lg:transition-[visibility,translate,opacity] lg:duration-(--duration) ${isHidden && "lg:invisible lg:-translate-y-full lg:opacity-0"}`}
    >
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-center lg:min-h-20 lg:justify-between lg:py-4 lg:ps-4">
        <SiteLogo site={site} />
        <HamburgerButton isActive={isActive} setIsActive={setIsActive} />
        <div
          className={`bg-background absolute top-0 right-0 bottom-0 left-0 flex h-dvh flex-col items-center justify-center overflow-auto px-4 py-16 transition-[visibility,translate,opacity] duration-(--duration) landscape:justify-start lg:landscape:hidden ${!isActive && "invisible -translate-y-full opacity-0"}`}
        >
          <div className="mb-12">
            <Image
              src={site.logo.url}
              alt={site.title}
              width={site.logo.width}
              height={site.logo.height}
              loading="eager"
              className="w-32"
            />
          </div>
          <Navigation setIsActive={setIsActive} />
          {sns.length > 0 && <Sns sns={sns} setIsActive={setIsActive} />}
        </div>
        <div className="hidden lg:block">
          <Sns sns={sns} />
          <Navigation />
        </div>
      </div>
    </header>
  );
}
