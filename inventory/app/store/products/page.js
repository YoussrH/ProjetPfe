"use client";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

// Dummy Product Data
const products = [
  { id: 1, image: "/chemise1.jpg", name: "Chemise Classique", price: "DT 49.99", category: "MEN", colors: ["#000000", "#B22222", "#4169E1"], size: ["XS", "S", "M", "L"], tags: ["Casual", "Summer"] },
  { id: 2, image: "/chemise2.jpg", name: "Chemise Décontractée", price: "DT 54.99", category: "MEN", colors: ["#A52A2A", "#4B0082"], size: ["M", "L", "XL"], tags: ["Workwear"] },
  { id: 3, image: "/CRISTAL.jpg", name: "Jean Cristal", price: "DT 79.99", category: "MEN", colors: ["#1C1C1C"], size: ["XS", "S", "M"], tags: ["Denim", "Casual"] },
  { id: 4, image: "/CRISTAL1.jpg", name: "Jean Cristal Slim", price: "DT 84.99", category: "MEN", colors: ["#1C1C1C", "#808080"], size: ["M", "L"], tags: ["Slim Fit"] },
  { id: 5, image: "/CRISTAL2.jpg", name: "Jean Cristal Fit", price: "DT 89.99", category: "WOMEN", colors: ["#000000", "#808080", "#A9A9A9"], size: ["S", "M", "L", "XL"], tags: ["Trendy"] },
  { id: 6, image: "/CRISTAL3.jpg", name: "Jean Cristal Stretch", price: "DT 92.99", category: "WOMEN", colors: ["#2F4F4F", "#708090"], size: ["XS", "S", "M", "XL"], tags: ["Stretch", "Comfort"] },
  { id: 7, image: "/SAPHIR.jpg", name: "Jean Saphir", price: "DT 95.99", category: "KIDS", colors: ["#191970", "#4682B4"], size: ["M", "L", "XL", "2X"], tags: ["Denim", "Kidswear"] },
];

// Dummy Filters
const sizes = ["XS", "S", "M", "L", "XL", "2X"];
const availability = ["Available (450)", "Out Of Stock (18)"];
const categories = ["MEN", "WOMEN", "KIDS"];
const colors = ["#000000", "#B22222", "#4169E1", "#A52A2A", "#4B0082", "#1C1C1C"];
const priceRange = ["DT 0 - DT 50", "DT 50 - DT 100", "DT 100 - DT 150", "DT 150+"];
const tags = ["Casual", "Denim", "Slim Fit", "Stretch", "Trendy", "Workwear", "Summer"];

export default function ProductsPage() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null); // Tracks which filter section is open

  // Toggle Filter Dropdowns
  const toggleFilterDropdown = (filterName) => {
    setOpenFilter((prev) => (prev === filterName ? null : filterName));
  };

  // Handle Filter Selection
  const toggleFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (!updatedFilters[type]) updatedFilters[type] = [];

      if (updatedFilters[type].includes(value)) {
        updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      } else {
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      return updatedFilters;
    });
  };

  // Filtered Products Based on Selected Filters
  const filteredProducts = products.filter((product) => {
    if (selectedFilters.size?.length && !selectedFilters.size.some((size) => product.size.includes(size))) return false;
    if (selectedFilters.category?.length && !selectedFilters.category.includes(product.category)) return false;
    if (selectedFilters.tags?.length && !selectedFilters.tags.some((tag) => product.tags.includes(tag))) return false;
    return true;
  });

  return (
    <section className="flex px-10 mt-16 mb-44">
      {/* Left Sidebar - Filters */}
      <aside className="w-1/4 pr-10 border-r border-gray-300">
        <h3 className="text-xl font-light mb-4">Filters</h3>

        {/* Size Filter (Always Visible) */}
        <div className="mb-5">
          <h4 className="text-md font-normal mb-2">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleFilter("size", size)}
                className={`px-3 py-1 text-sm border rounded ${
                  selectedFilters.size?.includes(size) ? "bg-black text-white" : "border-gray-400 text-gray-700"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Filters */}
        <div className="space-y-4">
          {[
            { title: "Availability", items: availability, type: "availability" },
            { title: "Category", items: categories, type: "category" },
            { title: "Colors", items: colors, type: "colors" },
            { title: "Price Range", items: priceRange, type: "price" },
            { title: "Tags", items: tags, type: "tags" },
          ].map((filter) => (
            <div key={filter.title}>
              {/* Filter Header with Toggle */}
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleFilterDropdown(filter.title)}
              >
                <h4 className="text-md font-normal">{filter.title}</h4>
                {openFilter === filter.title ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>

              {/* Filter Content (Dropdown Items) */}
              {openFilter === filter.title && (
                <div className="pl-3 space-y-2 text-sm">
                  {filter.type === "colors" ? (
                    <div className="flex gap-2">
                      {filter.items.map((color, index) => (
                        <button
                          key={index}
                          className={`w-6 h-6 rounded-full border border-gray-400`}
                          style={{ backgroundColor: color }}
                          onClick={() => toggleFilter("colors", color)}
                        ></button>
                      ))}
                    </div>
                  ) : (
                    filter.items.map((item, index) => (
                      <label key={index} className="block text-gray-700">
                        <input type="checkbox" className="mr-2" onChange={() => toggleFilter(filter.type, item)} /> {item}
                      </label>
                    ))
                  )}
                </div>
              )}

              <hr className="border-gray-300 my-2" />
            </div>
          ))}
        </div>
      </aside>

      {/* Right Section - Product Display */}
       <div className="w-3/4 pl-10">
          
          <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Products</h3>
          <div className="flex items-center border border-gray-300 px-3 py-2 w-52 bg-[#D9D9D9]">
            <input type="text" placeholder="Search" className="outline-none w-full bg-transparent text-gray-700" onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="text-gray-600" />
          </div>
        </div>





        <div className="grid grid-cols-3 gap-6">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <img src={product.image} alt={product.name} className="w-full h-80 object-cover rounded-md" />
                <p className="text-gray-700 text-sm mt-2">{product.name}</p>
                <p className="text-gray-900 text-md font-semibold">{product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products match your filters.</p>
          )}
        </div>
      </div>
      
    </section>
  );
}
