'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProductForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [finalPrice, setFinalPrice] = useState(0);

  const calculateFinalPrice = () => {
    const price = parseFloat(watch('price')) || 0;
    const discount = parseFloat(watch('discount')) || 0;
    setFinalPrice(price - (price * discount) / 100);
    setValue('finalPrice', finalPrice);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Ajouter un Produit</h2>
      <form className="space-y-4">
        {/* Informations de base */}
        <div>
          <label className="block text-sm font-medium">Nom du produit</label>
          <input {...register('name', { required: true })} className="w-full p-2 border rounded" placeholder="Ex: T-shirt Oversized" />
          {errors.name && <p className="text-red-500 text-sm">Champ requis</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register('description', { required: true })} className="w-full p-2 border rounded" placeholder="Détails sur le produit"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Catégorie</label>
            <select {...register('category')} className="w-full p-2 border rounded">
              <option>T-shirts</option>
              <option>Jeans</option>
              <option>Vestes</option>
              <option>Robes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Marque</label>
            <input {...register('brand')} className="w-full p-2 border rounded" placeholder="Ex: Nike, Adidas..." />
          </div>
        </div>

        {/* Prix & Remises */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Prix (TND)</label>
            <input {...register('price', { required: true })} type="number" className="w-full p-2 border rounded" onChange={calculateFinalPrice} />
          </div>
          <div>
            <label className="block text-sm font-medium">Réduction (%)</label>
            <input {...register('discount')} type="number" className="w-full p-2 border rounded" onChange={calculateFinalPrice} />
          </div>
          <div>
            <label className="block text-sm font-medium">Prix final</label>
            <input value={finalPrice.toFixed(2)} readOnly className="w-full p-2 border rounded bg-gray-200" />
          </div>
        </div>

        {/* Stock & Variantes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input {...register('stock', { required: true })} type="number" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">SKU</label>
            <input {...register('sku')} className="w-full p-2 border rounded" placeholder="ID unique" />
          </div>
        </div>

        {/* Images & Médias */}
        <div>
          <label className="block text-sm font-medium">Images</label>
          <input {...register('images')} type="file" multiple className="w-full p-2 border rounded" />
        </div>

        {/* SEO & Marketing */}
        <div>
          <label className="block text-sm font-medium">Titre SEO</label>
          <input {...register('seoTitle')} className="w-full p-2 border rounded" placeholder="Ex: Mode tendance 2025" />
        </div>
        <div>
          <label className="block text-sm font-medium">Mots-clés SEO</label>
          <input {...register('seoKeywords')} className="w-full p-2 border rounded" placeholder="Ex: mode, streetwear, tendances" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Ajouter le produit</button>
      </form>
    </div>
  );
}
