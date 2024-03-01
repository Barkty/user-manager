import { error, success } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import Worker from "../../models/worker";

export const createWorker = asyncWrapper(async (req, res) => {
    try {
        const { body } = req

        let user = await new Worker(body).save()

        user = payload(user);

        return success(res, 201, user)

    } catch (e) {
        return error(res, e?.statusCode || 500, e)
    }
})

