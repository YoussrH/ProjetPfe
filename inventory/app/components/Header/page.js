"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import TopNav from "./pages";


import { useRouter } from "next/navigation";
export default function Header() {
  const router = useRouter();
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [petitPrixOpen, setPetitPrixOpen] = useState(false);
  const [filleOpen, setFilleOpen] = useState(false);
  const [garconOpen, setGarconOpen] = useState(false);
  const [bebeOpen, setBebeOpen] = useState(false);
  const [chaussuresOpen, setChaussuresOpen] = useState(false);
  const [marquesOpen, setMarquesOpen] = useState(false);
  const [tendancesOpen, setTendancesOpen] = useState(false);
  const [outletOpen, setOutletOpen] = useState(false);
  const [secondeMainOpen, setSecondeMainOpen] = useState(false);
  const [luxeOpen, setLuxeOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState("Accueil / Nouveautés");

 
  const timeoutRef = useRef(null);
  const handleClick = (menu) => {
    setBreadcrumb(`Accueil / ${menu}`);
    const route = menu
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[éèê]/g, "e")
      .replace("ô", "o")
      .replace("ç", "c"); // Handling special French characters
  
      console.log("Navigating to:", `/store/${route}`); // Debugging

      router.push(`/store/${route}`);  };
  
  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  
    switch (menu) {
      case "Nouveautés":
        setSubmenuOpen(true);
        break;
      case "PETITS PRIX":
        setPetitPrixOpen(true);
        break;
      case "Fille":
        setFilleOpen(true);
        break;
      case "Garçon":
        setGarconOpen(true);
        break;
      case "Bébé":
        setBebeOpen(true);
        break;
      case "Chaussures":
        setChaussuresOpen(true);
        break;
      case "Marques":
        setMarquesOpen(true);
        break;
      case "Tendances":
        setTendancesOpen(true);
        break;
      case "Outlet":
        setOutletOpen(true);
        break;
      case "| Luxe":
        setLuxeOpen(true);
        break;
      default:
        break;
    }
  };
  
  const handleMouseLeave = (menu) => {
    switch (menu) {
      case "Nouveautés":
        setSubmenuOpen(false);
        break;
      case "PETITS PRIX":
        setPetitPrixOpen(false);
        break;
      case "Fille":
        setFilleOpen(false);
        break;
      case "Garçon":
        setGarconOpen(false);
        break;
      case "Bébé":
        setBebeOpen(false);
        break;
      case "Chaussures":
        setChaussuresOpen(false);
        break;
      case "Marques":
        setMarquesOpen(false);
        break;
      case "Tendances":
        setTendancesOpen(false);
        break;
      case "Outlet":
        setOutletOpen(false);
        break;
      case "| Luxe":
        setLuxeOpen(false);
        break;
      default:
        break;
    }
  };
  

  const updateBreadcrumb = (newPath) => setBreadcrumb(`Accueil / ${newPath}`);

  return (
    <>
      <header className="px-10 border-b border-gray-300">
      <TopNav />
      <div className="mt-10 flex flex-col items-center">
      <nav className="  flex gap-6">
            {[
              "Nouveautés",
              "PETITS PRIX",
              "Fille",
              "Garçon",
              "Bébé",
              "Chaussures",
              "Marques",
              "Tendances",
              "Outlet",
              "SECONDE MAIN",
              "| Luxe",
            ].map((item) => (
              <div key={item} className="relative group">
                <h5
                  className={`cursor-pointer pb-1 font-serif ${
                    (item === "Nouveautés" && submenuOpen) ||
                    (item === "PETITS PRIX" && petitPrixOpen) ||
                    (item === "Fille" && filleOpen) ||
                    (item === "Garçon" && garconOpen) ||
                    (item === "Bébé" && bebeOpen) ||
                    (item === "Chaussures" && chaussuresOpen) ||
                    (item === "Marques" && marquesOpen) ||
                    (item === "Tendances" && tendancesOpen) ||
                    (item === "Outlet" && outletOpen) ||
                    (item === "SECONDE MAIN" && secondeMainOpen) ||
                    (item === "| Luxe" && luxeOpen)
                      ? "border-b-2 border-black"
                      : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={() => handleMouseLeave(item)}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </h5>
                {/* Tooltip on hover for specific items */}
                {["Fille", "Garçon", "Bébé"].includes(item) && (
                  <span className="whitespace-nowrap absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                    {item === "Bébé" ? "1-36 mois" : "2-16 ans"}
                  </span>
                )}
              </div>
            ))}
          </nav>


          {/* Submenu */}
          <div
            className={`absolute left-0 top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              submenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Nouveautés")}
            onMouseLeave={() => handleMouseLeave("Nouveautés")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-20">
              {/* Categories Section */}
              <div>
                <h4 className="font-bold font-serif mb-2 uppercase text-sm">Catégories</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Nouveautés Garçon")}>Nouveautés pour garçon</a></li>
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Nouveautés Fille")}>Nouveautés pour fille</a></li>
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Nouveautés Bébé")}>Nouveautés pour bébé</a></li>
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
                  <Image src="/DINA-VIOLET-1.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Femme</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Image src="/cargo-4.jpg" alt="Promo 2" width={350} height={50} className="rounded-lg h-96 shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Homme </h4>
                    <button className="relative top-40 mt-2 px-4 py-2 text-white font-normal rounded-full border border-white hover:text-black hover:bg-gray-300">
                      Découvrir Plus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PETITS PRIX Submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              petitPrixOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("PETITS PRIX")}
            onMouseLeave={() => handleMouseLeave("PETITS PRIX")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-20">
              {/* Categories Section */}
              <div>
                <h4 className="font-bold font-serif mb-2 uppercase text-sm">Catégories</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Petits Prix Garçon")}>Petits Prix Garçon</a></li>
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Petits Prix Fille")}>Petits Prix Fille</a></li>
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Petits Prix Bébé Garçon")}>Petits Prix Bébé Garçon</a></li>
                  <li><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb("Petits Prix Bébé Fille")}>Petits Prix Bébé Fille</a></li>
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
                  <Image src="/fille.jpg" alt="Sélection Fille" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Fille</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Image src="/Garcon.jpg" alt="Promo 2" width={350} height={50} className="rounded-lg h-96 shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Garçon </h4>
                    <button className="relative top-40 mt-2 px-4 py-2 text-white font-normal rounded-full border border-white hover:text-black hover:bg-gray-300">
                      Découvrir Plus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fille Submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              filleOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Fille")}
            onMouseLeave={() => handleMouseLeave("Fille")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-12">
              {/* Categories Section */}
              <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Vêtements</h4>
                  <ul className="space-y-2">
                    {[
                     " Tops et T-shirts",
                     " Chemises et blouses",
                    "  Robes",
                     " Pulls, sweats et gilets",
                      "Vestes et blousons",
                      "Jupes",
                      "Shorts",
                      "Pantalons et leggings",
                      "Ensembles et combinaisons",
                     " Maillots de bain",
                      "> Tous les vêtements",
                      ].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
                </div>

             
                {/* Accessoire Section */}
                <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Accessoires</h4>
                  <ul className="space-y-2">
                    {[
                      "Sacs, sacs à dos, cartables", "Casquettes, chapeaux, bobs", "Foulards, écharpes et snoods", "Sous-vêtements et pyjamas", "Ceintures", "Chaussettes, collants", "> Tous les accessoires", 
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
                  <Image src="/fille.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Fille</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>

                  </div>
                </div> 
              
                </div>
              </div>
          </div>
          {/* Garçon submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              garconOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Garçon")}
            onMouseLeave={() => handleMouseLeave("Garçon")}
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
          {/* Bébé submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              bebeOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Bébé")}
            onMouseLeave={() => handleMouseLeave("Bébé")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-12">
              {/* Categories Section */}
              <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Vêtements</h4>
                  <ul className="space-y-2">
                    {[
                     "Tops et T-shirts",
                     "Chemises et blouses",
                     "Bodys et pyjamas",
                     "Pulls et gilets",
                     "Combi-pilotes, blousons, manteaux",
                     "Ensembles",
                     "Robes et jupes",
                     "Shorts et bloomers",
                     "Pantalons et salopettes",
                     "Maillots de bains",
                     "> Tous les vêtements"].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
              </div>

             
                {/* Accessoire Section */}
                <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Accessoires</h4>
                  <ul className="space-y-2">
                    {["Sacs à langer, sacs",
                      "Biberons, tétines",
                      "Nids d'ange, turbulettes, couvertures","Bavoirs",
                      "Chapeaux, casquettes, bobs",
                      "Doudou",
                      "Chaussettes, collants",
                      "> Tous les accessoires"].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
                </div>
                   {/* Chaussures Section */}
                   <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Chaussures</h4>
                  <ul className="space-y-2">
                    {["Baskets", "Chaussons","> Toutes les chaussures"  
                    ].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
                </div>
                
                {/* Images */}
                <div className="flex gap-8">
                <div className="relative">
                  <Image src="/bebe.jpg" alt="Sélection Bebe" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Bebe</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>

                  </div>
                </div> 
              
                </div>
              </div>
          </div>
          {/*Chaussures submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              chaussuresOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Chaussures")}
            onMouseLeave={() => handleMouseLeave("Chaussures")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-12">
              {/* Categories Section */}
              <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Categories</h4>
                  <ul className="space-y-2">
                    {["Baskets", "Espadrilles, sandales et claquettes", "Mocassins", "Chaussons"].map((brand, index) => (
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
                  <Image src="/DINA-VIOLET-1.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30 text-white p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Femme</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>

                  </div>
                </div> 
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
          {/* Marque submenu */} 
          <div
            className={`absolute left-0   top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              marquesOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Marques")}
            onMouseLeave={() => handleMouseLeave("Marques")}
          >
            <div className="ml-60 w-[85%] p-6 flex gap-12">
            {/* Marques Section */}
                <div className="mr-48">
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
                  <Image src="/DINA-VIOLET-1.jpg" alt="Sélection Femme" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30  p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection Femme</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>

                  </div>
                </div> 
              
                </div>
                    {/* Images */}
                    <div className="flex gap-8">
                <div className="relative">
                  <Image src="/BRUNO-Blue-003-B-3.jpg" alt="Sélection BRUNO" width={350} height={50} className="h-96 rounded-lg shadow-md" />
                  <div className="absolute top-0 h-full left-0 right-0 bg-black bg-opacity-30  p-4 text-center">
                    <h4 className=" relative top-40 text-lg  font-normal">Sélection BRUNO</h4>
                    <button className=" hover:text-black  relative top-40 mt-2 px-4 py-2 text-black font-normal rounded-full border border-white hover:bg-gray-300">
                      Découvrir Plus
                    </button>

                  </div>
                </div> 
              
                </div>
              </div>
          </div>
          {/* Tendances submenu */}
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              tendancesOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Tendances")}
            onMouseLeave={() => handleMouseLeave("Tendances")}
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
          {/* Outlet submenu */} 
          <div
            className={`absolute left-0  top-44 w-full bg-white border border-gray-200 shadow-md transition-all duration-300 ease-in-out z-50 ${
              outletOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onMouseEnter={() => handleMouseEnter("Outlet")}
            onMouseLeave={() => handleMouseLeave("Outlet")}
          >
            <div className="mx-auto w-[85%] p-6 flex gap-12">
              {/* Categories Section */}
              <div className="mr-48">
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Catégories
</h4>
                  <ul className="space-y-2">
                    {["Outlet fille",
"Outlet bébé fille",
"Outlet garçon",
"Outlet bébé garçon"].map((brand, index) => (
                      <li key={index}><a href="#" className="hover:text-blue-600 font-light font-serif text-sm" onClick={() => updateBreadcrumb(brand)}>{brand}</a></li>
                    ))}
                  </ul>
              </div>

             
                {/* Accessoire Section */}
                <div>
                  <h4 className="font-bold font-serif mb-2 uppercase text-sm">Produits</h4>
                  <ul className="space-y-2">
                    {[
                    
                    "PARKAS, VESTES, MANTEAUX",
                    "PULLS, GILETS, CARDIGANS",
                    "T-SHIRTS, POLOS, SOUS-PULLS",
                    "CHEMISES, BLOUSES",
                    "PANTALONS, PANTACOURTS, LEGGINGS",
                    "ENSEMBLES, COMBINAISONS",
                    "ROBES",
                    ].map((brand, index) => (
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
         
          {/* Breadcrumb */}
         {/*  <div className="flex justify-center w-full  mt-3 mb-3">
            <span className=" mt-4 text-xs font-light tracking-[2px] text-gray-700">{breadcrumb}</span>
          </div> */}
        </div>
      </header>
    </>
  );
}
