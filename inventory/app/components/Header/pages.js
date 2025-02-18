import React from 'react';
import Image from "next/image";
import {  Search } from 'lucide-react';
import Link from 'next/link';

export default function Heding() {
  return (
    <header className="mt-12 px-10">
      {/* Top Navigation - Logo & Links */}
      <div className="flex items-center justify-between">
        {/* Left Section - Menu + Links */}
        <div className="flex items-center gap-5">
          <Image src="/menu.svg" alt="menu" width={30} height={30} className="cursor-pointer" />
          <nav className="flex gap-5">
          <Link href="/"><h5 className="cursor-pointer">Home</h5></Link>
          <Link href="/store/Collections"><h5 className="cursor-pointer">Collections</h5></Link>
          <Link href="/store/New"><h5 className="cursor-pointer">New</h5></Link>
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

   
    </header>
  );
}
