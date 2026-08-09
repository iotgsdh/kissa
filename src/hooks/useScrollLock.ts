"use client";

import { useEffect } from "react";

export function useScrollLock(
  isLocked: boolean,
  isMobile?: boolean | null,
  loadingFinished?: boolean | null,
) {
  useEffect(() => {
    document.body.style.overflow =
      !loadingFinished || (isLocked && isMobile) ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked, isMobile, loadingFinished]);
}
