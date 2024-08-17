import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import bcrypt from 'bcrypt';

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: true,
    // set(value) {
    //   this.setDataValue('contraseña', bcrypt.hashSync(value, 10));
    // },
  },
  documento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false, 
});