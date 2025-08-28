import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import type { ITokenService } from "../../application/providers/token-service.js";
import type { IUserPublic } from "../../domain/entities/user.js";

export class TokenService implements ITokenService {
  async createAccessToken(payload: IUserPublic): Promise<string> {
    return jwt.sign(payload, env.jwt.access_secret as string, {
      expiresIn: env.jwt.access_expires,
    });
  }

  async createRefreshToken(payload: IUserPublic): Promise<string> {
    return jwt.sign(payload, env.jwt.refresh_secret as string, {
      expiresIn: env.jwt.refresh_expires,
    });
  }

  async verifyAccessToken(token: string): Promise<IUserPublic> {
    return jwt.verify(token, env.jwt.access_secret as string) as IUserPublic;
  }

  async verifyRefreshToken(token: string): Promise<IUserPublic> {
    return jwt.verify(token, env.jwt.refresh_secret as string) as IUserPublic;
  }
}
