import { Router } from "express";
import { signIn, signOut } from "../controllers/auth/index.js";
import AuthValidator from "../controllers/auth/validator.js";

const router = Router();

router.post('/signin', AuthValidator.login, signIn)
router.post('/signout', signOut)

export default router