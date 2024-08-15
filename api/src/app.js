import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './models/index.js';
import authRoutes from './routes/auth.js';
import transactionRoutes from './routes/transaction.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);

sequelize.sync({ force: false }).then(() => {
    app.listen(3000, () => {
        console.log('Server running on http://localhost:4000');
    });
});
