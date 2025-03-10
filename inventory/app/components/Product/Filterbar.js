"use client";

import { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Slider } from "@/components/ui/slider";

const FilterBar = ({ onFilterSelect, onClearAllFilters, selectedFilters, onDeleteFilter, totalProducts }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [minPrice, setMinPrice] = useState(10); // Default min price
  const [maxPrice, setMaxPrice] = useState(300); // Default max price
  const pathname = usePathname() || "";
  const [isScrolling, setIsScrolling] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    Prix: { min: 10, max: 300 }, // Updated price range
    Genres: [],
    Catégories: [],
    Tailles: [],
    Marques: [],
    Couleurs: [],
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 380);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch dropdown data (Genres, Categories, Marques, Couleurs)
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [genres, categories, marques, couleurs] = await Promise.all([
          fetch("http://localhost:5000/api/genres").then((res) => res.json()),
          fetch("http://localhost:5000/api/categories").then((res) => res.json()),
          fetch("http://localhost:5000/api/marques").then((res) => res.json()),
          fetch("http://localhost:5000/api/couleurs").then((res) => res.json()),
        ]);

        // Organize categories hierarchically
        const organizedCategories = organizeCategories(categories);

        setDropdownData((prev) => ({
          ...prev,
          Genres: genres,
          Catégories: organizedCategories, // Use organized categories
          Marques: marques, // Marques is an array of strings
          Couleurs: couleurs.map((c) => c.name),
        }));
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []);

  // Handle filter selection
  const handleFilterSelect = (category, filterName) => {
    if (category === "Catégories") {
      // Find the selected category or subcategory
      const selectedCat = dropdownData.Catégories.find(
        (cat) => cat.name === filterName || cat.subcategories.some((sub) => sub.name === filterName)
      );

      if (selectedCat) {
        // If the selected item is a subcategory, set the parent category's ID
        const subcategory = selectedCat.subcategories.find((sub) => sub.name === filterName);
        if (subcategory) {
          setSelectedCategory(subcategory.id); // Set the parent category's ID
        } else {
          setSelectedCategory(selectedCat.id); // Set the main category's ID
        }
      } else {
        setSelectedCategory(null); // Reset if no match is found
      }
    } else if (category === "Genres") {
      const selectedGen = dropdownData.Genres.find((gen) => gen.name === filterName);
      setSelectedGenre(selectedGen ? selectedGen.id : null); // Store the ID
    }

    onFilterSelect(category, filterName);
  };

  // Handle price range change
  const handlePriceRangeChange = () => {
    onFilterSelect("Prix", { min: minPrice, max: maxPrice });
  };

  // Handle range slider change
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(Math.min(Number(value), maxPrice)); // Ensure minPrice doesn't exceed maxPrice
    } else if (name === "maxPrice") {
      setMaxPrice(Math.max(Number(value), minPrice)); // Ensure maxPrice doesn't go below minPrice
    }
  };

  // Helper function to organize categories hierarchically
  const organizeCategories = (categories) => {
    const categoryMap = {};
    const rootCategories = [];

    // Create a map of categories
    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, subcategories: [] }; // Initialize subcategories as an empty array
    });

    // Build the hierarchy
    categories.forEach((category) => {
      if (category.parentId) {
        categoryMap[category.parentId].subcategories.push(categoryMap[category.id]);
      } else {
        rootCategories.push(categoryMap[category.id]);
      }
    });

    return rootCategories;
  };

  // Toggle dropdown visibility
  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // Render dropdown list
  const renderDropdownList = (items, title) => {
    console.log(`Rendering ${title} dropdown with items:`, items); // Debugging output

    // Ensure items is always an array
    const safeItems = Array.isArray(items) ? items : [];

      if (title === "Prix") {
        return (
          <div
            className="absolute bg-white border border-gray-300 mt-1 p-4 rounded-md shadow-lg z-50 w-64"
            onMouseLeave={handleMouseLeave}
          >
            <span className="block font-semibold text-sm mb-2">{title}</span>
            <div className="flex flex-col space-y-4">
              {/* ShadCN Slider */}
              <Slider
                value={[minPrice, maxPrice]}
                onValueChange={(value) => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                }}
                min={10}
                max={300}
                step={1}
                className="w-full"
              />
    
              {/* Input Fields */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                  className="w-20 p-1 border border-gray-300 rounded-md text-xs"
                  placeholder="Min"
                  min="10"
                  max="300"
                />
                <span className="text-xs text-gray-500">to</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                  className="w-20 p-1 border border-gray-300 rounded-md text-xs"
                  placeholder="Max"
                  min="10"
                  max="300"
                />
              </div>
    
              {/* Apply Button */}
              <button
                onClick={handlePriceRangeChange}
                className="bg-black text-white text-xs px-3 py-1 rounded-md hover:bg-gray-800 transition-colors"
              >
                Appliquer
              </button>
            </div>
          </div>
        );
      }

    if (title === "Tailles" || title === "Marques" || title === "Couleurs") {
      return (
        <div
          className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48 max-h-40 overflow-y-auto"
          onMouseLeave={handleMouseLeave}
        >
          <span className="block font-semibold text-sm mb-2">{title}</span>
          <ul>
            {safeItems.map((item, index) => (
              <li
                key={typeof item === "string" ? item : item.id || index} // Use item name or ID as the key
                className="text-xs py-1 cursor-pointer hover:bg-gray-100 px-2"
                onClick={() => handleFilterSelect(title, typeof item === "string" ? item : item.name)}
              >
                {typeof item === "string" ? item : item.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    // Render hierarchical categories for "Catégories"
    const renderCategory = (category) => (
      <div key={category.id}>
        {/* Main category in bold */}
        <div
          className="text-xs py-1 cursor-pointer hover:bg-gray-100 px-2 font-bold"
          onClick={() => handleFilterSelect(title, category.name)}
        >
          {category.name}
        </div>
        {/* Subcategories in normal text */}
        {(category.subcategories || []).map((subcategory) => (
          <div
            key={subcategory.id} // Use subcategory.id as the key
            className="text-xs py-1 cursor-pointer hover:bg-gray-100 px-2 pl-4"
            onClick={() => handleFilterSelect(title, subcategory.name)}
          >
            {subcategory.name}
          </div>
        ))}
      </div>
    );

    return (
      <div
        className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48 max-h-40 overflow-y-auto"
        onMouseLeave={handleMouseLeave}
      >
        <span className="block font-semibold text-sm mb-2">{title}</span>
        <ul>
          {safeItems.map((item) => renderCategory(item))}
        </ul>
      </div>
    );
  };

  return (
    <header>
    <div
      className={`w-full max-w-7xl flex justify-between items-center border-b border-gray-300 pb-2 transition-all duration-300 ease-in-out ${
        pathname.startsWith("/store") && isScrolling
          ? "fixed left-32 top-0 py-3 px-5 w-full bg-white bg-[url('/background.svg')] bg-cover bg-center shadow-md z-50 " // Reduced gap on scroll
          : "mr-96" // Default gap
      }`}
    >
      <div className={`flex space-x-6 text-xs gap-2 font-normal `}>
        <span onClick={onClearAllFilters} className="cursor-pointer">
          Tous
        </span>
        {Object.keys(dropdownData).map((key) => (
          <div key={key} className="relative">
            <span
              className="cursor-pointer hover:uppercase hover:border-b-2 hover:border-black"
              onClick={() => toggleDropdown(key)}
            >
              {key}
            </span>
            {openDropdown === key && renderDropdownList(dropdownData[key], key)}
          </div>
        ))}
      </div>
      <span className="text-xs font-normal  cursor-pointer hover:underline">
        {totalProducts} Produit(s) {/* Display the total number of products */}
      </span>
    </div>
  
    {/* Selected Filters */}
    <div className="flex flex-wrap gap-2 mt-3">
      {selectedFilters.map((item, index) => (
        <Chip
          key={index}
          label={<span className="text-xs">{item.filter}</span>}
          variant="outlined"
          onDelete={() => onDeleteFilter(item.filter)}
          sx={{ fontSize: "0.75rem" }}
        />
      ))}
      {selectedFilters.length > 1 && (
        <Chip
          label={<span className="text-xs">Supprimer Tout</span>}
          variant="outlined"
          onDelete={onClearAllFilters}
          sx={{ fontSize: "0.75rem", fontWeight: "normal" }}
        />
      )}
    </div>
  </header>
  
  );
};

export default FilterBar;