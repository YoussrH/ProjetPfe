"use client"; 
import { usePathname } from "next/navigation";
import Header from "../Header/page";
import Heding from "../Header/pages";

export default function DynamicHeader() {
  const pathname = usePathname();

  return pathname === "/" ? <Header /> : <Heding />;
}
