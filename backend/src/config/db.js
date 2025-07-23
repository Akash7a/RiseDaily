import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:",error);
        process.exit(1);
    }
}