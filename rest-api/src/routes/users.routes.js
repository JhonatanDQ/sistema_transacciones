import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.Controller.js';
import { transfer , withdraw, deposit } from '../controllers/transactionController.js';
import getUser from '../middlewares/getUser.js';

const router = Router();

<<<<<<< HEAD
router.get('/users', getUsers);
router.post('/users',createUser);
router.post('/transfer',getUser,transfer);
router.post('/withdraw', getUser, withdraw);
router.post('/deposit', getUser, deposit);
=======
router.get('/users', getUsers); 
router.post('/users', createUser); 
>>>>>>> b417405f923b4c2e6d06d02e70b4132bf66c85ba

export default router;
