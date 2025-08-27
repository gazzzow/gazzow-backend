import type { IUserRepository } from "../../../interfaces/user-repository.js";
import type { IOtpStore } from "../../../providers/otp-service.js";
import type { IPasswordHasher } from "../../../providers/password-hasher.js";
import type { ITokenService } from "../../../providers/token-service.js";

export class VerifyOtpAndCreateUserUC {
  constructor(
    private otpStore: IOtpStore,
    private passwordHash: IPasswordHasher,
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(email: string, otp: string) {
    const otpKey = `otp:register:${email.toLowerCase()}`;
    const tempKey = `temp:user:${email.toLowerCase()}`;


    const storedHashedOtp = await this.otpStore.get(otpKey);
    if (!storedHashedOtp) throw new Error("OTP is missing in cache. Re-send otp");


    const isValid = await this.passwordHash.compare(otp, storedHashedOtp);
    if(!isValid) throw new Error('Invalid Otp or Otp expires')

    //If otp is valid then get the temp user payload
    const tempPayload = await this.otpStore.get(tempKey);
    if (!tempPayload) throw new Error("Temp user payload is missing");

    const userData = JSON.parse(tempPayload);

    // Jwt token
    const payload = { userId: userData.email, role: userData.role };
    const accessToken = await this.tokenService.createAccessToken(payload);
    console.log('[accessToken]: ', accessToken )
    const refreshToken = await this.tokenService.createRefreshToken(payload);
    console.log('[refreshToken]: ', refreshToken )

    // create user in DB
    const created = await this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password, // already hashed
      role: "user",
    });

    // Delete the otp and temp user
    console.log('otp and temp data are deleting from redis')
    await this.otpStore.delete(otpKey);
    await this.otpStore.delete(tempKey);

    return {
      accessToken,
      refreshToken,
      user: {
        id: created.id,
        name: created.name,
        email: created.email,
        role: created.role,
      },
      message: 'Signup successfully'
    };
  }
}
