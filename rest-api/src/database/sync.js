// database/sync.js
import { sequelize } from './database.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDatabase();
