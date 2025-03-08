"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiMenuKebab, CiCircleRemove } from "react-icons/ci";
import AuthModal from "../Auth/AuthModal";
import axios from "axios"; // Import Axios for API calls

const countries = [
  { name: "France", flag: "🇫🇷" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Spain", flag: "🇪🇸" },
];

export default function TopNav({ onMenuClick, isMobileMenuOpen }) {
  const dropdownRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userPrenom, setUserPrenom] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        console.log("User data response:", response.data); // Log the response data
        if (response.data.user) {
          setUserPrenom(response.data.user.prenom);
          setIsAuthenticated(true); // Set user as authenticated
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // User is not authenticated
          console.log("User is not authenticated"); // Log that the user is not authenticated
          setIsAuthenticated(false); // Set user as not authenticated
          setUserPrenom(""); // Clear user's first name
        } else {
          console.error("Failed to fetch user data:", error);
        }
      }
    };
  
    fetchUserData();
  }, []); // Empty dependency array to run only once on mount
  
  
  // Empty dependency array to run only once on mount
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false); // Set user as not authenticated
      setUserPrenom(""); // Clear user's first name
      window.location.reload(); // Refresh the page to reflect the logged-out state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <section className="relative w-full">
      <div className="grid grid-cols-3 items-center h-5 pt-2 px-2 sm:px-5 md:px-8">
        <div className="flex items-center gap-3">
          <Image src="/phone.svg" width={25} height={20} alt="phone" className="w-6 h-6 sm:w-7 sm:h-7" />
          <Link href="#" className="hidden md:inline text-sm font-serif">
            Service Client
          </Link>
        </div>

        <div className="flex-grow overflow-hidden text-center w-full">
          <div className="whitespace-nowrap text-sm text-gray-500 font-serif hidden md:flex animate-marquee-desktop">
            <span className="mx-5">Petits prix : -50% sur une sélection d'articles à prix rond !*</span>
            <span className="mx-5">Livraison offerte à partir de 150 DT d'achat</span>
          </div>

          <div className="whitespace-nowrap text-sm font-serif flex md:hidden overflow-hidden relative">
            <div className="animate-fade">
              <span className="mx-5">Livraison offerte à partir de 150 DT d'achat</span>
            </div>
            <div className="animate-fade">
              <span className="mx-5">Petits prix : -50% sur une sélection d'articles à prix rond !*</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex justify-end text-sm font-serif">
          <Link href="#">Nos Boutique</Link>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-3 items-center px-8 mt-2 py-3">
        <div className="relative">
          <div className="flex gap-2 items-center cursor-pointer p-2 rounded-md" onClick={toggleDropdown}>
            <h5 className="font-thin text-sm font-serif">Pays de livraison :</h5>
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="font-light tracking-[1.3px] text-sm font-serif">{selectedCountry.name}</span>
            <span className="tracking-[2px] text-sm font-serif">| FR</span>
          </div>

          {isOpen && (
            <div className="absolute z-50 left-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-md">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectCountry(country)}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <img src="/mgm1.svg" className="h-6 cursor-pointer " alt="Logo" />
          </Link>
        </div>

        <div className="flex justify-end gap-2">
          <Image src="/search.svg" alt="search" width={35} height={30} className="cursor-pointer" />
          <Image src="/wishlist.svg" alt="wishlist" width={35} height={30} className="cursor-pointer" />
          <Image src="/cartnotselected.svg" alt="cart" width={35} height={30} className="cursor-pointer" />
          <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsUserDropdownOpen(true)}
              onMouseLeave={() => setIsUserDropdownOpen(false)}
            >
              {/* User Icon */}
              <Image
                src="/user.svg"
                alt="user"
                width={35}
                height={30}
                className="cursor-pointer"
                onClick={() => !isAuthenticated && setIsAuthModalOpen(true)}
              />

              {/* Dropdown */}
              {isUserDropdownOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 z-50 bg-white border border-gray-300 rounded-md shadow-md">
                  <div className="px-4 py-2 text-sm">
                    <p className="font-semibold">Bonjour {userPrenom}</p>
                  </div>
                  <hr className="border-t border-gray-300" />
                  <Link href="/mes-commandes" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Mes commandes
                  </Link>
                  <Link href="/mes-infos" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Mes infos personnelles
                  </Link>
                  <Link href="/ma-liste" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Ma liste d'envies
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:hidden items-center max-w-80 py-2 px-2 mt-5 relative">
        <button className="absolute left-0 p-2" onClick={onMenuClick}>
          {isMobileMenuOpen ? (
            <CiCircleRemove className="cursor-pointer w-7 h-7 " />
          ) : (
            <CiMenuKebab className="cursor-pointer  w-7 h-7" />
          )}
        </button>

        <div className="flex justify-center ">
          <Link href="/">
            <img src="/mgm1.svg" className="h-4 cursor-pointer ml-5" alt="Logo" />
          </Link>
        </div>

        <div className="absolute right-7 flex items-center gap-1 pr-2">
          <Image src="/search.svg" alt="search" width={25} height={20} className="cursor-pointer" />
          <Image src="/wishlist.svg" alt="wishlist" width={25} height={20} className="cursor-pointer" />
          <Image src="/cart1.svg" alt="cart" width={25} height={20} className="cursor-pointer" />
          <Image src="/user.svg" alt="user" width={25} height={20} className="cursor-pointer" />
        </div>
      </div>

      {/* Conditionally render the AuthModal */}
      {!isAuthenticated && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </section>
  );
}