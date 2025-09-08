import type { Request, Response } from "express";
import logger from "../../../utils/logger.js";
import { AdminLoginUC } from "../../../application/use-cases/admin/auth/login.js";

export class AdminAuthController {
  constructor(private adminLoginUC: AdminLoginUC) {}

  login = async (req: Request, res: Response) => {
    logger.debug("Admin login api hit🚀");

    try {
      const { email, password } = req.body;

      const result = this.adminLoginUC.execute(email, password);
      return res.status(200).json(result);

    } catch (error) {
      if (error instanceof Error) {
        logger.error(`error admin login: ${error.message}`);
        return res.status(400).json({success: false, message: error.message})
      }
    }
  };
}
