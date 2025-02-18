"use client";

import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

const products = [
  { id: 1, image: "/chemise1.jpg", composition: "69% LYOCELL 30% COTTON", name: "Chemise Classique", price: "DT 49.99", colors: ["#000000", "#B22222", "#4169E1"] },
  { id: 2, image: "/chemise2.jpg", composition: "100% COTTON", name: "Chemise Décontractée", price: "DT 54.99", colors: ["#A52A2A", "#4B0082"] },
  { id: 3, image: "/CRISTAL.jpg", composition: "98% COTTON 2% ELASTANE", name: "Jean Cristal", price: "DT 79.99", colors: ["#1C1C1C"] },
  { id: 4, image: "/CRISTAL1.jpg", composition: "98% COTTON 2% ELASTANE", name: "Jean Cristal Slim", price: "DT 84.99", colors: ["#1C1C1C", "#808080"] },
  { id: 5, image: "/CRISTAL2.jpg", composition: "99% COTTON 1% ELASTANE", name: "Jean Cristal Fit", price: "DT 89.99", colors: ["#000000", "#808080", "#A9A9A9"] },
  { id: 6, image: "/CRISTAL3.jpg", composition: "97% COTTON 3% ELASTANE", name: "Jean Cristal Stretch", price: "DT 92.99", colors: ["#2F4F4F", "#708090"] },
  { id: 7, image: "/SAPHIR.jpg", composition: "100% DENIM COTTON", name: "Jean Saphir", price: "DT 95.99", colors: ["#191970", "#4682B4"] },
];

export default function New() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    <section className="px-10 mt-24">
      {/* Header */}
      <div className="text-5xl leading-[40px] tracking-[2px] font-bold uppercase  relative">
        <span className="block">NEW</span>
        <span className="block relative">
          THIS WEEK
          <span className="absolute  text-red-900 animate-bounce text-xl font-bold left-[20%] top-[-28px]">
            ({products.length})
          </span>
        </span>
      </div>

      {/* Scrollable Product List */}
      <div className="relative mt-10">
        {/* Product List */}
        <div ref={scrollRef} className="flex gap-5 overflow-hidden scroll-smooth">
          {products.map((product) => (
            <div key={product.id} className="relative flex-shrink-0 w-[250px]">
              {/* Product Image */}
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />

                {/* Multiple Colors - Display on Top Right */}
                {product.colors.length > 1 && (
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {product.colors.map((color, index) => (
                      <span key={index} className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color }}></span>
                    ))}
                  </div>
                )}

                {/* Plus Icon at Bottom */}
                <div className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full cursor-pointer group-hover:bg-gray-700 transition">
                  <AiOutlinePlus className="text-xl" />
                </div>
              </div>

              {/* Matières et Compositions */}
              <p className="text-gray-500 text-xs font-light mt-2">{product.composition}</p>

              {/* Product Name & Price */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-normal tracking-[1px]">{product.name}</p>
                <p className="text-sm font-normal">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Buttons Below the Product List */}
        <div className="flex justify-center text-center ml-8 mb-9  mt-6 gap-5">
          <button onClick={scrollLeft}>
            <RiArrowDropLeftLine className="border h-10 w-10 border-gray-400 rounded-md p-1 text-4xl" />
          </button>
          <button onClick={scrollRight}>
            <RiArrowDropRightLine className="border h-10 w-10 border-gray-400 rounded-md p-1 text-4xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
