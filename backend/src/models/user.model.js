import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true,
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// 🔍 Compare entered password with hashed one
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 🔑 Generate JWT token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { id: this._id }, 
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const User = mongoose.model("User", userSchema);