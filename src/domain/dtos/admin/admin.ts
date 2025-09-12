import type { IUserPublic } from "../../entities/user.js";
import type { UserStatus } from "../../enums/user-role.js";

export interface IUserBlockRequestDTO{
    status: UserStatus
}

export interface IUserBlockResponseDTO{
    success: boolean,
    message:string,
    user: IUserPublic,
}