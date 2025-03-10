const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const Customer = sequelize.define("client", {
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  telephone: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
  mesCommandes: { type: DataTypes.STRING, defaultValue: "" },
  mesRetours: { type: DataTypes.STRING, defaultValue: "" },
  mesCartesCadeau: { type: DataTypes.STRING, defaultValue: "" },
  maListeEnvies: { type: DataTypes.STRING, defaultValue: "" },
  historiqueAchats: { type: DataTypes.JSON },
  pointsFidelite: { type: DataTypes.INTEGER, defaultValue: 0 },
  newsletter: { type: DataTypes.BOOLEAN, defaultValue: false },
  methodePaiement: { type: DataTypes.STRING },
  derniereConnexion: { type: DataTypes.DATE },
}, {
  tableName: "clients",
  timestamps: true,
});

// Define the relationship
User.hasOne(Customer, { foreignKey: "userId" });
Customer.belongsTo(User, { foreignKey: "userId" });

module.exports = Customer;