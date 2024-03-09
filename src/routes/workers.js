import { Router } from "express";
import { validation } from "../middlewares/validator.js";
import WorkerValidator, { calculateOtherLevelWorkers, checkIfWorkerWithEmailExists, checkIfWorkerWithIdExists, fetchWorkerSchema } from "../controllers/workers/request.js";
import { createWorker, fetchWorkers, updateWorker, fetchWorker } from "../controllers/workers/worker.js";

const router = Router()

router.post('/', WorkerValidator.validateRegister, checkIfWorkerWithEmailExists, calculateOtherLevelWorkers, createWorker)
router.patch('/:id', WorkerValidator.validateUpdateWorker, checkIfWorkerWithIdExists, calculateOtherLevelWorkers, updateWorker)
router.get('/', validation.query(fetchWorkerSchema), fetchWorkers)
router.get('/:id', checkIfWorkerWithIdExists, fetchWorker)

export default router;