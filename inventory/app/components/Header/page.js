import React from 'react';
import Image from "next/image";
import { Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="mt-12 px-10">
      {/* Top Navigation - Logo & Links */}
      <div className="flex items-center justify-between">
        {/* Left Section - Menu + Links */}
        <div className="flex items-center gap-5">
          <Image src="/menu.svg" alt="menu" width={30} height={30} className="cursor-pointer" />
          <nav className="flex gap-5">
            <h5 className="cursor-pointer">Home</h5>
            <h5 className="cursor-pointer">Collections</h5>
            <h5 className="cursor-pointer">New</h5>
          </nav>
        </div>

        {/* Center Section - Brand Name */}
        <h2 className="text-3xl font-bold mr-24">Blue Gate</h2>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-5">
          <Image src="/wishlist.svg" alt="wishlist" width={40} height={30} className="cursor-pointer" />
          <Image src="/cart1.svg" alt="cart" width={40} height={30} className="cursor-pointer" />
          <Image src="/user.svg" alt="user" width={40} height={30} className="cursor-pointer" />
        </div>
      </div>

      {/* Bottom Navigation - Categories & Search Bar */}
      <div className="mt-[70px] flex flex-col items-center">
        {/* Category Navigation */}
        <nav className="flex gap-10 font-normal tracking-[2px] text-lg">
          <h5 className="cursor-pointer">MEN</h5>
          <h5 className="cursor-pointer">WOMEN</h5>
          <h5 className="cursor-pointer">KIDS</h5>
        </nav>

        {/* Search Bar */}
        <div className="mt-7 flex items-center border border-gray-300 px-3 py-2 w-80 bg-[#D9D9D9]">
          <input type="text" placeholder="Search" className="ml-3 outline-none w-full bg-transparent text-gray-700" />
          <Search className="text-gray-600" />
        </div>
      </div>
    </header>
  );
}
