import { Router }  from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { transfer, withdraw, deposit, balance, getTransactionHistory, getLastDeposit, getLastWithdrawal, getLastTransfer} from '../controllers/transactionController.js';


const router = Router();

router.post('/transfer',verifyToken, transfer);
router.post('/withdraw',verifyToken,withdraw);
router.post('/deposit', verifyToken,deposit);
router.get('/balance', verifyToken, balance);
router.get('/history', verifyToken, getTransactionHistory); 
router.get('/last-deposit',verifyToken, getLastDeposit);
router.get('/last-withdraw',verifyToken, getLastWithdrawal)
router.get('/last-transfer',verifyToken, getLastTransfer)

export default router;