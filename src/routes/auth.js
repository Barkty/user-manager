import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import { loginSchema } from "../controllers/auth/request.js";
import { signIn, signOut } from "../controllers/auth/index.js";

const router = Router();

router.post('/signin', signIn)
// router.post('/signin', validation.body(loginSchema), signIn)
router.post('/signout', signOut)

export default router