import React from 'react'
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SubmenuNouveautes from './Submenu/SubmenuNouveautes';
import SubmenuPetitPrix from './Submenu/SubmenuPetitPrix';
import SubmenuFille from './Submenu/SubmenuFille';
import SubmenuGarçon from './Submenu/SubmenuGarçon';
import SubmenuBebe from './Submenu/SubmenuBebe';
import SubmenuChaussures from './Submenu/SubmenuChaussures';
import SubmenuMarque from './Submenu/SubmenuMarque';
import SubmenuTendance from './Submenu/SubmenuTendances';
import SubmenuOutlet from './Submenu/SubmenuOutlet';

export default function Heder() {
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
    router.push(`/store/${route}`);
  };

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






  return (
    <header className="px-10 border-b border-gray-300 bg-[url('/background.svg')] bg-cover bg-center py-2">
    <div className="pt-3 flex items-center justify-between">
      {/* Logo Section */}
      <nav className="flex gap-6">
        <Link href="/">
          <img src="/mgm1.svg" alt="mgm logo" className="h-9 pb-4 mr-28 cursor-pointer" />
        </Link>

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
              className={`cursor-pointer pb-1  text-sm ${
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
              <span className="whitespace-nowrap absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                {item === "Bébé" ? "1-36 mois" : "2-16 ans"}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div className="flex items-end gap-2 px-9 mb-2">
        <Image src="/search.svg" alt="search" width={30} height={30} className="cursor-pointer" />
        <Image src="/wishlist.svg" alt="wishlist" width={30} height={30} className="cursor-pointer" />
        <Image src="/cart1.svg" alt="cart" width={30} height={30} className="cursor-pointer" />
        <Image src="/user.svg" alt="user" width={30} height={30} className="cursor-pointer" />
      </div>
    </div>

    {/* Submenus */}
    <SubmenuNouveautes
      isOpen={submenuOpen}
      onMouseEnter={() => handleMouseEnter("Nouveautés")}
      onMouseLeave={() => handleMouseLeave("Nouveautés")}
    />
    <SubmenuPetitPrix
      isOpen={petitPrixOpen}
      onMouseEnter={() => handleMouseEnter("PETITS PRIX")}
      onMouseLeave={() => handleMouseLeave("PETITS PRIX")}
    />
    <SubmenuFille
      isOpen={filleOpen}
      onMouseEnter={() => handleMouseEnter("Fille")}
      onMouseLeave={() => handleMouseLeave("Fille")}
    />
    <SubmenuGarçon
      isOpen={garconOpen}
      onMouseEnter={() => handleMouseEnter("Garçon")}
      onMouseLeave={() => handleMouseLeave("Garçon")}
    />
    <SubmenuBebe
      isOpen={bebeOpen}
      onMouseEnter={() => handleMouseEnter("Bébé")}
      onMouseLeave={() => handleMouseLeave("Bébé")}
    />
    <SubmenuChaussures
      isOpen={chaussuresOpen}
      onMouseEnter={() => handleMouseEnter("Chaussures")}
      onMouseLeave={() => handleMouseLeave("Chaussures")}
    />
    <SubmenuMarque
      isOpen={marquesOpen}
      onMouseEnter={() => handleMouseEnter("Marques")}
      onMouseLeave={() => handleMouseLeave("Marques")}
    />
    <SubmenuTendance
      isOpen={tendancesOpen}
      onMouseEnter={() => handleMouseEnter("Tendances")}
      onMouseLeave={() => handleMouseLeave("Tendances")}
    />
    <SubmenuOutlet
      isOpen={outletOpen}
      onMouseEnter={() => handleMouseEnter("Outlet")}
      onMouseLeave={() => handleMouseLeave("Outlet")}
    />
  </header>
  )
}
