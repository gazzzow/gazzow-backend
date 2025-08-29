import type { IUserPublicDTO } from "../../domain/dtos/user.js";
import type { IUserDocument } from "../../infrastructure/db/models/user-model.js";


export class UserMapper{
    static toPublicDTO(user: IUserDocument): IUserPublicDTO{
        return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        }
    }
}