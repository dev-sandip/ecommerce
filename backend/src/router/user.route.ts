import { Router } from "express";
import UserController from "../controllers/userController";
import isAdmin from "../middlewares/adminMiddleware";
import { verifyToken } from "../utils/token-manager";

const userRouter = Router();
userRouter.get("/getAllUsers", verifyToken, isAdmin, UserController.getAllUsers);
userRouter.get("/:id", verifyToken, isAdmin, UserController.getUserById);
userRouter.delete("/:id", verifyToken, isAdmin, UserController.deleteUser);
userRouter.put("/:id", verifyToken, isAdmin, UserController.updateUser);
userRouter.put("/block-user/:id", verifyToken, isAdmin, UserController.blockUser);
userRouter.put("/unblock-user/:id", verifyToken, isAdmin, UserController.unblockUser);
export default userRouter;
