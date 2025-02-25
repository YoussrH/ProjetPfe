"use client";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CategoryForm from "./MarqueForm";
import MarqueForm from "./MarqueForm";

export default function MarqueFixedHeader({ label }) {
  return (
    <div className="flex sticky   top-0 border-b-2 justify-between items-center font-sans bg-white py-4 px-4">
      <h2>{label}</h2>

      <div className="flex gap-4 ">
        {/* New Category Button with Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] font-sans">
            <DialogHeader>
              <DialogTitle>Ajouter une Maruqe</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle Maruqe. Cliquez sur enregistrer une fois terminé.
              </DialogDescription>
            </DialogHeader>
            <MarqueForm />
            <DialogFooter>
              <Button type="submit" form="category-form">Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
