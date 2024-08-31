import express from 'express';
import userRoutes from './routes/users.routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import routerAuth from './routes/auth.routes.js'
import transactionRouter from './routes/transaction.routes.js'



const app = express();


//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(userRoutes)

app.use('/auth', routerAuth)
app.use ('/transaction',transactionRouter)

export default app;