"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios for API calls
import { ClipLoader } from "react-spinners"; // Import a loader component
import Breadcrumb from "@/app/components/Breadcrumb";
import MonProfil from "./account/edit/page";

export default function Account() {
  const [user, setUser] = useState({
    nom: "", // First name
    prenom: "", // Last name
    email: "",
    prefix: "", //
    newsletterSubscribed: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [activeSection, setActiveSection] = useState("dashboard"); // Track active section

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        console.log("User data response:", response.data); // Log the response data
        if (response.data.user) {
          setUser(response.data.user); // Set the entire user object in state
          setIsAuthenticated(true); // Set user as authenticated
        }
      } catch (error) {
        if (error.response?.status === 401) {
          // User is not authenticated
          console.log("User is not authenticated"); // Log that the user is not authenticated
          setIsAuthenticated(false); // Set user as not authenticated
        } else {
          console.error("Failed to fetch user data:", error);
        }
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };

    fetchUserData();
  }, []);

  const handleNewsletterChange = () => {
    setUser((prev) => ({ ...prev, newsletterSubscribed: !prev.newsletterSubscribed }));
  };

  // Handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Redirect or show a message if the user is not authenticated
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Accès refusé</h1>
        <p className="text-gray-700">
          Vous devez être connecté pour accéder à cette page.{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    );
  }

  // Show a loading state while fetching user data
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center">
        <ClipLoader color="#4A90E2" size={50} /> {/* Use a loader component */}
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
        <Breadcrumb/>
      <div className="container mx-auto text-xs p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-56 md:w-1/6 border h-80 border-black bg-gray-50 p-6 rounded-sm shadow-sm">
            <h6 className="text-sm font-semibold p-2">
              Bonjour, {user.prefix} {user.prenom}{/* Display full name */}
            </h6>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSectionChange("dashboard")}
                    className={`text-gray-800 hover:underline ${
                      activeSection === "dashboard" ? "font-semibold" : ""
                    }`}
                  >
                    Mon tableau de bord
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("profile")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "profile" ? "font-semibold" : ""
                    }`}
                  >
                    Mon profil
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("address-book")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "address-book" ? "font-semibold" : ""
                    }`}
                  >
                    Mon carnet d'adresses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("orders")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "orders" ? "font-semibold" : ""
                    }`}
                  >
                    Mes commandes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("returns")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "returns" ? "font-semibold" : ""
                    }`}
                  >
                    Mes retours
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("gift-cards")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "gift-cards" ? "font-semibold" : ""
                    }`}
                  >
                    Mes cartes cadeau
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("wishlist")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "wishlist" ? "font-semibold" : ""
                    }`}
                  >
                    Ma liste d'envies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("customer-service")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "customer-service" ? "font-semibold" : ""
                    }`}
                  >
                    Service Client
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionChange("newsletters")}
                    className={`text-gray-700 hover:underline ${
                      activeSection === "newsletters" ? "font-semibold" : ""
                    }`}
                  >
                    Newsletter
                  </button>
                </li>
                <li>
                  <button className="text-gray-700 hover:underline">Déconnexion</button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/5">
            {activeSection === "dashboard" && (
              <section className="mb-8 grid grid-cols-2 gap-6">
                {/* Left Section - Contact Information */}
                <div className="p-6">
                  <h6 className="text-sm font-semibold pb-4">Informations de contact</h6>
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() => handleSectionChange("profile")}
                      className="text-black border border-black p-2 hover:underline"
                    >
                      Éditer
                    </button>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">
                        {user.nom} {user.prenom} {/* Display full name */}
                      </span>
                    </p>
                    <p className="text-gray-700 mb-4">{user.email}</p>
                    <div className="flex gap-4">
                      <button className="text-black border border-black p-2 hover:underline">
                        Modifier le mot de passe
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Section - Newsletters */}
                <div className="p-6">
                  <h6 className="text-sm font-semibold pb-4">Newsletters</h6>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={user.newsletterSubscribed}
                      onChange={handleNewsletterChange}
                      className="form-checkbox h-5 w-5 text-black rounded-sm focus:ring-black focus:border-white"
                    />
                    <p className="text-gray-700">
                      {user.newsletterSubscribed
                        ? "Vous êtes abonné à notre newsletter."
                        : "Vous n'êtes abonné à aucune newsletter."}
                    </p>
                  </label>
                </div>
              </section>
            )}

            {activeSection === "profile" && (
              <section className="mb-8">
                <h6 className="text-sm font-semibold pb-4">Éditer le profil</h6>
                {/* Add your profile edit form here */}
                <MonProfil/>           
                  </section>
            )}

            {activeSection === "address-book" && (
              <section className="mb-8">
                <h6 className="text-sm font-semibold pb-4">Mon carnet d'adresses</h6>
                {/* Add your address book content here */}
                <p>Address book content goes here...</p>
              </section>
            )}

            {/* Add other sections similarly */}
          </main>
        </div>
      </div>
    </>
  );
}