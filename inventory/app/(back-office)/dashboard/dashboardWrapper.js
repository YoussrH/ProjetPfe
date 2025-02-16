"use client";


import Navbar from "@/app/components/Navbar/page";
import Sidebar from "@/app/components/Sidebar/page";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex bg-gray-50 text-gray-900 w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

      {/* Main Content */}
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 transition-all duration-300 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        {/* ✅ Pass isSidebarCollapsed to Navbar */}
        <Navbar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
