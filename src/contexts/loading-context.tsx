"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
  loadingFinished: boolean;
  setLoadingFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loadingFinished,
        setLoadingFinished,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
}
