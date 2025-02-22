"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../Header/page";
import Heding from "../Header/pagess";

export default function DynamicHeader() {
  const pathname = usePathname() || ""; // Prevents undefined error
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 ease-in-out ${
        pathname === "/" && isScrolling
          ? "fixed top-0 left-0 w-full bg-white shadow-md z-50"
          : ""
      }`}
    >
      {pathname === "/" && isScrolling ? <Heding /> : <Header />}
    </div>
  );
}
