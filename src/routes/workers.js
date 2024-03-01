import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import { calculateOtherLevelWorkers, checkIfWorkerWithEmailExists, createWorkerSchema } from "../controllers/workers/request.js";
import { createWorker } from "../controllers/workers/worker.js";

const router = Router()

router.post('/', validation.body(createWorkerSchema), checkIfWorkerWithEmailExists, calculateOtherLevelWorkers, createWorker)

export default router;