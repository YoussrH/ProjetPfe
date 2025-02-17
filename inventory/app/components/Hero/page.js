"use client";

import React, { useState } from "react";
import { RiArrowDropRightLine, RiArrowDropLeftLine } from "react-icons/ri";

const images = [
  "/chemise1.jpg",
  "/chemise2.jpg",
  "/CRISTAL.jpg",
  "/CRISTAL1.jpg",
  "/CRISTAL2.jpg",
  "/CRISTAL3.jpg",
  "/SAPHIR.jpg",
  
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 2, 0));
    }
  };

  const scrollRight = () => {
    if (currentIndex < images.length - 2) {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 2, images.length - 2));
    }
  };

  return (
    <section className="flex items-start justify-between px-10 mt-24">
      <div className="flex flex-col self-start">
        <div className="text-5xl leading-[40px] tracking-[2px] font-bold uppercase">
          <span className="block">NEW</span>
          <span className="block">COLLECTION</span>
        </div>

        <div className="mt-2 font-light tracking-[2px] text-lg">
          <span className="block">Summer</span>
          <span className="block">2025</span>
        </div>

        <div className="mt-[200px] flex items-center gap-10">
          <div className="flex items-center border border-gray-300 px-5 py-2 bg-[#D9D9D9] cursor-pointer">
            <span className="text-[16px]">Go To Shop</span>
            <img src="/ArrowRightVector.svg" alt="arrow-right" width="42" height="20" className="ml-5 animate-pulse" />
          </div>

          <div className="flex gap-2 ml-72">
            <RiArrowDropLeftLine
              onClick={scrollLeft}
              className={`border h-10 w-10 border-gray-400 rounded-md p-1 text-4xl 
                ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            />
            <RiArrowDropRightLine
              onClick={scrollRight}
              className={`border h-10 w-10 border-gray-400 rounded-md p-1 text-4xl 
                ${currentIndex >= images.length - 2 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            />
          </div>
        </div>
      </div>

      {/* ✅ Image Container with Smooth Transition & `gap-5` Between Images */}
      <div className="w-[50%] overflow-hidden relative">
        <div
          className="flex gap-5 transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 55}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`image-${index}`}
              className="w-[50%] h-96 object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
