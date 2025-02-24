'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AjouterCategorie() {
  const [formData, setFormData] = useState({
    name: '',
  });
  
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', formData);
      setMessage('Catégorie ajoutée avec succès!');
      setFormData({ name: '' });
    } catch (error) {
      setMessage("Erreur lors de l'ajout de la catégorie");
    }
  };

  return (
    <section className="dark:bg-gray-900 p-6 sm:p-8 max-w-2xl mx-auto rounded-lg">
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="grid gap-6">
        <div>
          <label>Nom de la catégorie</label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-1/2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Ajouter
          </Button>
        </div>
      </form>
    </section>
  );
}
