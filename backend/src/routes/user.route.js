import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    fetchUser,
}
    from "../controllers/user.controller.js";
import { verifyAuthToken } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyAuthToken, logoutUser);
userRouter.route("/profile").get(verifyAuthToken,fetchUser);

export { userRouter }