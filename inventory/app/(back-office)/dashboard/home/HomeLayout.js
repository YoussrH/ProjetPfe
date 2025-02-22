"use client";

import HomeNavs from "./HomeNavs";


export default function HomeLayout({ children }) {
  return (
    <div>
      {/* Always show HomeNavs */}
      <HomeNavs />

      {/* Render the actual page content */}
      <div>{children}</div>
    </div>
  );
}