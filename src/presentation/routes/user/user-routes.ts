import { Router } from "express";
import { AuthController } from "../../controllers/user/auth-controller.js";
import { UserRepository } from "../../../infrastructure/repositories/user-repository.js";
import { PasswordHasher } from "../../../infrastructure/providers/password-hasher.js";
import { OtpStore } from "../../../infrastructure/providers/otp-service.js";
import { EmailService } from "../../../infrastructure/providers/email-service.js";
import { VerifyOtpAndCreateUserUC } from "../../../application/use-cases/user/auth/verify-otp-and-create-user.js";
import { StoreTempUserAndSentOtpUC } from "../../../application/use-cases/user/auth/store-temp-user-and-send-otp.js";
import { TokenService } from "../../../infrastructure/providers/token-service.js";

const userRouter = Router();

const userRepository = new UserRepository();
const passwordHasher = new PasswordHasher(); // Pass salt rounds(optional)
const otpService = new OtpStore();
const emailService = new EmailService();
const tokenService = new TokenService();
const storeTempUC = new StoreTempUserAndSentOtpUC(
  otpService,
  emailService,
  passwordHasher,
  userRepository,
);
const verifyOtpUC = new VerifyOtpAndCreateUserUC(
  otpService,
  passwordHasher,
  userRepository,
  tokenService,
);

const controller = new AuthController(storeTempUC, verifyOtpUC);

userRouter.post("/auth/register", controller.register);
userRouter.post("/auth/verify-otp", controller.verify);

export default userRouter;
