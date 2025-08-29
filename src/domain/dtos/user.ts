import type { UserRole } from "../enums/user-role.js";

export interface IUserPublicDTO {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}


export interface ILoginRequestDTO{
    email: string;
    password: string;
}

export interface ILoginResponseDTO{
    success: boolean;
    user: IUserPublicDTO;
    message: string;
}