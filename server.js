import compression from "compression";
import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import paginator from "mongoose-paginate-v2";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import authMiddleware from "./src/middlewares/authMidlleware"

dotenv.config();

paginator.paginate.options = { lean: true, leanWithId: false };
const { NODE_ENV, SESSION_SECRET, DATABASE_URL, SESSION_DB_NAME, SESSION_DB_COLLECTION } = process.env;

const app = express();
app.use(compression());
app.set("trust proxy", 1);
app.use(express.json({ limit: "3MB" }));
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

const getOrigin = (origin, callback) => {
  const allowedOrigin = !origin || ["localhost", ""].some((value) => origin.includes(value));
  if (allowedOrigin) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(helmet());

app.use(passport.authenticate("local"));

// Routes
app.use(`/api/`, authMiddleware, routes);