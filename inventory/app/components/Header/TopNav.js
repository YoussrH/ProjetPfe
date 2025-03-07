"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiMenuKebab, CiCircleRemove } from "react-icons/ci";

const countries = [
  { name: "France", flag: "🇫🇷" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
];

export default function TopNav({ onMenuClick, isMobileMenuOpen }) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <section className="relative w-full">
      {/* Top Bar */}
      <div className="grid grid-cols-3 items-center h-5 pt-2 px-2 sm:px-5 md:px-8">
        {/* Phone Icon + Service Client (Left in Desktop) */}
        <div className="flex items-center gap-3">
          <Image src="/phone.svg" width={25} height={20} alt="phone" className="w-6 h-6 sm:w-7 sm:h-7" />
          <Link href="#" className="hidden md:inline text-sm font-serif">
            Service Client
          </Link>
        </div>

        {/* Center Scrolling Text */}
        <div className="flex-grow overflow-hidden text-center w-full">
          {/* Desktop Version - Two Messages Scroll Together */}
          <div className="whitespace-nowrap text-sm text-gray-500 font-serif hidden md:flex animate-marquee-desktop">
            <span className="mx-5">Petits prix : -50% sur une sélection d'articles à prix rond !*</span>
            <span className="mx-5">Livraison offerte à partir de 150 DT d'achat</span>
          </div>

          {/* Mobile Version - Messages Fade In and Out */}
          <div className="whitespace-nowrap text-sm font-serif flex md:hidden overflow-hidden relative">
            <div className="animate-fade">
              <span className="mx-5">Livraison offerte à partir de 150 DT d'achat</span>
            </div>
            <div className="animate-fade">
              <span className="mx-5">Petits prix : -50% sur une sélection d'articles à prix rond !*</span>
            </div>
          </div>
        </div>

        {/* Nos Boutique (Right in Desktop) */}
        <div className="hidden md:flex justify-end text-sm font-serif">
          <Link href="#">Nos Boutique</Link>
        </div>
      </div>

      {/* Middle Bar (Desktop) */}
      <div className="hidden md:grid grid-cols-3 items-center px-8 py-3">
        {/* Country Selector */}
        <div className="relative">
          <div className="flex gap-2 items-center cursor-pointer p-2 rounded-md" onClick={toggleDropdown}>
            <h5 className="font-thin text-sm font-serif">Pays de livraison :</h5>
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="font-light tracking-[1.3px] text-sm font-serif">{selectedCountry.name}</span>
            <span className="tracking-[2px] text-sm font-serif">| FR</span>
          </div>

          {isOpen && (
            <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-md">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectCountry(country)}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <img src="/mgm1.svg" className="h-6 cursor-pointer " alt="Logo" />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex justify-end gap-4">
          <Image src="/search.svg" alt="search" width={35} height={30} className="cursor-pointer" />
          <Image src="/wishlist.svg" alt="wishlist" width={35} height={30} className="cursor-pointer" />
          <Image src="/cart1.svg" alt="cart" width={35} height={30} className="cursor-pointer" />
          <Image src="/user.svg" alt="user" width={35} height={30} className="cursor-pointer" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="grid grid-cols-3 md:hidden items-center max-w-80 py-2 px-2 mt-5 relative">
        {/* Menu Icon (Left-0) */}
        <button className="absolute left-0 p-2" onClick={onMenuClick}>
          {isMobileMenuOpen ? (
            <CiCircleRemove className="cursor-pointer w-7 h-7 " />
          ) : (
            <CiMenuKebab className="cursor-pointer  w-7 h-7" />
          )}
        </button>

        {/* Logo (Smaller & Centered) */}
        <div className="flex justify-center ">
          <Link href="/">
            <img src="/mgm1.svg" className="h-4 cursor-pointer ml-5" alt="Logo" />
          </Link>
        </div>

        {/* Icons (Right-0) */}
        <div className="absolute right-7 flex items-center gap-1 pr-2">
          <Image src="/search.svg" alt="search" width={25} height={20} className="cursor-pointer" />
          <Image src="/wishlist.svg" alt="wishlist" width={25} height={20} className="cursor-pointer" />
          <Image src="/cart1.svg" alt="cart" width={25} height={20} className="cursor-pointer" />
          <Image src="/user.svg" alt="user" width={25} height={20} className="cursor-pointer" />
        </div>
      </div>
    </section>
  );
}