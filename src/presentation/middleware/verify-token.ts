import type { NextFunction, Request, Response } from "express";
import type { ITokenService } from "../../application/providers/token-service.js";
import type { IUserPublic } from "../../domain/entities/user.js";
import logger from "../../utils/logger.js";
import { env } from "../../infrastructure/config/env.js";

interface AuthRequest extends Request {
  user?: IUserPublic;
}

export class VerifyToken {
  constructor(private tokenService: ITokenService) {}

  verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { accessToken, refreshToken } = req.cookies; // token from httpOnly cookie
      // logger.info(`access token extracted from cookie: ${accessToken}`)

      if (!accessToken && refreshToken) {
        const decodedRefreshToken =
          await this.tokenService.verifyRefreshToken(refreshToken);

        if (!decodedRefreshToken) {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid refresh token" });
        }
        const payload: IUserPublic = {
          id: decodedRefreshToken.id,
          email: decodedRefreshToken.email,
          name: decodedRefreshToken.name,
          role: decodedRefreshToken.role,
          createdAt: decodedRefreshToken.createdAt,
        };
        logger.info(`Refresh token extracted data: ${JSON.stringify(payload)}`);

        // Generate new access token
        const newAccessToken =
          await this.tokenService.createAccessToken(payload);

        // set new access token cookie
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: env.jwt.access_expires, // 15 minutes
          sameSite: "strict",
          secure: env.node_env,
        });

        req.user = payload;
        return next();

      } else if (!accessToken && !refreshToken) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const decoded = await this.tokenService.verifyAccessToken(accessToken);
      // logger.info(`decoded token data: ${JSON.stringify(decoded)}`)

      req.user = decoded; 

      return next();
    } catch (err) {
      logger.error("JWT verification failed:", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
}
