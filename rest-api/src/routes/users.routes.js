import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.Controller.js';
import { transfer , withdraw, deposit, balance} from '../controllers/transactionController.js';
import getUser from '../middlewares/getUser.js';
import routerAuth from  "./auth.route.js"

const router = Router();

router.use("/auth", routerAuth);
router.get('/users', getUsers);
router.post('/users',createUser);


router.post('/transfer',getUser,transfer);
router.post('/withdraw', getUser, withdraw);
router.post('/deposit', getUser, deposit);  
router.get('/balance', getUsers, balance );



export default router;