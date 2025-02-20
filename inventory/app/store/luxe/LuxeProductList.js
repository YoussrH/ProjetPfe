"use client";

import React, { useState } from "react";
import { GoHeart } from "react-icons/go";

const LuxeProductList = ({ products }) => {
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-52 h-64 object-contain rounded-sm my-5 "
                />

                <div className="-ml-5 justify-center">
                  {/* Nouveauté Badge */}
                <div className="w-full flex  justify-center mt-2">
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

                  {/* Achat Rapide and Favoris Buttons (Hidden by Default, Visible on Hover) */}
                  <div className=" -mt-10 relative inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="   flex space-x-1">
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
        <div className="flex justify-center items-center my-11  space-x-4">
               {/* Voir la Page Suivante Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-black text-white font-serif text-xs px-4 py-2 rounded-full hover:bg-white hover:border hover:border-black hover:text-black transition-all duration-300"
          >
            Voir la Page Suivante
          </button>
        </div>
         <div className="flex gap-3 font-mono mt-4 ">
             {/* Previous Page Arrow */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="text-gray-700 hover:text-black disabled:text-gray-300"
          >
            &lt;
          </button>

          {/* Pagination Numbers */}
          {totalPages > 5 ? (
            <>
              {/* Always show first 3 pages */}
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-xs font-serif ${
                    currentPage === page
                      ? "border border-black bg-white text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Dots when more than 5 pages */}
              <span>...</span>

              {/* Always show the last page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 text-xs font-serif ${
                  currentPage === totalPages
                    ? "border border-black bg-white text-black"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {totalPages}
              </button>
            </>
          ) : (
            // If 5 pages or fewer, show all pages
            Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-xs font-serif ${
                    currentPage === page
                      ? "border border-black bg-white text-black"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {page}
                </button>
              );
            })
          )}

          {/* Next Page Arrow */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="text-gray-700 hover:text-black disabled:text-gray-300"
          >
            &gt;
          </button>
         </div>
          
        </div>

     
      </div>
    </div>
  );
};

export default LuxeProductList;