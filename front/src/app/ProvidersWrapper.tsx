"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/Components/LoadingSpinner";


const DynamicProviders = dynamic(() => import("./providers"), {
  ssr: false,
  loading: () => {
    const mode =
      typeof window !== "undefined"
        ? (localStorage.getItem("darkMode") === "true"
            ? "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")
        : "light";
  
    return <LoadingSpinner mode={mode} />;
  },
});

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}
