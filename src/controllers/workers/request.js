import Joi from "joi";
import { error } from "../../helpers/response";
import asyncWrapper from "../../middlewares/async";
import Worker from "../../models/worker";
import { BadRequestError } from "../../utils/error.js";
import { createCustomError } from "../../utils/error/index.js";
import { RESOURCE_ERROR_MESSAGE } from "../../config/constants.js";

export const createWorkerSchema = Joi.object({
    id: Joi.number().required(),
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
        const { body } = req
        // Check if a worker with email exists
        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e, data)
    }
})