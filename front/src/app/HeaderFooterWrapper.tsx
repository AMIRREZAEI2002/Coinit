"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutPaths = ["/login", "/signup", "/wallet", "/trade"];

  const noLayout = noLayoutPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      {!noLayout && <Header />}
      <main>{children}</main>
      {!noLayout && <Footer />}
    </>
  );
}
