import { Router } from "express";
import UserController from "../controllers/userController";
import { verifyToken } from "../utils/token-manager";

const userRouter = Router();
userRouter.get("/getAllUsers", verifyToken, UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.put("/:id", UserController.updateUser);
export default userRouter;
