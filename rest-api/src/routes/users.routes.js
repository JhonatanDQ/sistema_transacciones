import { Router } from 'express';
import { getUsers, createUser} from '../controllers/user.Controller.js';
// import { verifyToken } from '../middlewares/authMiddleware.js';


const router = Router();

// Public routes
router.get('/users', getUsers);
router.post('/users', createUser);
// router.post('/login', login);
router.get('/user/documento')
// router.get('/user/info', verifyToken ,getUserInfo)

export default router;
