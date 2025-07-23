import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({path:"./.env"});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// userRoutes
import { userRouter } from "./routes/user.route";

app.use("/api/v1/users",userRouter);

export default app;