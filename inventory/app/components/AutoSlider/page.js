"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  { src: "/yasmin-final-ok-scaled-1.jpg", title: "Nouvelle Collection", text: "50% sur les chemises élégantes" },
  { src: "/Banner-HOMME-3-scaled-1.jpg", title: "Bruno Style", text: "Découvrez la collection premium" },
  { src: "/slider-femme-yasmin-2-scaled.jpg", title: "Mode Féminine", text: "50% sur une sélection d'articles" },
  { src: "/Banner-HOMME-3-scaled-1.jpg", title: "Tendance Garçon", text: "Profitez des offres exclusives" },
];

const positions = [
  "top-10 left-10", "top-10 right-10",
  "bottom-10 left-10", "bottom-10 right-10",
  "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
];

export default function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomPositions, setRandomPositions] = useState([]); // ✅ FIX: Remove TypeScript notation

  useEffect(() => {
    // Assign a fixed random position per slide (client-side only)
    setRandomPositions(slides.map(() => positions[Math.floor(Math.random() * positions.length)]));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[500px] flex-shrink-0">
            <Image
              src={slide.src}
              alt={`Slide ${index + 1}`}
              width={500}
              height={10}
              className="w-screen h-full object-fit"
            />
            {randomPositions.length > 0 && (
              <div className={`absolute ${randomPositions[index]} bg-white bg-opacity-20 text-black p-5 rounded-lg shadow-lg backdrop-blur-md`}>
                <h2 className="text-lg font-medium text-black">{slide.title}</h2>
                <p className="mt-2 text-sm font-serif text-gray-700">{slide.text}</p>
                <button className="mt-4 px-6 py-2 bg-black text-white text-sm font-serif rounded border border-black hover:bg-gray-800">
                  Découvrir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-5 h-4 border-2 border-black rounded-full flex items-center justify-center transition-all duration-300 ${
              currentIndex === index ? "p-1" : ""
            }`}
          >
            {currentIndex === index && <div className="w-5 h-2 bg-black rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
