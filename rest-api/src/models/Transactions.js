import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import User from './User.js'; 

export const Transaction = sequelize.define('Transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userDocument: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'documento',
    },
  },
  recipientDocument: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: User,
      key: 'documento',
    },
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

export default Transaction;
