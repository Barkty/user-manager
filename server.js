import compression from "compression";
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import paginator from "mongoose-paginate-v2";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import authMiddleware from "./src/middlewares/authMidlleware.js"
import notFound from './src/middlewares/notFound.js';
import errorHandlerMiddleware from './src/middlewares/errorHandler.js';
import { corsOptions } from "./src/middlewares/cors.js";
import routes from "./src/routes/index.js"

dotenv.config();

paginator.paginate.options = { lean: true, leanWithId: false };

const app = express();
app.use(compression());
app.set("trust proxy", 1);
app.use(express.json({ limit: "3MB" }));
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(helmet());

app.use(passport.authenticate("local"));

// Routes
app.use(`/api/`, authMiddleware, routes);

// Use middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);

export default server