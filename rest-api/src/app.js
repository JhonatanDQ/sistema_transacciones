import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import bodyParser from 'body-parser';

const app = express();


//middlewares
app.use(express.json())
app.use(bodyParser.json())
=======
import userRoutes from './routes/users.routes.js';
import transactionRoutes from './routes/transactionRoutes.js'; // Importa las rutas de transacciones

const app = express();

// Middlewares
app.use(express.json());
>>>>>>> b417405f923b4c2e6d06d02e70b4132bf66c85ba
app.use(cors());

// Usar las rutas de usuarios
app.use('/api/users', userRoutes);

// Usar las rutas de transacciones
app.use('/api/transactions', transactionRoutes); // Asegúrate de que la ruta sea correcta

export default app;
