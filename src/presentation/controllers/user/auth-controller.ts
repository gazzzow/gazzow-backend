import type { Request, Response } from "express";

import { StoreTempUserAndSentOtpUC } from "../../../application/use-cases/user/auth/store-temp-user-and-send-otp.js";
import type { VerifyOtpAndCreateUserUC } from "../../../application/use-cases/user/auth/verify-otp-and-create-user.js";

export class AuthController {
  constructor(
    private storeTempUserAndSendOtpUC: StoreTempUserAndSentOtpUC,
    private verifyOtpAndCreateUserUC: VerifyOtpAndCreateUserUC
  ) {}

  register = async (req: Request, res: Response) => {
    console.log("User Register API hit");
    try {
      const result = await this.storeTempUserAndSendOtpUC.execute(req.body);
      res.status(200).json({ success: true, message: result });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  };

  verify = async (req: Request, res: Response) => {
    console.log("Verify Otp API hit");

    try {
      const { email, otp } = req.body;

      const result = await this.verifyOtpAndCreateUserUC.execute(email, otp);
      
      // extract access and refresh token to store it on http-only cookie then
      const { accessToken, refreshToken, message, ...data } = result;

      return res.status(201).json({ success: true, message });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
