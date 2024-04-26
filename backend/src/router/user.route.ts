import { Router } from "express";
import UserController from "../controllers/userController";
import isAdmin from "../middlewares/adminMiddleware";
import { verifyToken } from "../utils/token-manager";

const userRouter = Router();
userRouter.get("/getAllUsers", verifyToken, isAdmin, UserController.getAllUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.delete("/:id", UserController.deleteUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.put("/block-user/:id", UserController.blockUser);
userRouter.put("/unblock-user/:id", UserController.unblockUser);
export default userRouter;
