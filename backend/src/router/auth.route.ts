import { Router } from "express";
import UserAuthController from "../controllers/authController";
const authRouter = Router();
//Create a new email user.
authRouter.post(
    "/register",
    UserAuthController.Register
);
authRouter.post("/login", UserAuthController.Login);

authRouter.get("/getAllUsers", UserAuthController.getAllUsers);
authRouter.get("/:id", UserAuthController.getUserById);
authRouter.delete("/:id", UserAuthController.deleteUser);
authRouter.put("/:id", UserAuthController.updateUser);

export default authRouter;