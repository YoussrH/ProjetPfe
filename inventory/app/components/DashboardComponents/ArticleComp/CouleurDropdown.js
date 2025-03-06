"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const CouleurDropdown = ({ couleurs, selectedCouleurs, onCouleurChange, setCouleurs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCouleur, setNewCouleur] = useState("");

  // Handle adding a new color
  const handleAddCouleur = async () => {
    if (!newCouleur.trim()) {
      toast.error("Veuillez entrer un nom de couleur.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/couleurs/Ajoutercouleurs", {
        name: newCouleur,
      });

      setCouleurs((prevCouleurs) => [...prevCouleurs, response.data]); // Update color list
      setNewCouleur("");
      setIsModalOpen(false);
      toast.success("Couleur ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la couleur:", error);
      toast.error("Erreur lors de l'ajout de la couleur.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full font-sans">
            Sélectionner les couleurs
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 font-sans max-h-60 p-1 overflow-y-auto">
          <div className="sticky -top-1 pt-2 bg-white z-50">
            <DropdownMenuLabel>Couleurs disponibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </div>
          {couleurs.map((couleur) => (
            <DropdownMenuCheckboxItem
              key={couleur.id}
              checked={selectedCouleurs.includes(String(couleur.id))}
              onCheckedChange={(checked) => onCouleurChange(couleur.id, checked)}
            >
              {couleur.name}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <Button
            variant="ghost"
            className="w-full text-center font-sans"
            onClick={() => setIsModalOpen(true)}
          >
            Ajouter une couleur
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal for adding a new color */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-sans">Ajouter une nouvelle couleur</DialogTitle>
          </DialogHeader>
          <Input
            className="font-sans"
            type="text"
            placeholder="Nom de la couleur"
            value={newCouleur}
            onChange={(e) => setNewCouleur(e.target.value)}
          />
          <DialogFooter>
            <Button className="font-sans" onClick={handleAddCouleur}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CouleurDropdown;