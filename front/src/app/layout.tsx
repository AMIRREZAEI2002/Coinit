// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Polyfills from "./polyfills";
import HeaderFooterWrapper from "./HeaderFooterWrapper";
import LoadingSpinner from "@/Components/LoadingSpinner";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Coinit",
  description: "Crypto and Currency in Coinit",
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Coinit",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Polyfills />
        <Providers>
          <Suspense fallback={<LoadingSpinner />}>
            <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
