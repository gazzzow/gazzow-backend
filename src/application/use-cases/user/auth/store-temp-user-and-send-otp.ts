import type { IEmailService } from "../../../providers/email-service.js";
import type { IOtpStore } from "../../../providers/otp-service.js";
import type { IPasswordHasher } from "../../../providers/password-hasher.js";
import type { ITempUserData, IUser } from "../../../../domain/entities/user.js";
import { generateOtp } from "../../../../infrastructure/utils/generate-otp.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";

export interface IOtpConfig {
  ttlSeconds: number;
  emailSubject: string;
  emailTemplate: (otp: string, expiryMinutes: number) => string;
}

export class StoreTempUserAndSentOtpUC {
  constructor(
    private otpStore: IOtpStore,
    private emailService: IEmailService,
    private passwordHasher: IPasswordHasher,
    private userRepository: IUserRepository,
    private otpConfig: IOtpConfig,
  ) {}

  // Store user temp info in redis
  async execute(
    userData: ITempUserData,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Check if the user exist or not
      const existingUser = await this.userRepository.findByEmail(
        userData.email,
      );

      const hashedPassword = await this.passwordHasher.hash(userData.password);

      const tempUserData = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      };

      // Generate Otp and store hashed otp in redis
      const otp = generateOtp();
      const hashedOtp = await this.passwordHasher.hash(otp);

      if (existingUser) {
        // User exists - send different email like registration attempt
        await this.emailService.sendAccountExistsNotification(
          userData.email,
          this.otpConfig.emailSubject,
          "An account with this email already exists. If this wasn't you, please ignore this email.",
        );
      } else {
        const tempUserKey = `temp:user:${tempUserData.email}`;
        const otpKey = `otp:register:${tempUserData.email}`;

        // Store temp user data and otp on redis
        await Promise.all([
          await this.otpStore.set(
            tempUserKey,
            JSON.stringify(tempUserData),
            this.otpConfig.ttlSeconds,
          ),
          await this.otpStore.set(otpKey, hashedOtp, this.otpConfig.ttlSeconds),
        ]);

        // Send OTP via email
        const emailContent = this.otpConfig.emailTemplate(
          otp,
          Math.floor(this.otpConfig.ttlSeconds / 60),
        );

        await this.emailService.sendOtpNotification(
          userData.email,
          this.otpConfig.emailSubject,
          emailContent,
        );
      }

      return {
        success: true,
        message:
          "You will receive a verification code shortly. Please check you email.",
      };
    } catch (error) {
      console.error("Error in StoreTempUserAndSentOtpUC:", error);
      throw new Error(
        "Unable to process registration request. Please try again.",
      );
    }
  }
}

// dependency injection with factory function
export class StoreTempUserAndSentOtpUCFactory {
  static create(
    otpStore: IOtpStore,
    emailService: IEmailService,
    passwordHasher: IPasswordHasher,
    userRepository: IUserRepository,
    config: {
      otpTtlSeconds: number;
      emailSubject: string;
    },
  ): StoreTempUserAndSentOtpUC {
    const otpConfig: IOtpConfig = {
      ttlSeconds: config.otpTtlSeconds,
      emailSubject: config.emailSubject,
      emailTemplate: (otp: string, expiryMinutes: number) =>
        `Your Gazzow verification code is: ${otp}\n\nThis code expires in ${expiryMinutes} minutes.\n\nIf you didn't request this, please ignore this email.`,
    };

    return new StoreTempUserAndSentOtpUC(
      otpStore,
      emailService,
      passwordHasher,
      userRepository,
      otpConfig,
    );
  }
}
