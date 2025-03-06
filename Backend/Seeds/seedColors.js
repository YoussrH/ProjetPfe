const Couleur = require("../models/couleurModel");

const seedColors = async () => {
  const colors = ["Rouge", "Bleu", "Vert", "Jaune", "Noir", "Blanc", "Gris"];

  for (const color of colors) {
    await Couleur.findOrCreate({ where: { name: color } });
  }
  console.log("Colors inserted!");
};

seedColors();

