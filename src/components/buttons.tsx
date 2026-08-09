"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArrowUp } from "./icons";

export function HamburgerButton({
  isActive,
  setIsActive,
}: {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      aria-label={isActive ? "メニューを閉じる" : "メニューを開く"}
      onClick={() => setIsActive((prev) => !prev)}
      className="absolute top-0 right-0 z-10 flex h-full items-center justify-center px-4 lg:hidden"
    >
      <div className="relative h-4.75 w-8">
        <span className="bg-foreground absolute top-0 right-0 block h-px w-full"></span>
        <span className="bg-foreground absolute top-1/2 right-0 block h-px w-[75%] -translate-y-1/2"></span>
        <span className="bg-foreground absolute right-0 bottom-0 block h-px w-[50%]"></span>
      </div>
    </button>
  );
}

export function ReadMoreButton({ href, bg }: { href: string; bg?: string }) {
  return (
    <Link
      href={href}
      className={`font-noto-serif flex items-center justify-center gap-x-4 rounded-full px-8 py-4 after:block after:h-1 after:w-8 after:skew-x-45 after:border-e after:border-b lg:after:transition-[translate] lg:after:duration-(--duration) lg:hover:after:translate-x-4 ${bg === "light" ? "bg-surface" : "bg-background"}`}
    >
      Read more
    </Link>
  );
}

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      aria-label="ページの先頭へ戻る"
      onClick={handleClick}
      className={`bg-secondary fixed right-4 bottom-4 rounded-sm transition-[visibility,opacity] duration-(--duration) ${!isVisible && "invisible opacity-0"}`}
    >
      <ArrowUp />
    </button>
  );
}

export function NextButton({
  label,
  href,
  bg,
  disabled,
}: {
  label?: string;
  href: string;
  bg?: string;
  disabled: boolean;
}) {
  const className = `font-noto-serif h-fit flex items-center justify-center gap-x-4 rounded-full px-8 py-4 after:block after:h-1 after:w-8 after:skew-x-45 after:border-e after:border-b ${bg === "light" ? "bg-surface" : "bg-background"}`;

  return disabled ? (
    <span className={`${className} opacity-80`}>{label}</span>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function PrevButton({
  label,
  href,
  bg,
  disabled,
}: {
  label: string;
  href: string;
  bg?: string;
  disabled: boolean;
}) {
  const className = `font-noto-serif flex h-fit items-center justify-center gap-x-4 rounded-full px-8 py-4 before:block before:h-1 before:w-8 before:-skew-x-45 before:border-s before:border-b ${bg === "light" ? "bg-surface" : "bg-background"}`;

  return disabled ? (
    <span className={`${className} opacity-80`}>{label}</span>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
