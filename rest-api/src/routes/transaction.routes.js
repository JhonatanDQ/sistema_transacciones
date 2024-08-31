import { Router }  from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { transfer, withdraw, deposit, balance } from '../controllers/transactionController.js';


const router = Router();

// Protected routes
// router.use(verifyToken);
// router.get('/dashboard', verifyToken);
router.post('/transfer', verifyToken, transfer);
router.post('/withdraw', verifyToken, withdraw);
router.post('/deposit', verifyToken, deposit);
router.get('/balance', verifyToken, balance);


export default router;