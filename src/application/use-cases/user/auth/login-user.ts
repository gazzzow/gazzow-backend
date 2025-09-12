import type { ILoginRequestDTO } from "../../../../domain/dtos/user.js";
import logger from "../../../../utils/logger.js";
import { UserMapper, type IUserMapper } from "../../../mappers/user.js";
import type { IAuthService } from "../../../providers/auth-service.js";

export class LoginUserUC {
  constructor(
    private authService: IAuthService,
    private userMapper: IUserMapper,
  ) {}

  async execute(data: ILoginRequestDTO) {
    // Find user by email
    const userDoc = await this.authService.checkUserExists(data.email);
    if (!userDoc) {
      throw new Error("User not found!");
    }

    // Compare password
    const isValidPassword = await this.authService.comparePassword(
      data.password,
      userDoc.password
    );

    logger.info(`password compare res: ${isValidPassword}`)
    
    if (!isValidPassword) {
      throw new Error("Invalid Credentials!");
    }

    const user = this.userMapper.toPublicDTO(userDoc);

    // Generate Tokens
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const [accessToken, refreshToken] =
      await this.authService.generateTokens(payload);

    // return user + tokens
    return {
      accessToken,
      refreshToken,
      user,
      message: "Login Successful!",
    };
  }
}
