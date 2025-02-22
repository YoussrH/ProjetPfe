"use client";

import { Bell, Search, Sun } from "lucide-react";
import { TbSun } from "react-icons/tb";
import { TbMoonStars } from "react-icons/tb";
import { BsMenuButtonFill, BsMenuAppFill } from "react-icons/bs"; // Import both icons
import Image from "next/image";
import { TbSettings } from "react-icons/tb";
import Link from "next/link";
import React, { useState } from "react";
import { LuArrowBigDownDash } from "react-icons/lu";
const Navbar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="  flex justify-between items-center w-full  border-b  px-1 py-1 bg-gray-100">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-300"onClick={toggleSidebar}>
          {/* ✅ Dynamically switch icons when sidebar is toggled */}
          {isSidebarCollapsed ? (
            <BsMenuAppFill className="w-6 h-6 transition-all duration-300" />
          ) : (
            <BsMenuButtonFill className="w-6 h-6 transition-all duration-300" />
          )}
        </button>

        {/* Search Bar */}
        <div className="relative ">
        <div className="absolute inset-y-0  right-3 pl-3  flex items-center">
            <Search className="text-gray-500 " size={20} />
          </div>
           <input
                id="search"
                name="search"
                type="text"
                required
                placeholder="Start typing to search groups & products"
                autoComplete="textInput"
                className="min-w-48 w-72 border font-serif flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-xs/6"
              />
         
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          {/* Dark Mode Toggle */}
         {/* Divider */}
         <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-1" />
          {/* Dark Mode Toggle with Rotation Effect */}
          <button onClick={toggleDarkMode} className="relative">
            <div className={`transition-transform duration-500 ease-in-out ${ isDarkMode ? "rotate-180" : "rotate-0" }`} >
              {isDarkMode ? (
                <Sun key="sun" className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <TbMoonStars key="moon" className="cursor-pointer text-gray-500" size={24} />
              )}
            </div>
          </button>


          {/* Notifications */}
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
            {/* Settings Icon */}
        <Link href="/settings">
          <TbSettings className="cursor-pointer text-gray-500" size={24} />
        </Link>

          {/* Divider */}
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />

          {/* Profile Section */}
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/avatar.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold font-sans">Yors</span>
            <LuArrowBigDownDash/>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Navbar;
