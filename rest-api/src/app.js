import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';
import transactionRoutes from './routes/transactionRoutes.js'; // Importa las rutas de transacciones

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Usar las rutas de usuarios
app.use('/api/users', userRoutes);

// Usar las rutas de transacciones
app.use('/api/transactions', transactionRoutes); // Asegúrate de que la ruta sea correcta

export default app;
