import { Router } from "express";
import { validation } from "../middlewares/validator";
import { checkIfWorkerWithEmailExists, createWorkerSchema } from "../controllers/workers/request";

const router = Router()

router.post('/', validation.body(createWorkerSchema), checkIfWorkerWithEmailExists, )

export default router;