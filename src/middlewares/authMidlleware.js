import { OPEN_ROUTES } from "../config/constants.js";
import asyncWrapper from "./async.js";

const authMiddleware = asyncWrapper(async (req, res, next) => {
    const isOpenRoute = OPEN_ROUTES.some((route) => req.method === route.method && req.path === route.path);
    if (isOpenRoute) return next();
    if (req.isAuthenticated() && !req.user.isController) return next();
    return error(res, 401, "You are not logged in");
});

export default authMiddleware