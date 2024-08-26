// models/Transaction.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import User from './User.js';


export const Transaction = sequelize.define('transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('deposit', 'withdraw', 'transfer'),
    allowNull: false,
  },
  userDocument: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'documento',
    },
  },
  recipientDocument: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'users',
      key: 'documento',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

// Relacionar modelos
User.hasMany(Transaction, { foreignKey: 'userDocument', as: 'sentTransactions' });
Transaction.belongsTo(User, { foreignKey: 'userDocument', as: 'user' });
Transaction.belongsTo(User, { foreignKey: 'recipientDocument', as: 'recipient' });

export default Transaction;
