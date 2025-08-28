import { StoreTempUserAndSentOtpUC } from "../../application/use-cases/user/auth/store-temp-user-and-send-otp.js";
import { VerifyOtpAndCreateUserUC } from "../../application/use-cases/user/auth/verify-otp-and-create-user.js";
import { env } from "../../infrastructure/config/env.js";
import { EmailService } from "../../infrastructure/providers/email-service.js";
import { OtpStore } from "../../infrastructure/providers/otp-service.js";
import { PasswordHasher } from "../../infrastructure/providers/password-hasher.js";
import { TokenService } from "../../infrastructure/providers/token-service.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";
import { AuthController } from "../../presentation/controllers/user/auth-controller.js";

export interface IAppConfig {
  otpTtlSeconds: number;
  emailSubject: string;
  saltRounds: number;
}

const getConfig = (): IAppConfig => {
  return {
    otpTtlSeconds: env.otp_ttl_seconds || 300,
    emailSubject: "Your Verification Code",
    saltRounds: env.bcrypt_salt_rounds,
  };
};

export class AuthDependencyContainer {
  private config: IAppConfig;

  constructor() {
    this.config = getConfig();
  }

  createUserRepository(): UserRepository {
    return new UserRepository();
  }

  createPasswordHasher(): PasswordHasher {
    return new PasswordHasher(this.config.saltRounds);
  }

  createOtpStore(): OtpStore {
    return new OtpStore();
  }

  createEmailService(): EmailService {
    return new EmailService();
  }

  createTokenService(): TokenService {
    return new TokenService();
  }

  createStoreTempUC(): StoreTempUserAndSentOtpUC {
    const otpConfig = {
      ttlSeconds: this.config.otpTtlSeconds,
      emailSubject: this.config.emailSubject,
      emailTemplate: (otp: string, expiryMinutes: number) =>
        `Your verification code is: ${otp}\n\nThis code expires in ${expiryMinutes} minutes.`,
    };

    return new StoreTempUserAndSentOtpUC(
      this.createOtpStore(),
      this.createEmailService(),
      this.createPasswordHasher(),
      this.createUserRepository(),
      otpConfig
    );
  }

  createVerifyOtpUC(): VerifyOtpAndCreateUserUC {
    return new VerifyOtpAndCreateUserUC(
      this.createOtpStore(),
      this.createPasswordHasher(),
      this.createUserRepository(),
      this.createTokenService(),
    )
  }

  createAuthController(): AuthController{
    return new AuthController(
      this.createStoreTempUC(),
      this.createVerifyOtpUC(),
    )
  }
}
