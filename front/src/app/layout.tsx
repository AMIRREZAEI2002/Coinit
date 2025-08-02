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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Polyfills />
        <Providers>
          <Suspense fallback={<LoadingSpinner />}>
            <HeaderFooterWrapper>
              {children}
            </HeaderFooterWrapper>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}