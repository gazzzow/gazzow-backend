import type { IVerifyOtpResponseDTO } from "../../../../domain/dtos/user.js";
import type { AuthService } from "../../../../infrastructure/providers/auth-service.js";

export class VerifyOtpUC {
  constructor(private authService: AuthService) {}

  async execute(email: string, otp: string): Promise<IVerifyOtpResponseDTO> {
    try {

        await this.authService.verifyOtp(email, otp, 'reset')

        return {
            success: true,
            message: 'Otp verified successfully'
        }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw error;
    }
  }
}
