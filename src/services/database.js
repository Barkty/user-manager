/* eslint-disable no-console */
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

mongoose.set('strictQuery', false);

const { DATABASE_URL, DATABASE_NAME } = process.env

/**
 * Connect to database
 */
export const connect = async (uri, dbName) => {
    if (mongoose.connection.readyState === 0) {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName
        });
        console.log("Connected to database");
    }
};


/**
 * Connect to other databases depending on environment
 */
export const connectDB = async (dbName = DATABASE_NAME) => {
    await connect(DATABASE_URL, dbName);
};

/**
 * Disconnect test database during teardowns
 */
export const disconnect = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
};

/**
 * Deletes all collections [it is meant for the test databases during teardowns]
 */
export const truncate = async () => {
    if (mongoose.connection.readyState !== 0) {
        const { collections } = mongoose.connection;
        const promises = Object.keys(collections).map((collection) =>
            mongoose.connection.collection(collection).deleteMany({})
        );
        await Promise.all(promises);
    }
};
