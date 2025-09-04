import type { IUserPublic } from "../../domain/entities/user.js";
import type { IUserDocument } from "../../infrastructure/db/models/user-model.js";

export interface IAuthService {
  checkUserExists(email: string): Promise<IUserDocument | null>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  verifyOtp(email: string, otp: string, purpose: string): Promise<void>;
  generateTokens(payload: IUserPublic): Promise<[string, string]>;
  updatePassword(userId: string, hashedPassword: string): Promise<void | null>;
}
