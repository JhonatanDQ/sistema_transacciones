import { Login } from '../controllers/authController.js'
import { Register } from '../controllers/authController.js'
import { Router } from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/dashboard',verifyToken)

export default router;