import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories(); // Load categories on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/categories", { name, parentId: parentId || null });
      setName("");
      setParentId("");
      fetchCategories(); // 🔥 Refresh categories after adding a new one
      toast.success("Category added successfully! ✅");
    } catch (error) {
      console.error("Error adding category", error);
      toast.error("Failed to add category ❌");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit}>
        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Parent Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Parent Category (Optional)</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          >
            <option value="">Choose from the list</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
