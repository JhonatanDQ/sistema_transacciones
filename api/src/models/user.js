import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 1000000.00,  // Inicia con 1 millon
    },
});
