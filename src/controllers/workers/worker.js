import { paginate } from "../../helpers/pagination.js";
import { error, success } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import Worker from "../../models/worker.js";
import { generateHashString } from "../../utils/index.js";
import { generateFilter } from "./request.js";

export const createWorker = asyncWrapper(async (req, res) => {
    try {
        const { body } = req

        body.password = generateHashString(body.password)

        let user = await new Worker(body).save()

        user = payload(user);

        return success(res, 201, user)

    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

export const updateWorker = asyncWrapper(async (req, res) => {
    try {
        const { body, params: { id } } = req

        const worker = await Worker.findByIdAndUpdate({ _id: id },  { $set: { ...body } }, { new: true })

        return success(res, 200, worker)
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

export const fetchWorkers = asyncWrapper(async (req, res) => {
    try {
        const { query: { page, limit } } = req

        const filter = generateFilter({ ...req.query });

        const modelName = "Worker";

        const options = { page, limit, filter, modelName, sort: { createdAt: -1 }, populate: populants() };

        const workers = await paginate(options);

        return success(res, 200, workers)
    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})