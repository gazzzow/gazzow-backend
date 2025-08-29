import { Router } from "express";
import { AuthDependencyContainer } from "../../../di/auth/auth-dependency-container.js";

const userRouter = Router();

const container = new AuthDependencyContainer();
const authController = container.createAuthController();

userRouter.post("/auth/register", authController.register);
userRouter.post("/auth/verify-otp", authController.verify);
userRouter.post("/auth/login", authController.login);

export default userRouter;
