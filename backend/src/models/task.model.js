import mongoose, { mongo } from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    status: {
        type: String,
        enum: ["completed", "pending", "in-progress"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
    },
    dueDate: {
        type: Date
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    estimatedTime: {
        type: Number,
        default: 25,
    },
    timeSpent: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    tags: [{
        type: String,
        trim: true,
    }],
    isRecurring: {
        type: Boolean,
        default: false,
    },
    repeatInterval: {
        type: String,
        enum: ["none", "daily", "weekly", "monthly"],
        default: "none",
    },
    completedAt: {
        type: Date,
    }

}, {
    timestamps: true,
});

export const Task = mongoose.model("Task", taskSchema);