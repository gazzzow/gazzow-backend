import type { ILoginRequestDTO } from "../../../../domain/dtos/user.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";
import { UserMapper } from "../../../mappers/user.js";
import type { IHashService } from "../../../providers/hash-service.js";
import type { ITokenService } from "../../../providers/token-service.js";

export class LoginUserUC {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async execute(data: ILoginRequestDTO){
    // Find user by email
    const userDoc = await this.userRepository.findByEmail(data.email);
    if (!userDoc) {
      throw new Error("User not found!");
    }

    // Compare password
    const isValidPassword = await this.hashService.compare(
      data.password,
      userDoc.password
    );

    if (!isValidPassword) {
      throw new Error("Invalid Credentials!");
    }

    const user = UserMapper.toPublicDTO(userDoc);
    
    // Generate Tokens
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

    // return user + tokens
    return {
      accessToken,
      refreshToken,
      user,
        message: 'Login Successful!'
    };
  }
}
