import type { IUserPublic } from "../../domain/entities/user.js";

export interface ITokenService {
  createAccessToken(payload: IUserPublic): Promise<string>;
  createRefreshToken(payload: IUserPublic): Promise<string>; // pass one field to create refreshToken
  verifyAccessToken(token: string): Promise<IUserPublic>;
  verifyRefreshToken(token: string): Promise<IUserPublic>;
}
