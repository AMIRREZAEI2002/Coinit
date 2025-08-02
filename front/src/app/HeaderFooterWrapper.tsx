"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { usePathname } from "next/navigation";

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // مسیرهایی که هیچ‌کدوم رو نباید نشون بدن (نه هدر، نه فوتر)
  const noHeaderFooterPaths = ["/Login", "/SignUp"];

  // مسیرهایی که فقط هدر داشته باشن (بدون فوتر)
  const headerOnlyPaths = ["/Spot", "/Future"];

  const hideAll = noHeaderFooterPaths.some((path) => pathname.startsWith(path));
  const headerOnly = headerOnlyPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      {!hideAll && <Header />}
      <main>{children}</main>
      {!hideAll && !headerOnly && <Footer />}
    </>
  );
}
