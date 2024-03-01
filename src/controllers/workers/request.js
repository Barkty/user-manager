import Joi from "joi";
import { error } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import Worker from "../../models/worker.js";
import { BadRequestError } from "../../utils/error/index.js";
import { createCustomError } from "../../utils/error/index.js";
import { RESOURCE_ERROR_MESSAGE } from "../../config/constants.js";

export const createWorkerSchema = Joi.object({
    levelOne: Joi.number().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    street: Joi.string(),
    location: Joi.string(),
    iban: Joi.number().max(12),
    password: Joi.string().min(8)
})

export const checkIfWorkerWithEmailExists = asyncWrapper(async (req, res, next) => {
    try {
        const { body: { email } } = req
        const worker = await Worker.findOne({email}).lean()

        if (worker) {
            throw new BadRequestError('Worker with email already exist')
        }
        return next()
    } catch (e) {
        throw new createCustomError(RESOURCE_ERROR_MESSAGE('worker'), 500)
    }
})

export const calculateOtherLevelWorkers = asyncWrapper(async (req, res, next) => {
    try {
        const { body: { levelOne } } = req

        const levelOneWorker = await Worker.findById({ _id: levelOne }).populate("levelOne")

        const levelThreeWorker = await Worker.findById({ _id: levelOneWorker.levelOne.levelOne })

        req.body.levelTwo = levelOneWorker.levelOne.levelOne._id || null

        req.body.levelThree = levelThreeWorker._id || null

        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})