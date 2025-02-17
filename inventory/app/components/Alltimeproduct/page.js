"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import router for navigation
import { AiOutlinePlus } from "react-icons/ai";

const products = [
  { id: 1, image: "/chemise1.jpg", composition: "69% LYOCELL 30% COTTON", name: "Chemise Classique", price: "$49.99", category: "MEN", colors: ["#000000", "#B22222", "#4169E1"] },
  { id: 2, image: "/chemise2.jpg", composition: "100% COTTON", name: "Chemise Décontractée", price: "$54.99", category: "MEN", colors: ["#A52A2A", "#4B0082"] },
  { id: 3, image: "/CRISTAL.jpg", composition: "98% COTTON 2% ELASTANE", name: "Jean Cristal", price: "$79.99", category: "MEN", colors: ["#1C1C1C"] },
  { id: 4, image: "/CRISTAL1.jpg", composition: "98% COTTON 2% ELASTANE", name: "Jean Cristal Slim", price: "$84.99", category: "MEN", colors: ["#1C1C1C", "#808080"] },
  { id: 5, image: "/CRISTAL2.jpg", composition: "99% COTTON 1% ELASTANE", name: "Jean Cristal Fit", price: "$89.99", category: "WOMEN", colors: ["#000000", "#808080", "#A9A9A9"] },
  { id: 6, image: "/CRISTAL3.jpg", composition: "97% COTTON 3% ELASTANE", name: "Jean Cristal Stretch", price: "$92.99", category: "WOMEN", colors: ["#2F4F4F", "#708090"] },
  { id: 7, image: "/SAPHIR.jpg", composition: "100% DENIM COTTON", name: "Jean Saphir", price: "$95.99", category: "KIDS", colors: ["#191970", "#4682B4"] },
];

export default function AllTimeProducts() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter(); // Next.js router

  const categoryColors = {
    All: "#000000",
    WOMEN: "#6e6e6e",
    MEN: "#6e6e6e",
    KIDS: "#6e6e6e",
  };

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, 4); // Display only first 4 products

  return (
    <section className="flex flex-col px-10 mt-24">
      {/* Title */}
      <div className="text-5xl leading-[40px] tracking-[2px] font-bold uppercase">
        <span className="block">ALL TIME</span>
        <span className="block">COLLECTION</span>
      </div>

      {/* Category List */}
      <div className="mt-12 font-light tracking-[2px] text-sm flex gap-9 relative">
        {["All", "WOMEN", "MEN", "KIDS"].map((category) => (
          <span
            key={category}
            className={`inline cursor-pointer ${
              selectedCategory === category ? "text-black font-semibold" : "text-[#6e6e6e]"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Dynamic Horizontal Line */}
      <div
        className="mt-2 h-[2px] w-14 transition-all duration-300 mb-2"
        style={{
          backgroundColor: categoryColors[selectedCategory],
          transform: `translateX(${
            { All: "0px", WOMEN: "74px", MEN: "172px", KIDS: "252px" }[selectedCategory]
          })`,
        }}
      ></div>

      {/* Product List */}
      <div className="grid grid-cols-4 gap-5 mt-10">
        {visibleProducts.map((product) => (
          <div key={product.id} className="relative w-[250px]">
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

      {/* "See More" Button Below the Products */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/store/products")} // Navigate to /store/products
          className="mb-3 border h-10 px-6 border-gray-400 rounded-md text-sm font-light tracking-[2px] transition-all duration-200 hover:bg-gray-200"
        >
          See More
        </button>
      </div>
    </section>
  );
}
