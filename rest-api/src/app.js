import express from 'express';
import userRoutes from './routes/users.routes.js'

const app = express();

//middlewares


app.use(userRoutes)

export default app;