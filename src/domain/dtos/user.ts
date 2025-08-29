import type { UserRole } from "../enums/user-role.js";

export interface IUserPublicDTO {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: Date;
}
