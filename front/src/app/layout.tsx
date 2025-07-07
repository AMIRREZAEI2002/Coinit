import type { Metadata } from "next";
import "./globals.css";
import HeaderFooterWrapper from "./HeaderFooterWrapper";

export const metadata: Metadata = {
  title: "Coinit",
  description: "Crypto and Currency in Coinit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
      </body>
    </html>
  );
}
