"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNav from "./TopNav";
import { useRouter } from "next/navigation";
import SubmenuNouveautes from "./Submenu/SubmenuNouveautes";
import SubmenuPetitPrix from "./Submenu/SubmenuPetitPrix";
import SubmenuFille from "./Submenu/SubmenuFille";
import SubmenuGarçon from "./Submenu/SubmenuGarçon";
import SubmenuBebe from "./Submenu/SubmenuBebe";
import SubmenuChaussures from "./Submenu/SubmenuChaussures";
import SubmenuMarque from "./Submenu/SubmenuMarque";
import SubmenuOutlet from "./Submenu/SubmenuOutlet";
import SubmenuTendance from "./Submenu/SubmenuTendances";
import { CiCirclePlus } from "react-icons/ci";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  const timeoutRef = useRef(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true); // Show the new navigation bar
      } else {
        setIsScrolled(false); // Show the default navigation bar
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (menu) => {
    const route = menu
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[éèê]/g, "e")
      .replace("ô", "o")
      .replace("ç", "c"); // Handling special French characters
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="border-b border-gray-300">
        {/* Default Navigation */}
        {!isScrolled && (
          <>
            <TopNav onMenuClick={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
            <div className="mt-10 flex flex-col items-center">
              <nav className="hidden md:flex gap-6">
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
                    <h6
                      className={`cursor-pointer pb-1 text-xs lg:text-base ${
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
                    </h6>
                    {/* Tooltip on hover for specific items */}
                    {["Fille", "Garçon", "Bébé"].includes(item) && (
                      <span className="whitespace-nowrap absolute bottom-full left-1/2 -translate-x-1/2 mb-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
                        {item === "Bébé" ? "1-36 mois" : "2-16 ans"}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </>
        )}

        {/* New Navigation (Sticky on Scroll) */}
        {isScrolled && (
          <div className="sticky-nav">
            <div className="pt-5  flex items-center justify-between bg-white shadow-sm">
              {/* Logo Section */}
              <nav className="flex gap-6">
                <Link href="/">
                  <img src="/mgm1.svg" alt="mgm logo" className="h-9 pb-4 pl-10 mr-36 cursor-pointer" />
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
                      className={`cursor-pointer pb-1 text-sm ${
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
                <Image src="/cartnotselected.svg" alt="cart" width={30} height={30} className="cursor-pointer" />
                <Image src="/user.svg" alt="user" width={30} height={30} className="cursor-pointer" />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden flex flex-col gap-3 p-2 w-[288px] bg-white border-t text-xs border-gray-300 fixed top-20 left-0 h-screen z-50 overflow-x-hidden overflow-y-auto">
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
              "Luxe",
            ].map((item) => (
              <div key={item} className="relative group border-b border-gray-200 pb-2">
                <h5
                  className={`cursor-pointer pb-1 flex items-center justify-between text-xs sm:text-base`}
                  onClick={() => handleClick(item)}
                >
                  {item}
                  <CiCirclePlus className="text-gray-500" />
                </h5>
              </div>
            ))}
          </nav>
        )}

        {/* Submenus */}
        <SubmenuNouveautes
          isOpen={submenuOpen}
          onMouseEnter={() => handleMouseEnter("Nouveautés")}
          onMouseLeave={() => handleMouseLeave("Nouveautés")}
          isScrolled={isScrolled}
        />
        <SubmenuPetitPrix
          isOpen={petitPrixOpen}
          onMouseEnter={() => handleMouseEnter("PETITS PRIX")}
          onMouseLeave={() => handleMouseLeave("PETITS PRIX")}
          isScrolled={isScrolled}
        />
        <SubmenuFille
          isOpen={filleOpen}
          onMouseEnter={() => handleMouseEnter("Fille")}
          onMouseLeave={() => handleMouseLeave("Fille")}
          isScrolled={isScrolled}
        />
        <SubmenuGarçon
          isOpen={garconOpen}
          onMouseEnter={() => handleMouseEnter("Garçon")}
          onMouseLeave={() => handleMouseLeave("Garçon")}
          isScrolled={isScrolled}
        />
        <SubmenuBebe
          isOpen={bebeOpen}
          onMouseEnter={() => handleMouseEnter("Bébé")}
          onMouseLeave={() => handleMouseLeave("Bébé")}
          isScrolled={isScrolled}
        />
        <SubmenuChaussures
          isOpen={chaussuresOpen}
          onMouseEnter={() => handleMouseEnter("Chaussures")}
          onMouseLeave={() => handleMouseLeave("Chaussures")}
          isScrolled={isScrolled}
        />
        <SubmenuMarque
          isOpen={marquesOpen}
          onMouseEnter={() => handleMouseEnter("Marques")}
          onMouseLeave={() => handleMouseLeave("Marques")}
          isScrolled={isScrolled}
        />
        <SubmenuTendance
          isOpen={tendancesOpen}
          onMouseEnter={() => handleMouseEnter("Tendances")}
          onMouseLeave={() => handleMouseLeave("Tendances")}
          isScrolled={isScrolled}
        />
        <SubmenuOutlet
          isOpen={outletOpen}
          onMouseEnter={() => handleMouseEnter("Outlet")}
          onMouseLeave={() => handleMouseLeave("Outlet")}
          isScrolled={isScrolled}
        />
      </header>
    </>
  );
}