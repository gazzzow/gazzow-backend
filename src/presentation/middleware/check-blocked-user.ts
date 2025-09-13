import type { NextFunction, Request, Response } from "express";
import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IUserPublic } from "../../domain/entities/user.js";
import logger from "../../utils/logger.js";
import { AppError } from "../../utils/app-error.js";
import { UserStatus } from "../../domain/enums/user-role.js";

export interface ICheckBlockedUserMiddleware {
  isBlocked(req: Request, res: Response, next: NextFunction): void;
}

interface AuthRequest extends Request {
  user?: IUserPublic;
}

export class CheckBlockedUserMiddleware implements ICheckBlockedUserMiddleware {
  constructor(private userRepository: IUserRepository) {}

  isBlocked = async (req: AuthRequest, res: Response, next: NextFunction) => {
    logger.debug("is blocked middleware check");
    try {
      if (!req.user) {
        throw new AppError("Unauthorized: No user found", 403);
      }

      logger.debug(`req user data: ${JSON.stringify(req.user)}`);
      const { id } = req.user;
      logger.debug(`user id : ${id}`);
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new AppError("User not found", 404);
      }

      if (user.status === UserStatus.BLOCKED) {
        logger.warn(`Blocked user tried to access: ${req.user.email}`);
        throw new AppError("Access Denied: User is blocked!", 403);
      }
      return next();
    } catch (error) {
      logger.error("Error in CheckBlockedUser middleware:", error);
      next(error);
    }
  };
}
