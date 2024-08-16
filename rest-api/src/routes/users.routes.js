import { Router } from "express";
import { getUser , createUser } from '../controllers/user.Controller.js';

const router = Router()

router.get('users', getUser)
router.post('users', createUser)
// router.post("users/:id")
// router.get("users/:id")

export default  router
