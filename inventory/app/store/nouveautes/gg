"use client";

import React, { useState } from "react";
import { GoHeart } from "react-icons/go";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";

const NouveauteProductList = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Ensure products is defined before filtering
  const filteredProducts = (products || []).filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/3">
        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-2">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.id}
                className="relative group transition-all duration-300"
              >
                {/* Product Image */}
                <Link href={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-52 h-64 object-contain rounded-sm my-5 "
                />          </Link>       
              
                <div className="-ml-5 justify-center">
                  {/* Nouveauté Badge */}
                  <div className="w-full flex justify-center mt-2">
                    <div className="animate-bounce text-center border border-black text-white bg-black rounded-lg text-[10px] font-serif px-2 py-1">
                      <span>NOUVEAUTÉ</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="text-center mt-2">
                    <p className="text-gray-700 text-sm mt-2">
                      {product.brand}
                    </p>

                    {/* Product Name and Price */}
                    <div className="group-hover:opacity-0 transition-opacity duration-300">
                      <p className="text-gray-700 font-serif text-xs mt-2">
                        {product.name}
                      </p>
                      <p className="text-gray-900 font-serif text-xs font-semibold">
                        {product.price} €
                      </p>
                    </div>

                    {/* Achat Rapide and Favoris Buttons */}
                    <div className="-mt-10 relative inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-1">
                        <button className="bg-black border border-black text-white font-serif text-xs px-4 py-2 rounded-full flex items-center hover:bg-white hover:text-black transition-all duration-300">
                          Achat Rapide
                        </button>
                        <GoHeart className="w-5 h-5 cursor-pointer mt-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-4 text-center">
              No products match your filters.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end mt-8 mb-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              boundaryCount={2}            />
          </div>
        )}

      </div>
    </div>
  );
};

export default NouveauteProductList;
