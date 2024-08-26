import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: false
  },
<<<<<<< HEAD
=======
  // nombre: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
>>>>>>> b417405f923b4c2e6d06d02e70b4132bf66c85ba
  usuario: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1000000,  // Inicializamos el balance en 1000000
  },
}, {
  timestamps: false, 
});

export default User;