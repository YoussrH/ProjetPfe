"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer
      className="relative  py-10 px-10 bg-cover bg-center font-['Inter'] "
      style={{ backgroundImage: "url('/footerbg.png')" }} // Background Image
    >
      {/* Footer Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-black">
        {/* Newsletter Subscription */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold tracking-[2px] uppercase">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-700 text-xs mt-1">
            Stay updated with our latest collections and offers.
          </p>
          <div className="mt-3 flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-64 rounded-l-md border border-gray-400 outline-none text-sm"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md font-semibold text-sm hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="text-gray-700 space-y-1 text-xs">
              <li><a href="/" className="hover:text-black transition">Home</a></li>
              <li><a href="/collections" className="hover:text-black transition">Collections</a></li>
              <li><a href="/about" className="hover:text-black transition">About</a></li>
              <li><a href="/contact" className="hover:text-black transition">Contact</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-md font-semibold mb-2">Customer Support</h4>
            <ul className="text-gray-700 space-y-1 text-xs">
              <li><a href="/faq" className="hover:text-black transition">FAQ</a></li>
              <li><a href="/returns" className="hover:text-black transition">Returns & Exchanges</a></li>
              <li><a href="/shipping" className="hover:text-black transition">Shipping Information</a></li>
              <li><a href="/privacy" className="hover:text-black transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
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
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold mb-2">Contact Us</h4>
            <p className="text-gray-700 text-xs">--------Adresse-------</p>
            <p className="text-gray-700 text-xs mt-1">Email: Contact@bluegate.com.tn</p>
            <p className="text-gray-700 text-xs mt-1">Phone: (+216) 28 704 000 / 21 163 000</p>
          </div>
        </div>




        {/* Copyright */}
        <div className="mt-6 text-center text-gray-600 text-xs">
          &copy; {new Date().getFullYear()} BlueGate. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
