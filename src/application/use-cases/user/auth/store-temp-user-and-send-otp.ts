import type { IEmailService } from "../../../providers/email-service.js";
import type { IOtpStore } from "../../../providers/otp-service.js";
import type { IPasswordHasher } from "../../../providers/password-hasher.js";
import type { IUser } from "../../../../domain/entities/user.js";
import { generateOtp } from "../../../../infrastructure/utils/generate-otp.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";

export class StoreTempUserAndSentOtpUC {
  constructor(
    private otpStore: IOtpStore,
    private emailService: IEmailService,
    private passwordHasher: IPasswordHasher,
    private userRepository: IUserRepository 
  ) {}

  // Store user temp info in redis
  async execute(userData: Omit<IUser, "id" | "role">): Promise<string> {
    console.log("user register execute function called");

    const user = await this.userRepository.findByEmail(userData.email);
    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    const temp = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    };

    // Store user data in redis of temp
    const key = `temp:user:${temp.email}`;
    const OTP_TTL_SECONDS = parseInt(process.env.OTP_TTL_SECONDS || "300", 10);
    await this.otpStore.set(key, JSON.stringify(temp), OTP_TTL_SECONDS);

    // Generate Otp and store hashed otp in redis
    const otp = generateOtp();
    const hashedOtp = await this.passwordHasher.hash(otp);
    const otpKey = `otp:register:${temp.email}`;
    await this.otpStore.set(otpKey, hashedOtp, OTP_TTL_SECONDS);

    // Send OTP via email
    const subject = "Your Gazzow verification code";
    const text = `Your OTP is ${otp}. It expires in ${OTP_TTL_SECONDS / 60} minutes.`;
    await this.emailService.sendOtp(temp.email, subject, text);

    return `Otp sended to email otp: [${otp}]`;
  }
}
