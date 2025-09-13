import type { NextFunction, Request, Response } from "express";
import type { UpdateUserProfileUC } from "../../../application/use-cases/user/profile/update-user-profile.js";
import logger from "../../../utils/logger.js";
import { AppError } from "../../../utils/app-error.js";
import type { IGetUserProfileUC } from "../../../application/use-cases/user/profile/get-user-profile.js";
import type { IUserPublic } from "../../../domain/entities/user.js";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

interface AuthRequest extends Request {
  user?: IUserPublic;
}

export class UserController {
  constructor(
    private updateUserProfileUC: UpdateUserProfileUC,
    private getUserProfileUC: IGetUserProfileUC
  ) {}

  updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    logger.debug("Update profile api hit🚀");
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      const profileData = req.body;

      const result = await this.updateUserProfileUC.execute(
        userId,
        profileData
      );

      return res.status(200).json(result);
    } catch (error) {
      logger.error("Update profile error:", {
        error: error instanceof Error ? error.message : error,
        userId: req.user?.id,
      });

      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  };

  getUserProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    logger.debug("Get user profile api hit🚀");
    try {
      const id = req.user?.id;
      if (!id) {
        throw new AppError("Invalid User Id");
      }

      logger.debug(`user id: ${id}`);

      const result = await this.getUserProfileUC.execute(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
