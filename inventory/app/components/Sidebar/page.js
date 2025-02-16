"use client";

import {Archive,CircleDollarSign,Clipboard,  Layout,  SlidersHorizontal,User,} from "lucide-react";
import { TiArrowForwardOutline } from "react-icons/ti";
import { Workflow } from 'lucide-react';

import { FaOpencart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TbReport } from "react-icons/tb";
const SidebarLink = ({ href, icon: Icon, label, isCollapsed, hasSubmenu }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center justify-between ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 ml-5 !text-gray-700" />
          {!isCollapsed && <span className="font-medium text-gray-700">{label}</span>}
        </div>

        {/* Show Arrow if hasSubmenu is true and Sidebar is NOT collapsed */}
        {!isCollapsed && hasSubmenu && <TiArrowForwardOutline className="w-4 h-4 text-gray-500" />}
      </div>
    </Link>
  );
};

const Sidebar = ({ isSidebarCollapsed }) => {
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-center md:justify-start items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="/avatar.jpg"
          alt="bluegate-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        {!isSidebarCollapsed && <h1 className="font-extrabold text-2xl">BlueGate</h1>}
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8 text-xs">
        <SidebarLink href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSidebarCollapsed} hasSubmenu={true} />
        <SidebarLink href="/sales" icon={FaOpencart} label="Sales" isCollapsed={isSidebarCollapsed} hasSubmenu={true} />
        <SidebarLink href="/expenses" icon={CircleDollarSign} label="Expenses" isCollapsed={isSidebarCollapsed} hasSubmenu={true} />
        <SidebarLink href="/products" icon={Clipboard} label="Products" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/users" icon={User} label="Users" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/integration" icon={Workflow} label="Integrations" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/reports" icon={TbReport} label="Reports" isCollapsed={isSidebarCollapsed} />
        <SidebarLink href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed} />

      </div>

      {/* FOOTER */}
      {!isSidebarCollapsed && (
        <div className="mb-10">
          <p className="text-center text-xs text-gray-500">&copy; 2025 BlueGate</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
