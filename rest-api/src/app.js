import express from 'express';
import userRoutes from './routes/users.routes.js'
import { json } from 'sequelize';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();


//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors());
app.use(userRoutes)


export default app;