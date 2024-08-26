import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.Controller.js';
import { transfer , withdraw, deposit } from '../controllers/transactionController.js';
import getUser from '../middlewares/getUser.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users',createUser);
router.post('/transfer',getUser,transfer);
router.post('/withdraw', getUser, withdraw);
router.post('/deposit', getUser, deposit);


export default router;