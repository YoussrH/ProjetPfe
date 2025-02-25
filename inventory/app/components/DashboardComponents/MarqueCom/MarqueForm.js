import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MarqueForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Le nom de la marque ne peut pas être vide.");
      return;
    }
  
    try {
      console.log("🔵 Sending request to API...");
      const response = await axios.post("http://localhost:5000/api/marques/ajouterMarque", { name });
      console.log("✅ API Response:", response.data);
      
      setName("");
      toast.success("Marque ajoutée avec succès !");
    } catch (error) {
      toast.error("Échec de l'ajout de la marque.");
      console.error("❌ API Error:", error);
    }
  };
  

  return (
    <form id="marque-form" onSubmit={handleSubmit} className="grid gap-4 font-sans">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nom
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-3"
          placeholder="Entrez le nom de la marque"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default MarqueForm;