import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import { calculateOtherLevelWorkers, checkIfWorkerWithEmailExists, checkIfWorkerWithIdExists, createWorkerSchema, updateWorkerSchema } from "../controllers/workers/request.js";
import { createWorker, fetchWorkers, updateWorker } from "../controllers/workers/worker.js";

const router = Router()

router.post('/', validation.body(createWorkerSchema), checkIfWorkerWithEmailExists, calculateOtherLevelWorkers, createWorker)
router.patch('/:id', validation.body(updateWorkerSchema), checkIfWorkerWithIdExists, calculateOtherLevelWorkers, updateWorker)
router.get('/', validation.query(), fetchWorkers)

export default router;