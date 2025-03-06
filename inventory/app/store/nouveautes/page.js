// app/store/nouveautes/page.js
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
        filtered = filtered.filter(product => product.price >= filter.min && product.price <= filter.max);
      } else {
        filtered = filtered.filter(product => {
          const productValue = product[category.toLowerCase()];
          return productValue && productValue.includes(filter.split(" ")[0]);
        });
      }
    });

    setFilteredProducts(filtered);
  };

/*   const segments = pathname
    .split("/")
    .filter((segment) => segment && segment !== "store");
 */
  return (
    <section>
      <div className="px-10 py-6 font-serif flex flex-col items-center">
        {/* Breadcrumb */}
        {/* <div className="border border-gray-300 px-4 py-1 text-gray-500 text-sm mb-4 rounded-md">
          <span className="text-gray-500">Accueil</span>
          {segments.map((segment, index) => {
            const formattedSegment = segment.replace(/-/g, " ");
            const isLast = index === segments.length - 1;
            return (
              <span key={index} className="text-gray-500">
                {" / "}
                <span className={isLast ? "font-semibold" : "hover:underline cursor-pointer"}>
                  {formattedSegment.charAt(0).toUpperCase() + formattedSegment.slice(1)}
                </span>
              </span>
            );
          })}
        </div> */}
        <Breadcrumb/>

        {/* Title Section */}
        <h1 className="text-sm font-semibold text-center mb-2 uppercase">Nouvelles collections</h1>

        {/* Description */}
        <p className="font-mono text-xs text-center max-w-2xl mx-auto mb-6">
          Découvrez les nouvelles collections Printemps-Été 2025 des plus belles
          marques de la mode enfant et bébé:{" "}
          <span className="text-xs font-mono font-normal">
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
          totalProducts={products.length} // Pass the total number of products
        />
      </div>

      {/* Product List */}
      <NouveauteProductList products={filteredProducts} />
    </section>
  );
};

export default NouveautesPage;