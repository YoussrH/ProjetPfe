"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Produit() {
  const router = useRouter();

  return (
    <section className="flex flex-col justify-center items-center mt-16 px-4">
      {/* Main Section with Images Side by Side */}
      <div className="flex flex-col md:flex-row items-start gap-6 w-full max-w-[1200px]">
        {/* Main Image */}
        <div className="relative flex flex-col items-center w-full md:w-1/2">
          <div className="overflow-hidden w-full h-[500px] cursor-pointer">
            <img
              src="/DINA-ORANGE-3-.jpg"
              alt="Capsule Disney Mickey Mouse x Marc Jacobs"
              className="shadow-lg w-full h-[150%] object-contain transition-transform duration-500 ease-out hover:scale-105"
            />
          </div>
          <div className="relative bottom-4 bg-white p-5 shadow-md w-[80%] text-center">
            <h3 className="text-sm font-normal uppercase">
            Pull Oversize x Marc Jacobs
            </h3>
            <p className="text-xs mt-2 font-light font-mono">
            Découvrez notre pull oversize alliant confort et style, parfait pour un look décontracté et tendance.
            </p>
            <button
              className="mt-3 px-5 py-2 border-black border-2 text-black font-serif tracking-widest text-xs hover:bg-gray-200 transition"
              onClick={() => router.push("/store/products")}
            >
              DÉCOUVRIR
            </button>
          </div>
        </div>

        {/* Product Grid (4 Images Next to Main) */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:w-1/2">
          {/* Product 1 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden w-[200px] h-[200px] cursor-pointer">
              <img
                src="/DINA-BLANC-1-.jpg"
                alt="T-shirt en coton Mickey"
                className="shadow-lg w-full h-64 object-contain transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <span className="bg-black text-white text-xs font-serif animate-bounce tracking-widest px-2 py-1 mt-2">
              NOUVEAUTÉ
            </span>
            <h3 className="text-sm font-semibold tracking-widest mt-2">MARC JACOBS</h3>
            <p className="text-xs font-serif tracking-widest">Pull Oversize</p>
            <p className="text-sm font-serif tracking-widest mt-1">55,00 DT</p>
          </div>

          {/* Product 2 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden w-[200px] h-[200px] cursor-pointer">
              <img
                src="/DINA-MARRON-2A-.jpg"
                alt="Casquette brodée"
                className="shadow-lg w-full h-64 object-contain transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <span className="bg-black text-white text-xs font-serif animate-bounce tracking-widest px-2 py-1 mt-2">
              NOUVEAUTÉ
            </span>
            <h3 className="text-sm font-semibold tracking-widest mt-2">MARC JACOBS</h3>
            <p className="text-xs font-serif tracking-widest">Pull Oversize</p>
            <p className="text-sm font-serif tracking-widest mt-1">55,00 DT</p>
          </div>

          {/* Product 3 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden w-[200px] h-[200px] cursor-pointer">
              <img
                src="/DINA-VIOLET-1.jpg"
                alt="Sweat-shirt à capuche Mickey"
                className="shadow-lg w-full h-64 object-contain transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <span className="bg-black text-white text-xs font-serif animate-bounce tracking-widest px-2 py-1 mt-2">
              NOUVEAUTÉ
            </span>
            <h3 className="text-sm tracking-widest font-semibold mt-2">MARC JACOBS</h3>
            <p className="text-xs font-serif tracking-widest">Pull Oversize</p>
            <p className="text-sm font-serif tracking-widest mt-1">55,00 DT</p>
          </div>

          {/* Product 4 */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden w-[200px] h-[200px] cursor-pointer">
              <img
                src="/DINA-ORANGE-1-.jpg"
                alt="T-shirt illustration Mickey"
                className="shadow-lg w-full h-64 object-contain transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <span className="bg-black text-white text-xs font-serif animate-bounce tracking-widest px-2 py-1 mt-2">
              NOUVEAUTÉ
            </span>
            <h3 className="text-sm tracking-widest font-semibold mt-2">MARC JACOBS</h3>
            <p className="text-xs font-serif tracking-widest">Pull Oversize</p>
            <p className="text-sm font-serif tracking-widest mt-1">55,00 €</p>
          </div>
        </div>
      </div>
    </section>
  );
}
