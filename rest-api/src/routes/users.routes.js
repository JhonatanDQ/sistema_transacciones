import { Router } from 'express';
import { getUsers, createUser} from '../controllers/user.Controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';


const router = Router();

// Public routes
router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/info', verifyToken , (req,res) => {
    res.send(req.User)
});


export default router;
