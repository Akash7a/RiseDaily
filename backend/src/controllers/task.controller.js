import { Task } from "../models/task.model.js";

const createTask = async (req, res) => {
    try {

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized request user not found" });
        }
        const {
            title,
            description,
            status,
            priority,
            startTime,
            endTime,
            estimatedTime = 25,
            timeSpent = 0,
            assignedTo = [],
            tags = [],
            createdBy,
            dueDate,
            isRecurring = false,
            repeatInterval = "none",
            completedAt,
        } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({
                success: false,
                message: "Title, description and status are required",
            });
        }

        const validStatus = ["completed", "pending", "in-progress"];
        const validPriority = ["low", "medium", "high", "urgent"];
        const validRepeat = ["none", "daily", "weekly", "monthly"];

        if (!validStatus.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid task status." });
        }
        if (!validPriority.includes(priority)) {
            return res.status(400).json({ success: false, message: "Invalid priority status." });
        }
        if (!validRepeat.includes(repeatInterval)) {
            return res.status(400).json({ success: false, message: "Invalid repeat interval." });
        }

        // const existingTask = await Task.findOne({title});

        // if(existingTask){
        //     return res.status(400).json({success:false,message:"task already exist with given title"});
        // }
        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            startTime,
            endTime,
            estimatedTime,
            timeSpent,
            createdBy: userId,
            assignedTo,
            tags,
            isRecurring,
            repeatInterval,
            completedAt,
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: newTask,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const fetchTask = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized request.User not found" });
        }

        const tasks = await Task.find({ createdBy: userId }).sort({ createdAt: - 1 })

        return res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(401).json({ success: false, message: "Task not found or unauthorized." });
        }
        const task = await Task.findOneAndDelete({ _id: id, createdBy: userId });

        if (!task) {
            return res.status(404).json({ success: false, message: "Taks not found or unauthorized." });
        }

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!id || !userId) {
            return res.status(401).json({ success: false, message: "Task not found or unauthorized." });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, createdBy: userId },
            { $set: req.body },
            { runValidators: true },
        );

        if (!task) {
            return res.status(401).json({ success: false, message: "Task not found or unauthorized." });
        }

        return res.status(200).json({ success: true, message: "Task updated successfully", task });

    } catch (error) {
        return res.status(500).json({ success: false, error, message: "Internal server error", error: error.message });
    }
}

export {
    createTask,
    fetchTask,
    deleteTask,
    updateTask,
}