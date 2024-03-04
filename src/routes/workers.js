import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import { calculateOtherLevelWorkers, checkIfWorkerWithEmailExists, checkIfWorkerWithIdExists, createWorkerSchema, fetchWorkerSchema, updateWorkerSchema } from "../controllers/workers/request.js";
import { createWorker, fetchWorkers, updateWorker, fetchWorker } from "../controllers/workers/worker.js";

const router = Router()

router.post('/', validation.body(createWorkerSchema), checkIfWorkerWithEmailExists, calculateOtherLevelWorkers, createWorker)
router.patch('/:id', validation.body(updateWorkerSchema), checkIfWorkerWithIdExists, calculateOtherLevelWorkers, updateWorker)
router.get('/', validation.query(fetchWorkerSchema), fetchWorkers)
router.get('/:id', checkIfWorkerWithIdExists, fetchWorker)

export default router;