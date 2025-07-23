import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyAuthToken = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided,please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Invalid token,please login again" });
        }
        req.user = user;
        next();
    } catch (error) {
       return res.status(401).json({ message: "Unauthorized", error });
    }
}