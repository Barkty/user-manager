import Joi from "joi";
import { error } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import Worker from "../../models/worker.js";
import { BadRequestError, NotFoundError } from "../../utils/error/index.js";

export const createWorkerSchema = Joi.object({
    levelOne: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    street: Joi.string(),
    location: Joi.string(),
    iban: Joi.string().length(12),
    password: Joi.string().min(8),
    supervisor: Joi.string(),
    isSuperCommissionApproved: Joi.boolean()
})

export const updateWorkerSchema = Joi.object({
    levelOne: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    street: Joi.string(),
    location: Joi.string(),
    iban: Joi.string().length(12),
    supervisor: Joi.string(),
    isSuperCommissionApproved: Joi.boolean()
})

export const fetchWorkerSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    page: Joi.number().required(),
    limit: Joi.number().required()
})

export const generateFilter = (query) => {
    let filter = { deletedDate: null }

    if(query.name) {
        // eslint-disable-next-line prefer-template
        const regex = new RegExp(`${query.name}`, 'i');
        filter = { ...filter, firstName: { $regex: regex } }
    }
   
    if(query.email) {
        // eslint-disable-next-line prefer-template
        const regex = new RegExp(`${query.email}`, 'i');
        filter = { ...filter, email: { $regex: regex } }
    }

    return filter
}

export const populants = () => [
    {
        path: "supervisor"
    },
    {
        path: "levelOne"
    },
    {
        path: "levelTwo"
    },
]

export const checkIfWorkerWithEmailExists = asyncWrapper(async (req, res, next) => {
    try {
        const { body: { email } } = req
        const worker = await Worker.findOne({email}).lean()

        if (worker) {
            throw new BadRequestError('Worker with email already exist')
        }
        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

export const checkIfWorkerWithIdExists = asyncWrapper(async (req, res, next) => {
    try {
        const { params: { id } } = req
        const worker = await Worker.findById({_id: id}).lean()
        
        if (!worker) {
            throw new NotFoundError('Worker not found')
        }
        req.locals = {
            ...req.locals,
            worker
        }

        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

export const calculateOtherLevelWorkers = asyncWrapper(async (req, res, next) => {
    try {
        const { body: { levelOne } } = req
        
        const levelOneWorker = await Worker.findById({ _id: levelOne }).populate("levelOne")
        let levelTwoWorker = null
        let levelThreeWorker = null
        console.log({levelOneWorker})
        if (!levelOneWorker) {
            throw new NotFoundError('Worker not found')
        }
        
        if (levelOneWorker.levelOne) {
            levelTwoWorker = await Worker.findById({ _id: levelOneWorker.levelOne }).populate("levelOne")
        }
        
        if (levelTwoWorker?.levelOne) {
            levelThreeWorker = await Worker.findById({ _id: levelTwoWorker.levelOne }).populate("levelOne")
        }
        
        req.body.levelTwo = levelTwoWorker?.levelOne?._id || null
        
        req.body.levelThree = levelThreeWorker?._id || null
        
        return next()
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})