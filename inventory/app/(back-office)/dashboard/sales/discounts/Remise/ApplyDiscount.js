"use client"
import React, { useState } from "react";
import axios from "axios";

const ApplyDiscount = () => {
  const [formData, setFormData] = useState({
    type: "pourcentage",
    price: 100,
    quantity: 1,
    customerPoints: 0,
    promoCode: "",
    categoryId: 0,
    genreId: 0,
    tailleId: 0,
  });
  const [finalPrice, setFinalPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/remises/apply-discount", formData);
      setFinalPrice(response.data.finalPrice);
    } catch (error) {
      console.error("Erreur lors de l'application de la remise:", error);
    }
  };

  return (
    <div>
      <h2>Appliquer une Remise</h2>
      <form onSubmit={handleSubmit}>
        <label>Type de Remise:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="pourcentage">Pourcentage</option>
          <option value="montant_fixe">Montant Fixe</option>
          <option value="quantite">Quantité</option>
          <option value="cumulatif">Cumulatif</option>
          <option value="code_promo">Code Promo</option>
          <option value="fidelite">Fidélité</option>
          <option value="premier_achat">Premier Achat</option>
          <option value="deuxieme_article_moitie_prix">2ème Article à -50%</option>
          <option value="bogo">Buy X Get Y Free</option>
          <option value="taille">Taille</option>
          <option value="categorie">Catégorie</option>
          <option value="genre">Genre</option>
          <option value="categorie_genre">Catégorie et Genre</option>
          <option value="categorie_genre_taille">Catégorie, Genre et Taille</option>
        </select>

        <label>Prix:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Quantité:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

        <button type="submit">Appliquer</button>
      </form>

      {finalPrice !== null && (
        <div>
          <h3>Prix Final: {finalPrice}€</h3>
        </div>
      )}
    </div>
  );
};

export default ApplyDiscount;