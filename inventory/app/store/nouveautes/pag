"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import NouveauteProductList from "./NouveauteProductList";
import { Chip } from "@mui/material";

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
  { id: 1, name: "Pull Oversize", price: 25, image: "/DINA-BLANC-1-.jpg", categories: "PULLS, GILETS, CARDIGANS", brand: "BOSS", color: "Blanc", size: "6 ans", ageGroup: "ENFANT", genre: "Fille" },
  { id: 2, name: "Jean Bleu", price: 50, image: "/BAGGY-BG4L20245.jpg", categories: "PANTALONS, PANTACOURTS, LEGGINGS", brand: "DKNY", color: "Bleu", size: "10 ans", ageGroup: "JUNIOR", genre: "Garçon" },
  { id: 3, name: "Pull Oversize", price: 75, image: "/femme-slider1.jpg", categories: "PULLS, GILETS, CARDIGANS", brand: "KENZO KIDS", color: "Noir", size: "12 ans", ageGroup: "JUNIOR", genre: "Fille" },
  { id: 4, name: "Cargo Jeans", price: 40, image: "/CRISTAL3.jpg", categories: "PANTALONS, PANTACOURTS, LEGGINGS", brand: "MARC JACOBS", color: "Gris", size: "8 ans", ageGroup: "ENFANT", genre: "Garçon" },
  { id: 5, name: "Chemise Blanche", price: 60, image: "/CHEMISE-P8-6.jpg", categories: "CHEMISES, BLOUSES", brand: "ZADIG & VOLTAIRE", color: "Blanc", size: "5 ans", ageGroup: "ENFANT", genre: "Garçon" },
  { id: 6, name: "Ensemble Chic", price: 90, image: "/DINA-VIOLET-2.jpg", categories: "ENSEMBLES, COMBINAISONS", brand: "CARREMENT BEAU", color: "Violet", size: "4 ans", ageGroup: "LAYETTE", genre: "Fille" },
  { id: 7, name: "Veste Mode", price: 120, image: "/DINA-ORANGE-1-.jpg", categories: "PARKAS, VESTES, MANTEAUX", brand: "MICHAEL KORS", color: "Orange", size: "6 ans", ageGroup: "ENFANT", genre: "Garçon" },
  { id: 8, name: "Jupe Classique", price: 35, image: "/DINA-MARRON-2A-.jpg", categories: "JUPES", brand: "SONIA RYKIEL", color: "Marron", size: "3 ans", ageGroup: "ENFANT", genre: "Fille" },
  { id: 9, name: "T-Shirt Casual", price: 20, image: "/DINA-BLANC-4-.jpg", categories: "T-SHIRTS, POLOS, SOUS-PULLS", brand: "LANVIN", color: "Blanc", size: "2 ans", ageGroup: "LAYETTE", genre: "Garçon" },
  { id: 10, name: "Parka Hiver", price: 140, image: "/DINA-MARRON-3A-.jpg", categories: "PARKAS, VESTES, MANTEAUX", brand: "HUGO", color: "Marron", size: "14 ans", ageGroup: "JUNIOR", genre: "Garçon" },
  { id: 11, name: "Robe Élégante", price: 80, image: "/CHEMISE-P3-5.jpg", categories: "ROBES", brand: "BILLIEBLUSH", color: "Rose", size: "8 ans", ageGroup: "ENFANT", genre: "Fille" },
  { id: 12, name: "Sous-Vêtement Set", price: 30, image: "/5G2A6692-scaled.jpg", categories: "SOUS-VETEMENTS, BODYS, PYJAMAS", brand: "KENZO KIDS", color: "Indéterminé", size: "Taille unique", ageGroup: "BEBE COUCHE", genre: "Mixte" },
  { id: 13, name: "Chaussures Baskets", price: 55, image: "/FNACBLG23D16-3-scaled-1.jpg", categories: "CHAUSSURES", brand: "ZADIG & VOLTAIRE", color: "Noir", size: "16 ans", ageGroup: "JUNIOR", genre: "Garçon" },
  { id: 14, name: "Short Décontracté", price: 28, image: "/CRISTAL2.jpg", categories: "SHORTS, BERMUDAS", brand: "DKNY", color: "Beige", size: "12 ans", ageGroup: "JUNIOR", genre: "Garçon" },
  { id: 15, name: "Jean Mode", price: 60, image: "/CRISTAL1.jpg", categories: "PANTALONS, PANTACOURTS, LEGGINGS", brand: "BOSS", color: "Bleu", size: "6 ans", ageGroup: "ENFANT", genre: "Garçon" },
  { id: 16, name: "T-Shirt Chic", price: 35, image: "/CRISTAL.jpg", categories: "T-SHIRTS, POLOS, SOUS-PULLS", brand: "KARL LAGERFELD KIDS", color: "Rouge", size: "5 ans", ageGroup: "ENFANT", genre: "Garçon" },
  { id: 17, name: "Blouson Hiver", price: 150, image: "/BRUNO-Blue-003-B-3.jpg", categories: "PARKAS, VESTES, MANTEAUX", brand: "MARC JACOBS", color: "Bleu", size: "8 ans", ageGroup: "ENFANT", genre: "Garçon" }
];


export default function NouveautesPage() {
  const pathname = usePathname() || "";
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1275);
  const [rangeValue, setRangeValue] = useState(maxPrice);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterSelect = (category, filter) => {
    setSelectedFilters((prev) => {
      const newFilters = [...prev, { category, filter }];
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const handleDeleteFilter = (filterToRemove) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.filter((f) => f.filter !== filterToRemove);
      applyFilters(newFilters);
      return newFilters;
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters([]);
    setFilteredProducts(products);
  };

  const handleApply = () => {
    applyFilters(selectedFilters);
  };

  const applyFilters = (filters) => {
    let filtered = products;

    filters.forEach(({ category, filter }) => {
      if (category === "Prix") {
        filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
      } else {
        filtered = filtered.filter(product => {
          const productValue = product[category.toLowerCase()];
          return productValue && productValue.includes(filter.split(" ")[0]);
        });
      }
    });

    setFilteredProducts(filtered);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const renderDropdownList = (items, title) => (
    <div className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48 max-h-40 overflow-y-auto"
      onMouseLeave={handleMouseLeave}
    >
      <span className="block font-semibold text-sm mb-2">{title}</span>
      <ul>
        {items.slice(0, items.length).map((item, index) => (
          <li key={index} className="text-xs py-1 cursor-pointer hover:bg-gray-100 px-2"
            onClick={() => handleFilterSelect(title, item)}>{item}</li>
        ))}
        {items.length > 4 && (
          <div className="text-center text-xs text-blue-500 cursor-pointer mt-1">
          </div>
        )}
      </ul>
    </div>
  );

  const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "store");

  return (
    <section>
      <div className="px-10 py-6 font-serif flex flex-col items-center">
        {/* Breadcrumb */}
        <div className="border border-gray-300 px-4 py-1 text-gray-500 text-sm mb-4 rounded-md">
          <span className="text-gray-500">Accueil</span>
          {segments.map((segment, index) => {
            const formattedSegment = segment.replace(/-/g, " ");
            const isLast = index === segments.length - 1;
            return (
              <span key={index} className="text-gray-500">
                {" / "}
                <span className={isLast ? "font-semibold" : "hover:underline cursor-pointer"}>
                  {formattedSegment.charAt(0).toUpperCase() + formattedSegment.slice(1)}
                </span>
              </span>
            );
          })}
        </div>

        {/* Title Section */}
        <h1 className="text-sm font-semibold text-center mb-2 uppercase">Nouvelles collections</h1>

        {/* Description */}
        <p className="font-mono text-xs text-center max-w-2xl mx-auto mb-6">
          Découvrez les nouvelles collections Printemps-Été 2025 des plus belles
          marques de la mode enfant et bébé:{" "}
          <span className="text-xs font-mono font-normal">
            Billieblush, BOSS, Chloé, DKNY, Givenchy, HUGO, KARL LAGERFELD KIDS,
            KENZO Kids, Lanvin, Marc Jacobs, Michael Kors, Sonia Rykiel,
            Timberland et Zadig&Voltaire.
          </span>
        </p>

        {/* Filter Bar */}
        <div
          className={`w-full max-w-5xl flex justify-between items-center border-b border-gray-300 pb-2 transition-all duration-300 ease-in-out ${ 
            pathname.startsWith("/store") && isScrolling ? "fixed top-0 py-3 px-5 w-full bg-white bg-[url('/background.svg')] bg-cover bg-center shadow-md z-50" : ""
          }`}>
          <div className="flex space-x-6 text-xs font-normal">
            <span onClick={handleClearAllFilters} className="cursor-pointer">Tous</span>
            {Object.keys(dropdownData).map((key) => (
              <div key={key} className="relative">
                <span
                  className="cursor-pointer hover:uppercase hover:border-b-2 hover:border-black"
                  onClick={() => toggleDropdown(key)}
                >
                  {key}
                </span>
                {openDropdown === key && key !== "Prix" && renderDropdownList(dropdownData[key], key)}
                {openDropdown === "Prix" && key === "Prix" && (
                  <div className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-60 text-xs"
                    onMouseLeave={handleMouseLeave}
                  >
                    <span className="block font-semibold text-sm mb-2">Prix DT</span>
                    <input
                      type="range"
                      min="50"
                      max="1275"
                      value={rangeValue}
                      onChange={(e) => {
                        setRangeValue(e.target.value);
                        setMaxPrice(e.target.value);
                      }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm mx-2">de</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs"
                        min="50"
                        max={maxPrice - 1}
                      />
                      <span className="text-sm mx-2">à</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-xs"
                        min={minPrice + 1}
                        max="1275"
                      />
                      <button
                        onClick={handleApply}
                        className="ml-2 w-8 bg-black text-white py-1 text-xs rounded hover:bg-gray-800"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <span className="text-xs font-normal cursor-pointer hover:underline">2675 Produit(s)</span>
        </div>

        {/* Selected Filters */}
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedFilters.map((item, index) => (
            <Chip
              key={index}
              label={<span className="text-xs">{item.filter}</span>}
              variant="outlined"
              onDelete={() => handleDeleteFilter(item.filter)}
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
          {selectedFilters.length > 1 && (
            <Chip
              label={<span className="text-xs">Supprimer Tout</span>}
              variant="outlined"
              onDelete={handleClearAllFilters}
              sx={{ fontSize: '0.75rem', fontWeight: 'normal' }}
            />
          )}
        </div>
      </div>

      {/* Product List */}
      <NouveauteProductList products={filteredProducts} />
    </section>
  );
}