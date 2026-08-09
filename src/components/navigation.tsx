"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function Navigation({
  setIsActive,
}: {
  setIsActive?: Dispatch<SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const comparePath = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="w-full lg:w-auto">
      <ul className="lg:flex">
        {ROUTES.slice(0, 5).map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              onClick={() => setIsActive?.(false)}
              className={`font-noto-serif border-border relative block border-b py-5 text-center lg:border-b-0 lg:px-4 ${comparePath(route.path) ? "text-accent" : "lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-px lg:after:w-full lg:after:scale-x-0 lg:after:bg-current lg:after:transition-[scale] lg:after:duration-(--duration) lg:hover:after:scale-x-100"}`}
            >
              {route.label}
            </Link>
          </li>
        ))}
        <li className="grid grid-cols-2 lg:flex">
          <Link
            href={ROUTES[5].path}
            onClick={() => setIsActive?.(false)}
            className={`font-noto-serif relative block py-5 text-center lg:px-4 ${comparePath(ROUTES[5].path) ? "text-accent" : "lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-px lg:after:w-full lg:after:scale-x-0 lg:after:bg-current lg:after:transition-[scale] lg:after:duration-(--duration) lg:hover:after:scale-x-100"}`}
          >
            {ROUTES[5].label}
          </Link>
          <Link
            href={ROUTES[6].path}
            onClick={() => setIsActive?.(false)}
            className={`font-noto-serif relative block py-5 text-center lg:px-4 ${comparePath(ROUTES[6].path) ? "text-accent" : "lg:after:absolute lg:after:bottom-0 lg:after:left-0 lg:after:h-px lg:after:w-full lg:after:scale-x-0 lg:after:bg-current lg:after:transition-[scale] lg:after:duration-(--duration) lg:hover:after:scale-x-100"}`}
          >
            {ROUTES[6].label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
