import express from 'express';
import userRoutes from './routes/users.routes.js'
import { json } from 'sequelize';
import cors from 'cors';

const app = express();


//middlewares
app.use(express.json())

app.use(cors());
app.use(userRoutes)


export default app;