import { Router } from "express";
import homeRouter from "./home.route";
import authRouter from "./auth.route";
import userRouter from "./user.route";

const appRouter = Router();

appRouter.use("/home", homeRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter)

export default appRouter;