"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { usePathname } from "next/navigation";

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noLayoutPaths = ["/Login", "/SignUp"];

  const noLayout = noLayoutPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      {!noLayout && <Header />}
      <main>{children}</main>
      {!noLayout && <Footer />}
    </>
  );
}
