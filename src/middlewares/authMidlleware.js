import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { OPEN_ROUTES } from "../config/constants.js";
import { error } from "../helpers/response.js";
import Worker from "../models/worker.js";
import asyncWrapper from "./async.js";

configDotenv()

const { JWT_SECRET } = process.env

const validateUserToken = asyncWrapper(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) return error(res, 401, `No token provided`);
    const token = authHeader.split(" ")[1];
    if (!token) return error(res, 401, `No token provided`);
    const verify = jwt.verify(token, JWT_SECRET);
    const user = await Worker.findById({ _id: verify._id});
    if (!user) return error(res, 403, "Access Denied");
    req.user = user;
    return next();
})

const authMiddleware = asyncWrapper(async (req, res, next) => {
    const isOpenRoute = OPEN_ROUTES.some((route) => req.method === route.method && req.path === route.path);
    if (isOpenRoute) return next();
    if (!isOpenRoute) return validateUserToken(req, res, next);
    return error(res, 401, "You are not logged in");
});

export default authMiddleware