import { Router }  from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { transfer, withdraw, deposit, balance, getTransactionHistory } from '../controllers/transactionController.js';


const router = Router();

router.post('/transfer',verifyToken, transfer);
router.post('/withdraw',verifyToken,withdraw);
router.post('/deposit', verifyToken,deposit);
router.get('/balance', verifyToken, balance);
router.get('/history', verifyToken, getTransactionHistory); 


export default router;