"use client";
import React from "react";
import Image from "next/image";

export default function SubmenuTendance({ isOpen, onMouseEnter, onMouseLeave }) {
  return (
    <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-12">
              {/* Categories Section */}
              <div className="mr-48">
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">LES OCCASIONS</h4>
                  <ul className="space-y-2">
                    {["BOSS x Chinese New Year", "KENZO KIDS X Chinese New Year","CAPSULE MARC JACOBS X DISNEY","Cadeaux de Naissance"
             
                    ].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
                </div>
                

                {/* Accessoire Section */}
                <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">NOTRE SELECTION
</h4>
                  <ul className="space-y-2">
                    {[
                      "Sélection Green around",
"Denim : c'est la tendance !"].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
                </div>
                
                {/* Images */}
                <div className="flex gap-8">
                <div className="relative">
                  <Image src="/DINA-VIOLET-1.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30  p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Femme</h4>
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
