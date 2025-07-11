import type { Metadata } from "next";
import "./globals.css";
import HeaderFooterWrapper from "./HeaderFooterWrapper";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Coinit",
  description: "Crypto and Currency in Coinit",
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en">
      <body>
        <Providers>
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper> 
        </Providers>
      </body>
    </html>
  );
}
