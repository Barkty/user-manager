import { Router } from "express";
import { validation } from "../middlewares/validator";
import { createWorkerSchema } from "../controllers/workers/request";

const router = Router()

router.post('/', validation.body(createWorkerSchema), )

export default router;