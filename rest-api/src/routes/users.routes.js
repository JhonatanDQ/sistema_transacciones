import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.Controller.js';
import { transfer , withdraw } from '../controllers/transactionController.js';
import getUser from '../middlewares/getUser.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users',createUser);
router.post('/transfer',getUser,transfer);
router.post('/withdraw', getUser, withdraw);


export default router;