import { User } from "../models/user.model.js";

const options = {
    httpOnly: true,
    secure: false, // process.env.NODE_ENV === "production",
    sameSite: "strict",
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if ([username, email, password].some((field) => !field)) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ $or: [{ username, email }] });

        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        const newUser = await User.create({
            username,
            email,
            password,
        });

        if (!newUser) {
            return res.status(500).json({ message: "User registration failed" });
        }

        const token = newUser.generateAuthToken();
        if (!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }

        return res
            .cookie("token", token, options)
            .status(201)
            .json({
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                },
                token,
            });

    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }

        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

        const isPasswordValid = user && await user.comparePassword(password);

        if (!user || !isPasswordValid) {
            return res.status(401).json({ message: "Invalid email/username or password" });
        }

        const token = user.generateAuthToken();

        if (!token) {
            return res.status(500).json({ message: "Token generation failed" });
        }

        return res
            .cookie("token", token, options)
            .status(200)
            .json({
                message: "User logged in successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt,
                },
                token,
            });
    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(400).json({ message: "No user is logged in" });
        }

        res.clearCookie("token", options);
        return res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const fetchUser = async (req, res) => {
    try {
        const id = req.user.id;

        if (!id) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(403).json({ message: "Unauthorized request" });
        }

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    fetchUser,
}