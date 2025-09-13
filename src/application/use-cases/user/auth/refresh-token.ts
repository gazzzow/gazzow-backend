import type { IRefreshAccessTokenResponseDTO } from "../../../../domain/dtos/user.js";
import type { IUserPublic } from "../../../../domain/entities/user.js";
import { AppError } from "../../../../utils/app-error.js";
import { ResponseMessages } from "../../../../utils/constants/response-messages.js";
import { HttpStatusCode } from "../../../../utils/constants/status-codes.js";
import type { ITokenService } from "../../../providers/token-service.js";

export interface IRefreshAccessTokenUC {
  execute(token: string): Promise<IRefreshAccessTokenResponseDTO>;
}

export class RefreshAccessTokenUC implements IRefreshAccessTokenUC {
  constructor(private tokenService: ITokenService) {}
  execute = async (token: string): Promise<IRefreshAccessTokenResponseDTO> => {
    const decoded = await this.tokenService.verifyRefreshToken(token);
    if (!decoded) {
      throw new AppError(
        ResponseMessages.INVALID_REFRESH_TOKEN,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    const payload: IUserPublic = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      createdAt: decoded.createdAt,
    };

    const newAccessToken = await this.tokenService.createAccessToken(payload);

    return {
      success: true,
      message: ResponseMessages.ACCESS_TOKEN_REFRESHED,
      newAccessToken,
    };
  };
}
