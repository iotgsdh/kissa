"use client";

import type { Sns } from "@/types/sns";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function Sns({
  sns,
  setIsActive,
}: {
  sns: Sns[];
  setIsActive?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex justify-center lg:items-center lg:justify-end">
      {sns.map((item, i) => (
        <div key={`${item.url}${i}`}>
          <Link
            href={item.url ? item.url : ""}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsActive?.(false)}
            className="block p-4"
          >
            <Image
              src={item.path}
              alt={item.name}
              width={16}
              height={16}
              className="aspect-square"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
