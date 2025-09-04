import { Router } from "express";
import { AuthDependencyContainer } from "../../../di/auth/auth-dependency-container.js";

const userRouter = Router();

const container = new AuthDependencyContainer();
const authController = container.createAuthController();

userRouter.post("/auth/register", authController.register);
userRouter.post("/auth/verify-otp", authController.verifyUser);
userRouter.post("/auth/login", authController.login);
userRouter.post("/auth/forgot-password", authController.forgotPassword);
userRouter.post("/auth/forgot-password/verify-otp", authController.verifyOtp);
userRouter.put("/auth/reset-password", authController.resetPassword);

export default userRouter;
