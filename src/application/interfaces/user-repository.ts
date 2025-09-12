import type {
  IUpdateProfileRequestDTO,
  IUserPublicDTO,
} from "../../domain/dtos/user.js";
import type { ICreateUserInput } from "../../domain/entities/user.js";
import type { IUserDocument } from "../../infrastructure/db/models/user-model.js";

export interface IUserRepository {
  create(user: ICreateUserInput): Promise<IUserDocument >;
  findByEmail(email: string): Promise<IUserDocument | null>;
  updatePassword(email: string, hashedPassword: string): Promise<void | null>;
  updateProfile(
    userId: string,
    profileData: IUpdateProfileRequestDTO
  ): Promise<IUserPublicDTO>;
  findAll(): Promise<IUserPublicDTO[]>;
}
