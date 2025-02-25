import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Échec du chargement des catégories.");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Le nom de la catégorie ne peut pas être vide.");
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/categories/ajouterCategorie", { name, parentId: parentId || null });
      setName("");
      setParentId("");
      toast.success("Catégorie ajoutée avec succès !");
    } catch (error) {
      toast.error("Échec de l'ajout de la catégorie.");
    }
  };

  return (
    <form id="category-form" onSubmit={handleSubmit} className="grid gap-4 font-sans">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nom
        </Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="parentCategory" className="text-right">
          Catégorie Parent
        </Label>
        <select
          id="parentCategory"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="col-span-3 p-2 border rounded"
        >
          <option value="">Aucune</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CategoryForm;
