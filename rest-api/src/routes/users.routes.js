import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.Controller.js';
// import { transfer, withdraw, deposit, balance } from '../controllers/transactionController.js';
// import getUser from '../middlewares/getUser.js';
// import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router();

// Public routes
router.get('/users', getUsers);
router.post('/users', createUser);
// router.post('/login', login);


export default router;
