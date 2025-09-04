import type { UserRole } from "../enums/user-role.js";

export interface IUserPublicDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface ILoginRequestDTO {
  email: string;
  password: string;
}

export interface ILoginResponseDTO {
  success: boolean;
  user: IUserPublicDTO;
  message: string;
}

export interface IForgotPasswordRequestDTO {
  email: string;
}

export interface IForgotPasswordResponseDTO {
  success: boolean;
  message: string;

}
export interface IVerifyOtpRequestDTO {
  email: string;
  otp: string;
}

export interface IVerifyOtpResponseDTO {
  success: boolean;
  message: string;
}

export interface IResetPasswordRequestDTO {
  email: string;
  password: string;
}

export interface IResetPasswordResponseDTO {
  success: boolean;
  message: string;
}

