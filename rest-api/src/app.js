import express from 'express';
import userRoutes from './routes/users.routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import routerAuth from './routes/auth.routes.js'
import transactionRoutes from './routes/transaction.routes.js';


const app = express();


//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));
app.use(userRoutes)

app.use('/auth', routerAuth)
app.use ('/transaction',transactionRoutes)
app.use('/user', userRoutes)

export default app;