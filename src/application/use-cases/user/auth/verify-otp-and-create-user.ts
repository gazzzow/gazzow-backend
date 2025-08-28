import type {
  ITempUserData,
  IUser,
  IUserPublic,
  IVerificationResult,
} from "../../../../domain/entities/user.js";
import { UserRole } from "../../../../domain/enums/user-role.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";
import type { IOtpStore } from "../../../providers/otp-service.js";
import type { IPasswordHasher } from "../../../providers/password-hasher.js";
import type { ITokenService } from "../../../providers/token-service.js";
import logger from "../../../../utils/logger.js";

export class VerifyOtpAndCreateUserUC {
  constructor(
    private otpStore: IOtpStore,
    private passwordHash: IPasswordHasher,
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(email: string, otp: string): Promise<IVerificationResult> {
    const normalizedEmail = email.toLowerCase().trim();

    try {
      if (!email || !otp) {
        throw new Error("Email and Otp are required");
      }

      await this.verifyOtp(normalizedEmail, otp);

      // Get and validate temp user data
      const tempUserData = await this.getTempUserData(normalizedEmail);

      // Create user in database with transaction-like behavior
      const createdUser = await this.createUserSafely(tempUserData);

      // Generate tokens after successful user creation
      const tokens = await this.generateToken(createdUser);

      await this.cleanupTempData(normalizedEmail);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
          createdAt: createdUser.createdAt
        },
        message: "Account created successfully",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }

  private async verifyOtp(email: string, otp: string): Promise<void> {
    const otpKey = `otp:register:${email}`;

    const storedHashedOtp = await this.otpStore.get(otpKey);
    if (!storedHashedOtp) {
      throw new Error(
        "Verification code has expired. Please request a new one."
      );
    }

    const isValid = await this.passwordHash.compare(otp, storedHashedOtp);
    if (!isValid) {
      throw new Error("Invalid verification code. Please check and try again.");
    }
  }

  private async getTempUserData(email: string): Promise<ITempUserData> {
    const tempKey = `temp:user:${email}`;
    const tempPayload = await this.otpStore.get(tempKey);

    if (!tempPayload) {
      throw new Error("Registration session has expired. Please start over.");
    }

    try {
      const userData = JSON.parse(tempPayload);

      // Validate required fields
      if (!userData.name || !userData.email || !userData.password) {
        throw new Error("Invalid registration data");
      }

      return userData;
    } catch (error) {
      logger.error(error);
      throw new Error("Invalid registration data format: ");
    }
  }

  private async createUserSafely(
    tempUserData: ITempUserData
  ): Promise<IUser> {
    try {
      // Check if user was created
      const existingUser = await this.userRepository.findByEmail(
        tempUserData.email
      );
      if (existingUser) {
        throw new Error("Account already exists. Please sign in instead.");
      }

      // Create the user
      const createdUser = await this.userRepository.create({
        name: tempUserData.name,
        email: tempUserData.email,
        password: tempUserData.password,
        role: UserRole.USER,
      });

      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        // Handle specific database errors
        if (
          error.message.includes("duplicate") ||
          error.message.includes("unique")
        ) {
          throw new Error("Account already exists. Please sign in instead.");
        }
      }
      throw error;
    }
  }

  private async generateToken(
    user: IUserPublic
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.createAccessToken(payload),
      this.tokenService.createRefreshToken(payload),
    ]);

    console.log("Tokens generated for user:", {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
    return { accessToken, refreshToken };
  }

  private async cleanupTempData(email: string): Promise<void> {
    const otpKey = `otp:register:${email}`;
    const tempKey = `temp:user:${email}`;

    try {
      await Promise.all([
        this.otpStore.delete(otpKey),
        this.otpStore.delete(tempKey),
      ]);

      console.log("Cleanup completed for:", email);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(`cleanup failed: ${error}`);
      }
    }
  }
}
