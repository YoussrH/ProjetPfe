"use client"
import React, { useState } from "react";
import axios from "axios";

const CreateRemise = () => {
  const [remise, setRemise] = useState({
    nom: "",
    type: "pourcentage",
    valeur: 0,
    montant_minimum: 0,
    montant_maximum: 0,
    quantite: 0,
    code_promo: "",
    points_fidelite: 0,
    categorie_id: 0,
    genre_id: 0,
    taille_id: 0,
    date_debut: "",
    date_fin: "",
    est_actif: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRemise({ ...remise, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/remises/Createremises", remise);
      alert("Remise créée avec succès!");
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la création de la remise:", error);
    }
  };

  return (
    <div>
      <h2>Créer une Remise</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom:</label>
        <input type="text" name="nom" value={remise.nom} onChange={handleChange} required />

        <label>Type:</label>
        <select name="type" value={remise.type} onChange={handleChange}>
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

        <label>Valeur:</label>
        <input type="number" name="valeur" value={remise.valeur} onChange={handleChange} required />

        <label>Date de Début:</label>
        <input type="date" name="date_debut" value={remise.date_debut} onChange={handleChange} required />

        <label>Date de Fin:</label>
        <input type="date" name="date_fin" value={remise.date_fin} onChange={handleChange} required />

        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateRemise;