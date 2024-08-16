import express from 'express';
import jwt from 'jsonwebtoken';
import { withdraw, deposit, transfer } from '../controllers/transactionController.js';

const router = express.Router();

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

router.post('/withdraw', authenticate, withdraw);
router.post('/deposit', authenticate, deposit);
router.post('/transfer', authenticate, transfer);

export default router;
