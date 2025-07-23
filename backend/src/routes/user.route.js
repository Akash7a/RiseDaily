import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
}
    from "../controllers/user.controller.js";
import { verifyToken } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyToken, logoutUser);

export { userRouter }