import express from 'express';
import userRoutes from './routes/users.routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import routerAuth from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js';
import cookieParser from 'cookie-parser';


const app = express();


//middlewares
app.use(express.json())
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:4200', // Tu frontend
    credentials: true, // Permitir envío de credenciales
}));

app.use(userRoutes)
app.use(cookieParser());

app.use('/auth', routerAuth)
app.use ('/transaction',transactionRoutes)

export default app;