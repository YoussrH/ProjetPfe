const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("Utilisateur", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nom: { type: DataTypes.STRING, allowNull: false },
  prenom: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  otp: { type: DataTypes.STRING },
  otpExpires: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  newsletter: { type: DataTypes.BOOLEAN, defaultValue: false }, // Add newsletter field
  role: {
    type: DataTypes.ENUM("user", "admin", "super_admin"),
    defaultValue: "user",
  },
}, {
  tableName: "utilisateurs",
  timestamps: true,
});

module.exports = User;