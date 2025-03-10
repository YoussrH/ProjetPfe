"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

const RemiseList = () => {
  const [remises, setRemises] = useState([]);

  useEffect(() => {
    const fetchRemises = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/remises/Allremises");
        setRemises(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des remises:", error);
      }
    };
    fetchRemises();
  }, []);

  return (
    <div>
      <h2>Liste des Remises</h2>
      <ul>
        {remises.map((remise) => (
          <li key={remise.id}>
            {remise.nom} - {remise.type} - {remise.valeur}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemiseList;