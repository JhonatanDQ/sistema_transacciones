import express from 'express';
import userRoutes from './routes/users.routes.js'
import { json } from 'sequelize';

const app = express();

//middlewares
app.use(express.json())


app.use(userRoutes)

export default app;