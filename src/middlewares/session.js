import expressSession from "express-session";
import MongoStore from "connect-mongo";

const { NODE_ENV, SESSION_SECRET, DATABASE_URL, DATABASE_NAME, SESSION_DB_COLLECTION } = process.env;

const options = {
    mongoUrl: DATABASE_URL,
    dbName: DATABASE_NAME,
    collectionName: SESSION_DB_COLLECTION,
    ttl: 20000,
    crypto: {
      secret: "squirrel"
    }
};

export const session = expressSession({
    name: "nomar",
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create(options),
    cookie: {
        sameSite: NODE_ENV === "development" ? "lax" : "none",
        secure: NODE_ENV !== "development",
        httpOnly: false,
        maxAge: 2 * 60 * 60 * 1000 // 2 hours,
    }
})