"use client";
import { Facebook, Instagram, Twitter, Youtube, Pinterest } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <>
    <div className="relative">
      <footer
        className="relative py-10 px-10 bg-cover bg-center font-['Inter']"
        style={{ backgroundImage: "url('/footerbg.png')" }} // Image de fond
      >
        {/* Contenu du footer */}
        <div className="relative z-10 max-w-6xl mx-auto text-black">
          {/* Inscription à la newsletter */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold tracking-[2px] uppercase">
              Inscrivez-vous à la newsletter
            </h3>
            <p className="text-gray-700 text-xs mt-1">
              -10% sur la première commande et plein d'autres SURPRISES !
            </p>
            <div className="mt-3 flex justify-center">
              <input
                type="email"
                placeholder="Ici votre adresse mail"
                className="px-3 py-2 w-64 rounded-l-md border border-gray-400 outline-none text-sm" />
              <button className="bg-black text-white px-4 py-2 rounded-r-md font-semibold text-sm hover:bg-gray-800 transition">
                OK
              </button>
            </div>
          </div>

          {/* Sections du footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {/* À Propos */}
            <div>
              <h4 className="text-md font-semibold mb-2">À Propos</h4>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li><a href="/" className="hover:text-black transition">BGM Boutique</a></li>
                <li><a href="/qui-sommes-nous" className="hover:text-black transition">Qui sommes-nous ?</a></li>
                <li><a href="/boutiques" className="hover:text-black transition">Nos boutiques</a></li>
                <li><a href="/contact" className="hover:text-black transition">Nous contacter</a></li>
                <li><a href="/conditions-offres" className="hover:text-black transition">Conditions des offres</a></li>
                <li><a href="/green-around" className="hover:text-black transition">Green Around</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-md font-semibold mb-2">Services</h4>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li><a href="/seconde-main" className="hover:text-black transition">Seconde main</a></li>
                <li><a href="/les-reparables" className="hover:text-black transition">Les Réparables</a></li>
                <li><a href="/livraisons-retours" className="hover:text-black transition">Livraisons et retours</a></li>
                <li><a href="/paiement-securise" className="hover:text-black transition">Paiement sécurisé</a></li>
                <li><a href="/faq" className="hover:text-black transition">Questions fréquentes</a></li>
                <li><a href="/guide-tailles" className="hover:text-black transition">Guide des tailles</a></li>
              </ul>
            </div>

            {/* Infos légales */}
            <div>
              <h4 className="text-md font-semibold mb-2">Infos légales</h4>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li><a href="/mentions-legales" className="hover:text-black transition">Mentions légales</a></li>
                <li><a href="/cgv" className="hover:text-black transition">CGV</a></li>
                <li><a href="/donnees-personnelles" className="hover:text-black transition">Données personnelles</a></li>
                <li><a href="/cookies" className="hover:text-black transition">Cookies</a></li>
                <li><a href="/lexique-textile" className="hover:text-black transition">Lexique textile</a></li>
              </ul>
            </div>

            {/* Suivez-nous */}
            <div>
              <h4 className="text-md font-semibold mb-2">Suivez-nous</h4>
              <div className="flex justify-center md:justify-start space-x-3 mt-2">
                <a href="#" className="text-gray-700 hover:text-black transition">
                  <Instagram className="h-5" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition">
                  <Twitter className="h-5" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition">
                  <Facebook className="h-5" />
                </a>
                <a href="#" className="text-gray-700 hover:text-black transition">
                  <Youtube className="h-5" />
                </a>

              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 text-center text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} BGM Boutique. Tous droits réservés.
          </div>
        </div>
      </footer>

      <div className="bg-black  py-3">
        <span className="mx-6 text-sm font-normal  text-white">TED CLARNE'S</span>
        <span className="mx-6 text-sm font-normal text-white">BOSS</span>
        <span className="mx-6 text-sm font-normal text-white">TLILA</span>
        <span className="mx-6 text-sm font-normal text-white">O'Spella</span>
        <span className="mx-6 text-sm font-normal text-white">HUGO</span>
        <span className="mx-6 text-sm font-normal text-white">P'TIT FRIMEUR</span>
        <span className="mx-6 text-sm font-normal text-white">GIVENCHY PARIS</span>
        <span className="mx-6 text-sm font-normal text-white">LANVIN</span>
        <span className="mx-6 text-sm font-normal text-white">CHLOÉ</span>
        <span className="mx-6 text-sm font-normal text-white">KENZO</span>
      </div>


    </div></>
  );
}
