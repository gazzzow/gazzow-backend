import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IAuthService } from "../../application/providers/auth-service.js";
import type { IHashService } from "../../application/providers/hash-service.js";
import type { IOtpStore } from "../../application/providers/otp-service.js";
import type { ITokenService } from "../../application/providers/token-service.js";
import type { IUserPublic } from "../../domain/entities/user.js";
import type { IUserDocument } from "../db/models/user-model.js";

export class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
    private otpStore: IOtpStore,
    private hashService: IHashService
  ) {}

  async checkUserExists(email: string): Promise<IUserDocument | null> {
    return this.userRepository.findByEmail(email);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.hashService.compare(password, hash);
  }

  async verifyOtp(email: string, otp: string): Promise<void> {
    const otpKey = `otp:register:${email}`;

    const storedHashedOtp = await this.otpStore.get(otpKey);
    if (!storedHashedOtp) {
      throw new Error(
        "Verification code has expired. Please request a new one."
      );
    }

    const isValid = await this.hashService.compare(otp, storedHashedOtp);
    if (!isValid) {
      throw new Error("Invalid verification code. Please check and try again.");
    }
  }

  async generateTokens(
    payload: IUserPublic
  ): Promise<[string, string]> {

    return Promise.all([
      this.tokenService.createAccessToken(payload),
      this.tokenService.createRefreshToken(payload),
    ]);
  }
}
