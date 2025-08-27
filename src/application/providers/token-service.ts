export interface ITokenPayload<T = string> {
  userId: T;
  role?: T;
}

export interface ITokenService {
  createAccessToken(payload: ITokenPayload): Promise<string>;
  createRefreshToken(payload: ITokenPayload): Promise<string>;
  verifyAccessToken(token: string): Promise<ITokenPayload>;
  verifyRefreshToken(token: string): Promise<ITokenPayload>;
}


