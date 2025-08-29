import type { Request, Response } from "express";
import { StoreTempUserAndSentOtpUC } from "../../../application/use-cases/user/auth/store-temp-user-and-send-otp.js";
import type { VerifyOtpAndCreateUserUC } from "../../../application/use-cases/user/auth/verify-otp-and-create-user.js";
import type { LoginUserUC } from "../../../application/use-cases/user/auth/login-user.js";
import logger from "../../../utils/logger.js";
import { env } from "../../../infrastructure/config/env.js";

export class AuthController {
  constructor(
    private storeTempUserAndSendOtpUC: StoreTempUserAndSentOtpUC,
    private verifyOtpAndCreateUserUC: VerifyOtpAndCreateUserUC,
    private loginUserUC: LoginUserUC
  ) {}

  register = async (req: Request, res: Response) => {
    console.log("User Register API hit");
    try {
      const result = await this.storeTempUserAndSendOtpUC.execute(req.body);
      // message:  "Verification code sent successfully!"
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
    }
  };

  verify = async (req: Request, res: Response) => {
    logger.debug("Verify Otp API hit");

    try {
      const { email, otp } = req.body;
      const result = await this.verifyOtpAndCreateUserUC.execute(email, otp);

      // extract access and refresh token to store it on http-only cookie then
      const { accessToken, refreshToken, user, message } = result;

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: env.jwt.access_expires, // 15 minutes
        sameSite: "strict",
        secure: env.node_env,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: env.jwt.refresh_expires, // 7 days
        sameSite: "strict",
        secure: env.node_env,
      });

      logger.info(`Created User data: ${JSON.stringify(user)} `);
      return res.status(201).json({ success: true, user, message });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`OTP verification failed: ${error.message}`);
        res.status(400).json({ success: false, message: error.message });
      }
    }
  };

  login = async (req: Request, res: Response) => {
    logger.info("login route hit");

    try {
      const result = await this.loginUserUC.execute(req.body);
      logger.info(`User login result: ${JSON.stringify(result)}`);

      const { accessToken, refreshToken, user, message } = result;

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: env.jwt.access_expires, // 15 minutes
        sameSite: "strict",
        secure: env.node_env,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: env.jwt.refresh_expires, // 7 days
        sameSite: "strict",
        secure: env.node_env,
      });

      res.status(200).json({ success: true, user, message });
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`Login error: ${e.message}`);
        res.status(400).json({ success: false, message: e.message });
      }
    }
  };
}
