"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditArticleModal = ({ article, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: article.name,
    description: article.description,
    price: article.price,
    discount: article.discount,
    stock: article.stock,
    sku: article.sku,
    genreId: article.genreId,
    categoryId: article.categoryId,
    marqueId: article.marqueId,
    tailles: article.tailles,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure tailles is an array of valid integers
      const tailles = Array.isArray(formData.tailles)
        ? formData.tailles.map(id => parseInt(id)).filter(id => !isNaN(id))
        : [];
  
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        stock: parseInt(formData.stock),
        tailles, // Use the validated tailles array
      };
  
      console.log("Payload:", payload); // Debug the payload
      console.log("Tailles:", payload.tailles); // Debug the tailles array
  
      const response = await axios.put(`http://localhost:5000/api/articles/${article.id}`, payload);
      toast.success("Article modifié avec succès");
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("Échec de la modification de l'article");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modifier l'article</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Prix"
            required
          />
          <Input
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Remise (%)"
          />
          <Input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <Input
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SKU"
            required
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticleModal;