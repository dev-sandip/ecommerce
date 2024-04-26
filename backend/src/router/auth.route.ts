import { Router } from "express";
import UserAuthController from "../controllers/authController";

const authRouter = Router();
authRouter.post("/register", UserAuthController.Register);
authRouter.post("/login", UserAuthController.Login);
authRouter.get("/logout", UserAuthController.logout);

export default authRouter;
