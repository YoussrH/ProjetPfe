"use client";

import { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import { usePathname } from "next/navigation";
import axios from "axios";

const FilterBar = ({ onFilterSelect, onClearAllFilters, selectedFilters, onDeleteFilter, totalProducts }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1275);
  const [rangeValue, setRangeValue] = useState(maxPrice);
  const pathname = usePathname() || "";
  const [isScrolling, setIsScrolling] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    Prix: { min: 50, max: 1275 },
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
      setIsScrolling(window.scrollY > 50);
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

  // Fetch tailles when selectedCategory or selectedGenre changes
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
          setSelectedCategory(selectedCat.id); // Set the parent category's ID
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
  
  // Fetch tailles when selectedCategory or selectedGenre changes
  useEffect(() => {
    if (!selectedCategory || !selectedGenre) return;
  
    console.log("Fetching tailles for category_id:", selectedCategory, "and genre_id:", selectedGenre); // Debugging
  
    const fetchTailles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tailles", {
          params: {
            category_id: selectedCategory, // This should be the subcategory's ID
            genre_id: selectedGenre,
          },
        });
  
        console.log("Fetched tailles:", response.data); // Debugging
  
        setDropdownData((prev) => ({
          ...prev,
          Tailles: response.data, // Store the full tailles objects
        }));
      } catch (error) {
        console.error("Error fetching tailles:", error);
        setDropdownData((prev) => ({
          ...prev,
          Tailles: [], // Set to empty array on error
        }));
      }
    };
  
    fetchTailles();
  }, [selectedCategory, selectedGenre]);
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

  // Handle filter selection

  // Render dropdown list
  const renderDropdownList = (items, title) => {
    console.log(`Rendering ${title} dropdown with items:`, items); // Debugging output

    if (title === "Tailles" || title === "Marques") {
      return (
        <div
          className="absolute bg-white border border-gray-300 mt-1 p-2 rounded-md shadow-lg z-50 w-48 max-h-40 overflow-y-auto"
          onMouseLeave={handleMouseLeave}
        >
          <span className="block font-semibold text-sm mb-2">{title}</span>
          <ul>
            {items.map((item, index) => (
              <li
                key={index} // Use index as the key for arrays of strings
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
          {items.map((item) => renderCategory(item))}
        </ul>
      </div>
    );
  };

  return (
    <header>
      <div
        className={`w-full max-w-5xl flex justify-between items-center border-b border-gray-300 pb-2 transition-all duration-300 ease-in-out ${
          pathname.startsWith("/store") && isScrolling
            ? "fixed left-52 top-0 py-3 px-5 w-full bg-white bg-[url('/background.svg')] bg-cover bg-center shadow-md z-50"
            : ""
        }`}
      >
        <div className="flex space-x-6 text-xs gap-7 font-normal">
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
        <span className="text-xs font-normal px-3 cursor-pointer hover:underline">
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