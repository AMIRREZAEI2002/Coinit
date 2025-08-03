import dynamic from "next/dynamic";
import LoadingSpinner from "@/Components/LoadingSpinner";
type LoadingSpinnerProps = {
  mode: "light" | "dark";
};

const TypedLoadingSpinner = LoadingSpinner as React.FC<LoadingSpinnerProps>;

const DynamicProviders = dynamic(() => import("./providers"), {
  ssr: false,
  loading: () => {
    const mode: "light" | "dark" =
      typeof window !== "undefined"
        ? localStorage.getItem("darkMode") === "true"
          ? "dark"
          : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : "light";

    return <TypedLoadingSpinner mode={mode} />;
  },
});

export default function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <DynamicProviders>{children}</DynamicProviders>;
}
