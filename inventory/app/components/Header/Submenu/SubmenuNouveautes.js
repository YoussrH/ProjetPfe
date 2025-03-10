"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

export default function SubmenuNouveautes({ isOpen, onMouseEnter, onMouseLeave, isScrolled }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [marquesOpen, setMarquesOpen] = useState(false);

  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleMarques = () => setMarquesOpen(!marquesOpen);

  return (
    <div
      className={`absolute left-0 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ top: isScrolled ? "51px" : "173px"}} // Adjust top position based on isScrolled
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto w-[85%] p-6 hidden md:flex gap-20">
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