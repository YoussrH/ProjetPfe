"use client";

import React, { useState } from "react";
import OutletProductList from "./OutletProductList";

const dropdownData = {

  Genres: ["FILLE (1205)", "GARCON (1470)"],
  Prix: { min: 50, max: 1275 },
  Âges: ["BEBE COUCHE (218)", "ENFANT (1989)", "JUNIOR (130)", "LAYETTE (338)"],
  Tailles: [
    "1 mois (102)", "3 mois (307)", "6 mois (469)", "9 mois (499)",
    "12 mois (503)", "18 mois (529)", "2 ans (1083)", "3 ans (1166)",
    "4 ans (2060)", "5 ans (1861)", "6 ans (1969)", "8 ans (1961)",
    "10 ans (1997)", "12 ans (1979)", "14 ans (1776)", "16 ans (1130)",
    "Taille unique (150)",
  ],
  Catégories: [
    "ACCESSOIRES (375)", "BAIN (111)", "CHAUSSETTES ET COLLANTS (1)", "CHAUSSURES (180)",
    "CHEMISES, BLOUSES (71)", "ENSEMBLES, COMBINAISONS (111)", "JUPES (54)",
    "PANTALONS, PANTACOURTS, LEGGINGS (203)", "PARKAS, VESTES, MANTEAUX (115)",
    "PULLS, GILETS, CARDIGANS (288)", "ROBES (243)", "SHORTS, BERMUDAS (270)",
    "SOUS-VETEMENTS, BODYS, PYJAMAS (15)", "T-SHIRTS, POLOS, SOUS-PULLS (638)",
  ],
  Marques: [
    "BILLIEBLUSH (307)", "BOSS (584)", "CHLOE (133)", "DKNY (143)", "GIVENCHY (200)",
    "HUGO (142)", "KARL LAGERFELD KIDS (196)", "KENZO KIDS (328)", "LANVIN (52)",
    "MARC JACOBS (138)", "MICHAEL KORS (97)", "SONIA RYKIEL (27)", "TIMBERLAND (211)",
    "ZADIG & VOLTAIRE (117)",
  ],
  Couleurs: [
    "Argent (17)", "Beige (279)", "Blanc (451)", "Bleu (677)", "Gris (65)",
    "Indéterminé (66)", "Jaune (100)", "Marron (60)", "Noir (359)", "Orange (72)",
    "Rose (348)", "Rouge (56)", "Vert (116)", "Violet (9)",
  ],
};
const products = [
  { id: 1, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},
  { id: 2, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 3, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 4, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 5, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 6, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},
  { id: 7, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 8, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 9, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 10, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 11, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 12, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 13, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},
  { id: 14, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},
  { id: 15, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 16, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 17, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 18, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 19, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},
  { id: 20, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 21, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 22, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 23, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg" ,categories:"LiLi"},
  { id: 24, name: " Cargo Jeans ", price: 40, image: "/CRISTAL3.jpg" ,categories:"LiLi"},
  { id: 25, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg",categories:"LiLi" },
  { id: 26, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg" ,categories:"LiLi"},

];

export default function OutletPage() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [priceRange, setPriceRange] = useState(50);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };

  const renderDropdownList = (items, title) => (
    <div className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48 max-h-40 overflow-y-auto"
      onMouseLeave={handleMouseLeave}
    >
      <span className="block font-semibold text-sm mb-2">{title}</span>
      <ul>
        {items.slice(0,items.length).map((item, index) => (
          <li key={index} className="text-xs py-1 cursor-pointer hover:bg-gray-100 px-2">{item}</li>
        ))}
        {items.length > 4 && (
          <div className="text-center text-xs text-blue-500 cursor-pointer mt-1">
           
          </div>
        )}
      </ul>
    </div>
  );

  return (
   <section>
     <div className="px-10 py-6 font-serif flex flex-col items-center">
      {/* Breadcrumb */}
      <div className="border border-gray-300 px-4 py-1 text-gray-500 text-sm mb-4 rounded-md">
        Accueil / Petits Prix
      </div>

      {/* Title Section */}
      <h1 className="text-sm font-semibold text-center mb-2 uppercase">Petits prix</h1>
      
      {/* Description */}
      {/* Description */}
      <p className="font-mono text-xs text-center max-w-2xl mx-auto mb-6">
      Profitez de -50%* sur une sélection d'articles à prix rond de vos marques préférées !

      </p>

      {/* Filter Bar */}
      <div className="w-full max-w-5xl flex justify-between items-center border-b border-gray-300 pb-2">
        <div className="flex space-x-6 text-xs font-normal">
          {Object.keys(dropdownData).map((key) => (
            <div key={key} className="relative">
              <span
                className="cursor-pointer  hover:uppercase hover:border-b-2 hover:border-black"
                onClick={() => toggleDropdown(key)}
              >
                {key}
              </span>
              {openDropdown === key && key !== "Prix" && renderDropdownList(dropdownData[key], key)}
              {openDropdown === "Prix" && key === "Prix" && (
                <div className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48"
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="block font-semibold text-sm mb-2">Prix</span>
                  <input
                    type="range"
                    min="50"
                    max="1275"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                  <div className="text-xs">De {priceRange} € à 1275 €</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <span className="text-xs font-normal cursor-pointer hover:underline">2675 Produit(s)</span>
      </div>
    </div>
    <OutletProductList products={products}/>
   </section>
  );
}
