"use client";
import React from "react";
import Image from "next/image";

export default function SubmenuGarçon({ isOpen, onMouseEnter, onMouseLeave }) {
  return (
    <div
    className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
    }`}
    onMouseEnter={onMouseLeave}
    onMouseLeave={onMouseEnter}
  >
    <div className="mx-auto w-[85%] p-6 flex gap-12">
      {/* Categories Section */}
      <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Vêtements</h4>
          <ul className="space-y-2">
            {[
             " T-shirts et polos",
              "Chemises",
             " Shorts",
              "Pulls, sweats et gilets",
              "Manteaux et vestes",
              "Pantalons",
              "Maillots de bain",
             " > Tous les vêtements"].map((brand, index) => (
              <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
            ))}
          </ul>
      </div>

     
        {/* Accessoire Section */}
        <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Accessoires</h4>
          <ul className="space-y-2">
            {[
              "Sacs, sacs à dos, cartables", "Casquettes, chapeaux, bobs", "Ceintures, bretelles, noeuds papillon", "Sous-vêtements et pyjamas",  "Chaussettes", "> Tous les accessoires", 
            ].map((brand, index) => (
              <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
            ))}
          </ul>
        </div>
           {/* Chaussures Section */}
           <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Chaussures</h4>
          <ul className="space-y-2">
            {["Sandales et claquettes", "Baskets", "> Toutes les chaussures"  
            ].map((brand, index) => (
              <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
            ))}
          </ul>
        </div>
               {/* Marques Section */}
        <div>
          <h4 className="font-bold font-serif mb-2 uppercase text-sm">Marque</h4>
          <ul className="space-y-2">
            {[
              "TED CLARNE'S", "BOSS", "TLILA", "O'spella", "HUGO",
              "P'TIT FRIMEUR", "GIVENCHY PARIS ", "LANVIN", "CHCLOÉ",
              "KENZO", 
            ].map((brand, index) => (
              <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
            ))}
          </ul>
        </div>
        {/* Images */}
        <div className="flex gap-8">
        <div className="relative">
          <Image src="/Garcon.jpg" alt="Sélection Garcon" width={350} height={50} className="h-96 rounded-lg shadow-md" />
          <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
            <h4 className=" relative top-40 text-lg  font-normal">Les Nouveauté pour Garçon</h4>
            <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
              Découvrir Plus
            </button>

          </div>
        </div> 
      
        </div>
      </div>
  </div>
  )
}
