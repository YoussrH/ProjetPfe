// components/Breadcrumb.js
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname() || "";

  // Split the pathname into segments
  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "store");

  return (
    <div className="border border-gray-300 px-4 py-1 text-gray-500 text-sm mb-4 rounded-md">
      <span className="text-gray-500">Accueil</span>
      {segments.map((segment, index) => {
        const formattedSegment = segment.replace(/-/g, " ");
        const isLast = index === segments.length - 1;
        return (
          <span key={index} className="text-gray-500">
            {" / "}
            <span className={isLast ? "font-semibold" : "hover:underline cursor-pointer"}>
              {formattedSegment.charAt(0).toUpperCase() + formattedSegment.slice(1)}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;