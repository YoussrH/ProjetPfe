"use client";

import { Bell, Search, Sun } from "lucide-react";
import { TbSun, TbMoonStars, TbSettings } from "react-icons/tb";
import { BsMenuButtonFill, BsMenuAppFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { LuArrowBigDownDash } from "react-icons/lu";

const Navbar = ({ isSidebarCollapsed, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex justify-between items-center w-full border-b px-4 py-2 bg-gray-100 relative">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Sidebar Toggle Button */}
        <button
          className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-all duration-300"
          onClick={toggleSidebar}
        >
          {isSidebarCollapsed ? (
            <BsMenuAppFill className="w-6 h-6 transition-all duration-300" />
          ) : (
            <BsMenuButtonFill className="w-6 h-6 transition-all duration-300" />
          )}
        </button>

        {/* Close Button for Sidebar in Mobile Mode */}
        {!isSidebarCollapsed && (
          <button
            className="sm:hidden p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 transform rotate-180 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Search Bar */}
        <div className="relative flex-grow sm:flex-grow-0">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="text-gray-500" size={20} />
          </div>
          <input
            id="search"
            name="search"
            type="text"
            required
            placeholder="Search..."
            autoComplete="off"
            className="w-full sm:w-48 md:w-64 border font-serif rounded-md bg-white px-3.5 py-2 pl-10 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden sm:flex items-center gap-3 sm:gap-5">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          <div className={`transform transition-transform duration-700 ease-in-out ${isDarkMode ? "rotate-[360deg]" : "rotate-0"}`}>
            {isDarkMode ? (
              <Sun className="text-gray-500" size={24} />
            ) : (
              <TbMoonStars className="text-gray-500" size={24} />
            )}
          </div>
        </button>

        <div className="relative">
          <Bell className="text-gray-500 cursor-pointer" size={24} />
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
            3
          </span>
        </div>

        <Link
              href="/dashboard/settings"
              className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          <TbSettings className="text-gray-500" size={24} />
        </Link>

        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/avatar.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full h-10 w-10 object-cover"
          />
          <span className="font-semibold font-sans">Yors</span>
          <LuArrowBigDownDash className="text-gray-500" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay - Closes Sidebar */}
      {!isSidebarCollapsed && (
        <div
          className="fixed inset-0  sm:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-48 animate-fadeIn">
          <div className="flex flex-col p-2">
            <div className="flex items-center gap-2 p-2">
              <Image
                src="/avatar.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full h-10 w-10 object-cover"
              />
              <span className="text-sm font-semibold font-sans">Yors</span>
            </div>

            {/* Dark Mode Toggle with Slower Rotation */}
            <button
              onClick={toggleDarkMode}
              className="relative flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              <div
                className={`transform transition-transform duration-700 ease-in-out ${
                  isDarkMode ? "rotate-[360deg]" : "rotate-0"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="cursor-pointer text-gray-500" size={24} />
                ) : (
                  <TbMoonStars className="cursor-pointer text-gray-500" size={24} />
                )}
              </div>
              <span className="text-sm text-gray-700 inline">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
              <Bell className="text-gray-500" size={20} />
              <span className="text-sm text-gray-700">Notifications</span>
              <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
                3
              </span>
            </div>

            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
            >
              <TbSettings className="text-gray-500" size={20} />
              <span className="text-sm text-gray-700">Settings</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;