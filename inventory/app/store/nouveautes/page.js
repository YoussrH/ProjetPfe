"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import NouveauteProductList from "./NouveauteProductList";
import FilterBar from "@/app/components/Product/Filterbar";
import Breadcrumb from "@/app/components/Breadcrumb";

const NouveautesPage = () => {
  const pathname = usePathname() || "";
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch products from the database
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        const data = await response.json();

        // Fetch marque details for each product
        const productsWithMarque = await Promise.all(
          data.map(async (product) => {
            const marqueResponse = await fetch(
              `http://localhost:5000/api/marques/${product.marqueId}`
            );
            const marque = await marqueResponse.json();
            return { ...product, marque }; // Add marque details to the product
          })
        );

        setProducts(productsWithMarque);
        setFilteredProducts(productsWithMarque);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
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

  const applyFilters = (filters) => {
    let filtered = products;

    filters.forEach(({ category, filter }) => {
      if (category === "Prix") {
        // Handle price range filter
        filtered = filtered.filter(
          (product) => product.price >= filter.min && product.price <= filter.max
        );
      } else if (category === "Catégories") {
        // Handle category filter
        filtered = filtered.filter((product) => {
          const productCategory = product.category?.name || product.category; // Ensure category is accessible
          return productCategory && productCategory.includes(filter);
        });
      } else if (category === "Genres") {
        // Handle genre filter
        filtered = filtered.filter((product) => {
          const productGenre = product.genre?.name || product.genre; // Ensure genre is accessible
          return productGenre && productGenre.includes(filter);
        });
      } else if (category === "Tailles") {
        // Handle size filter
        filtered = filtered.filter((product) => {
          const productSizes = product.sizes || []; // Ensure sizes is an array
          return productSizes.includes(filter);
        });
      } else if (category === "Marques") {
        // Handle brand filter
        filtered = filtered.filter((product) => {
          const productBrand = product.marque?.name || product.marque; // Ensure brand is accessible
          return productBrand && productBrand.includes(filter);
        });
      } else if (category === "Couleurs") {
        // Handle color filter
        filtered = filtered.filter((product) => {
          const productColors = product.colors || []; // Ensure colors is an array
          return productColors.includes(filter);
        });
      }
    });

    setFilteredProducts(filtered);
  };

  return (
    <section>
      {/* Responsive Padding and Layout */}
         {/* Breadcrumb */}
        <Breadcrumb />  
        <div className="px-4 sm:px-6 lg:px-10 py-6 font-serif flex flex-col items-center">
   

        {/* Title Section */}
        <h1 className="text-sm sm:text-base font-semibold text-center mb-2 uppercase">
          Nouvelles collections
        </h1>

        {/* Description */}
        <p className="font-mono text-xs sm:text-sm text-center max-w-2xl mx-auto mb-6">
          Découvrez les nouvelles collections Printemps-Été 2025 des plus belles
          marques de la mode enfant et bébé:{" "}
          <span className="text-xs sm:text-sm font-mono font-normal">
            Billieblush, BOSS, Chloé, DKNY, Givenchy, HUGO, KARL LAGERFELD KIDS,
            KENZO Kids, Lanvin, Marc Jacobs, Michael Kors, Sonia Rykiel,
            Timberland et Zadig&Voltaire.
          </span>
        </p>

        {/* Filter Bar */}
        <FilterBar
          onFilterSelect={handleFilterSelect}
          onClearAllFilters={handleClearAllFilters}
          selectedFilters={selectedFilters}
          onDeleteFilter={handleDeleteFilter}
          totalProducts={products.length}
        />
      </div>

      {/* Product List */}
      <NouveauteProductList products={filteredProducts} />
    </section>
  );
};

export default NouveautesPage;