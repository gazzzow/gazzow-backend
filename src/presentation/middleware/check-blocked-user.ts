import type { NextFunction, Request, Response } from "express";
import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IUserPublic } from "../../domain/entities/user.js";
import logger from "../../utils/logger.js";

export interface ICheckBlockedUserMiddleware {
  isBlocked(req: Request, res: Response, next: NextFunction): void ;
}

interface AuthRequest extends Request {
  user?: IUserPublic;
}

export class CheckBlockedUserMiddleware implements ICheckBlockedUserMiddleware {
  constructor(private userRepository: IUserRepository) {}

   isBlocked =async (req: AuthRequest, res: Response, next: NextFunction) => {
    logger.debug("is blocked middleware check");
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized: No user found" });
      }
      logger.debug(`req user data: ${JSON.stringify(req.user)}`)
      const { id } = req.user;
      logger.debug(`user id : ${id}`)
      const user = await this.userRepository.findById(id);
      if(!user){
        throw new Error('User not found')
      }

      if (user.status === "blocked") {
        logger.warn(`Blocked user tried to access: ${req.user.email}`);
        return res
          .status(403)
          .json({ success: false, message: "Access Denied: User is blocked!" });
      }
       return next();
    } catch (error) {
      logger.error("Error in CheckBlockedUser middleware:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}
