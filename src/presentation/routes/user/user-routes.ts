import { Router } from "express";
import { register } from "../../controllers/user/auth-controller.js";

const router = Router()


router.post('/auth/register', register)


export default router;
