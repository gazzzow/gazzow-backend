import type { IResetPasswordResponseDTO } from "../../../../domain/dtos/user.js";
import type { AuthService } from "../../../../infrastructure/providers/auth-service.js";
import type { HashService } from "../../../../infrastructure/providers/hash-service.js";
import logger from "../../../../utils/logger.js";

export class ResetPasswordUC {
  constructor(
    private hashService: HashService,
    private authService: AuthService
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<IResetPasswordResponseDTO> {
    try {
      logger.info(`new password in UC: ${password}`)
      const hashedPassword = await this.hashService.hash(password);
      logger.info(`hashedPassword in UC: ${hashedPassword} and email: ${email}`)

      await this.authService.updatePassword(email, hashedPassword);

      return {
        success: true,
        message: "Password updated successfully!",
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw error;
    }
  }
}
