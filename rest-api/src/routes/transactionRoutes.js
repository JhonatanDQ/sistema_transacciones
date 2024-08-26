// routes/transactionRoutes.js
import express from 'express';
import { transfer } from '../controllers/transactionController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/transfer', verificarToken, transfer);

export default router;
