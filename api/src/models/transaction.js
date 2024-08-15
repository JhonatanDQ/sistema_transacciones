import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { User } from './user.js';

export const Transaction = sequelize.define('Transaction', {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});
    
// Relaciones
User.hasMany(Transaction);
Transaction.belongsTo(User);
