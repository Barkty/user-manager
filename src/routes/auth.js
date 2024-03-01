import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import { loginSchema, validateUsersAuthRequest } from "../controllers/auth/request.js";
import { signIn, signOut } from "../controllers/auth/index.js";

const router = Router();

router.post('/signin', validation.body(loginSchema), validateUsersAuthRequest, signIn)
router.post('/signout', signOut)

export default router