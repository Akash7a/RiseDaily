import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production"
});