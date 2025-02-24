"use client";

import Navbar from "@/app/components/DashboardComponents/Navbar/page";
import Sidebar from "@/app/components/DashboardComponents/Sidebar/page";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex bg-gray-50 text-gray-900 w-full  min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`flex flex-col w-full h-full py-1 px-4 bg-gray-50 transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-20" : "md:pl-[18.5rem]"
        }`}
      >
        {/* Navbar */}
        <Navbar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}