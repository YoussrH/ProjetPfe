"use client";

import { usePathname } from "next/navigation";
import DynamicHeader from "./DynamicHeader/DynamicHeader";
import Footer from "./Footer/page";
import ScrollToTop from "./DynamicHeader/ScrollToTop";
import DashboardLayout from "../(back-office)/dashboard/dashboardWrapper";
import HomeLayout from "../(back-office)/dashboard/home/HomeLayout";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isHomeSection = pathname.startsWith("/dashboard/home/");

  return (
    <>
      {isHomeSection ? (
        // If inside /dashboard/home/, use HomeLayout
        <DashboardLayout><HomeLayout>{children}</HomeLayout></DashboardLayout>
      ) : isDashboard ? (
        // If inside /dashboard/, but not /dashboard/home/, use DashboardLayout
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        // Default layout for other pages
        <>
          <DynamicHeader />
          {children}
          <ScrollToTop />
          <Footer />
        </>
      )}
    </>
  );
}
