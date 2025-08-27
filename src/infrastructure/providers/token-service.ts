import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import type {
  ITokenPayload,
  ITokenService,
} from "../../application/providers/token-service.js";

export class TokenService implements ITokenService {
  async createAccessToken(payload: ITokenPayload): Promise<string> {

    return jwt.sign(payload, env.jwt.access_secret as string, {
      expiresIn: env.jwt.access_expires,
    });
  }

  async createRefreshToken(payload: ITokenPayload): Promise<string> {

    return jwt.sign(payload, env.jwt.refresh_secret as string, {
      expiresIn: env.jwt.refresh_expires,
    });
  }

  async verifyAccessToken(token: string): Promise<ITokenPayload> {
    return jwt.verify(token, env.jwt.access_secret as string) as ITokenPayload;
  }

  async verifyRefreshToken(token: string): Promise<ITokenPayload> {
    return jwt.verify(token, env.jwt.refresh_secret as string) as ITokenPayload;
  }
}
