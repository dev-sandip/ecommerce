import { Router } from "express";
import UserController from "../controllers/userController";

const userRouter = Router();
userRouter.get("/getAllUsers", UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.put("/:id", UserController.updateUser);
export default userRouter;
