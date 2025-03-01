"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Header from "./page";
import Link from "next/link";
// Country Data (Using Emoji Flags)
const countries = [
  { name: "France", flag: "🇫🇷" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
];
export default function TopNav() {
   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isOpen, setIsOpen] = useState(false);
   const toggleDropdown = () => setIsOpen(!isOpen);
  
    const selectCountry = (country) => {
      setSelectedCountry(country);
      setIsOpen(false);
    };
  
  return (
    <>
     <section className="mx-5">
       {/* Top Bar */}
       <div className="flex justify-between items-center m-2 h-11 pt-2 px-5">
      <div className="flex gap-2 items-center">
          <Image src="/phone.svg" width={30} height={20} alt="phone" />
          <span>Service Client</span>
        </div><div className="overflow-hidden w-[40%] relative">
            <div className="whitespace-nowrap animate-marquee">
              <span className="mx-5">Petits prix : -50% sur une sélection d'articles à prix rond !*</span>
              <span className="mx-5">Livraison offerte à partir de 150 DT d'achat</span>
            </div>
          </div><div className="flex items-center gap-2">
            <span>Nos Boutiques</span>
          </div>
    </div>

    {/* Middle Bar */}
    <div className="flex items-center justify-between">
      <div className="relative">
        <div
          className="flex gap-2 items-center cursor-pointer p-2 rounded-md"
          onClick={toggleDropdown}
        >
          <h5 className="font-thin">Pays de livraison :</h5>
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="font-light tracking-[1.3px]">{selectedCountry.name}</span>
          <span className="tracking-[2px]">| FR</span>
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
      <Link href="/">
        <img src="/mgm1.svg" className="h-6 mr-24 cursor-pointer" alt="Logo" />
      </Link>
      <div className="flex items-center gap-2">
        <Image src="/search.svg" alt="search" width={40} height={30} className="cursor-pointer" />
        <Image src="/wishlist.svg" alt="wishlist" width={40} height={30} className="cursor-pointer" />
        <Image src="/cart1.svg" alt="cart" width={40} height={30} className="cursor-pointer" />
        <Image src="/user.svg" alt="user" width={40} height={30} className="cursor-pointer" />
      </div>
    </div>
    {/* Bottom Bar */}
   
     </section>
    </>
  )
}
