import {Router} from "express";
import {createTask,deleteTask,fetchTask,updateTask} from "../controllers/task.controller.js";
import {verifyAuthToken} from "../middleware/auth.middleware.js";

const taskRouter = Router();

taskRouter.route("/create").post(verifyAuthToken,createTask);
taskRouter.route("/get").get(verifyAuthToken,fetchTask);
taskRouter.route("/delete/:id").delete(verifyAuthToken,deleteTask);
taskRouter.route("/update/:id").put(verifyAuthToken,updateTask);

export{
    taskRouter,
}