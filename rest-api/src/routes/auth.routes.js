import { Login, logout } from '../controllers/authController.js'
import { Register } from '../controllers/authController.js'
import { Router } from 'express';



const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/logout', logout)


export default router;