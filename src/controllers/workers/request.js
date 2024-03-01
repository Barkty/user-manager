import Joi from "joi";
import { error } from "../../helpers/response";
import asyncWrapper from "../../middlewares/async";

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

export const calculateOtherLevelWorkers = asyncWrapper(async (req, res, next) => {
    try {
        const { body } = req

        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e, data)
    }
})