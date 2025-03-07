"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

export default function SubmenuNouveautes({ isOpen, onMouseEnter, onMouseLeave }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [marquesOpen, setMarquesOpen] = useState(false);

  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleMarques = () => setMarquesOpen(!marquesOpen);

  return (
    <div
      className={`absolute left-0 top-40 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Desktop Layout */}
      <div className="mx-auto w-[85%] p-6 hidden md:flex gap-20">
        {/* Categories Section */}
        <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Catégories</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-600 font-light font-serif text-sm">
                Nouveautés pour garçon
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 font-light font-serif text-sm">
                Nouveautés pour fille
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 font-light font-serif text-sm">
                Nouveautés pour bébé
              </a>
            </li>
          </ul>
        </div>

        {/* Marques Section */}
        <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Marque</h4>
          <ul className="space-y-2">
            {[
              "TED CLARNE'S",
              "BOSS",
              "TLILA",
              "O'spella",
              "HUGO",
              "P'TIT FRIMEUR",
              "GIVENCHY PARIS",
              "LANVIN",
              "CHCLOÉ",
              "KENZO",
            ].map((brand, index) => (
              <li key={index}>
                <a href="#" className="hover:text-blue-600 font-light font-serif text-sm">
                  {brand}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Images */}
        <div className="flex gap-8">
          <div className="relative">
            <Image src="/DINA-VIOLET-1.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
            <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
              <h4 className="relative top-40 text-lg font-normal">Sélection Femme</h4>
              <button className="hover:text-black relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                Découvrir Plus
              </button>
            </div>
          </div>
          <div className="relative">
            <Image src="/cargo-4.jpg" alt="Promo 2" width={350} height={50} className="rounded-lg h-96 shadow-md" />
            <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
              <h4 className="relative top-40 text-lg font-normal">Sélection Homme</h4>
              <button className="relative top-40 mt-2 px-4 py-2 text-white font-normal rounded-full border border-white hover:text-black hover:bg-gray-300">
                Découvrir Plus
              </button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

/*
 {/* Mobile Layout 
 <div className=" p-2 max-w-72">
 {/* Categories Dropdown 
 <div className="border-b p-2">
   <div
     className="flex items-center justify-between cursor-pointer"
     onClick={toggleCategories}
   >
     <h6 className="font-semibold font-serif uppercase text-xs">Catégories</h6>
     {categoriesOpen ? (
       <CiCircleMinus className="text-gray-500" />
     ) : (
       <CiCirclePlus className="text-gray-500" />
     )}
   </div>
   {categoriesOpen && (
     <ul className="mt-2 space-y-2">
       <li>
         <a href="#" className="hover:text-blue-600 font-light font-serif text-xs">
           Nouveautés pour garçon
         </a>
       </li>
       <li>
         <a href="#" className="hover:text-blue-600 font-light font-serif text-xs">
           Nouveautés pour fille
         </a>
       </li>
       <li>
         <a href="#" className="hover:text-blue-600 font-light font-serif text-xs">
           Nouveautés pour bébé
         </a>
       </li>
     </ul>
   )}
 </div>

 {/* Marques Dropdown 
 <div className="border-b  border-gray-200 p-2">
   <div
     className="flex items-center justify-between cursor-pointer"
     onClick={toggleMarques}
   >
     <h4 className="font-semibold font-serif uppercase text-xs">Marque</h4>
     {marquesOpen ? (
       <CiCircleMinus className="text-gray-500" />
     ) : (
       <CiCirclePlus className="text-gray-500" />
     )}
   </div>
   {marquesOpen && (
     <ul className="mt-2 space-y-2">
       {[
         "TED CLARNE'S",
         "BOSS",
         "TLILA",
         "O'spella",
         "HUGO",
         "P'TIT FRIMEUR",
         "GIVENCHY PARIS",
         "LANVIN",
         "CHCLOÉ",
         "KENZO",
       ].map((brand, index) => (
         <li key={index}>
           <a href="#" className="hover:text-blue-600 font-light font-serif text-xs">
             {brand}
           </a>
         </li>
       ))}
     </ul>
   )}
 </div>

 {/* Images 
 <div className="mt-4  flex gap-1 space-y-4">
   <div className="relative">
     <Image
       src="/DINA-VIOLET-1.jpg"
       alt="Sélection Femme"
       width={50}
       height={150}
       className="w-40 h-40  mt-5 rounded-lg shadow-md"
     />
     <div className="absolute top-0 h-40 mt-5 left-0 right-0 rounded-lg bg-black bg-opacity-30 text-white p-2 text-center">
       <h6 className="relative top-16 text-xs  font-light">Sélection Femme</h6>
       <button className="hover:text-black relative top-16 mt-2 px-1 font-sans text-xs py-1 text-white font-normal rounded-full border border-white hover:bg-gray-300">
         Découvrir Plus
       </button>
     </div>
   </div>
   <div className="relative">
     <Image
       src="/cargo-4.jpg"
       alt="Promo 2"
       width={50}
       height={150}
       className="w-40 mt-1 h-40 rounded-lg shadow-md"
     />
     <div className="absolute top-0 h-40 left-0 right-0 bg-black mt-1 rounded-lg bg-opacity-30 text-white p-2 text-center">
       <h6 className="relative top-16 text-xs font-light">Sélection Homme</h6>
       <button className="relative top-16 mt-2 px-1 py-1 text-xs  text-white font-sans rounded-full border border-white hover:text-black hover:bg-gray-300">
         Découvrir Plus
       </button>
     </div>
   </div>
 </div>
</div> */