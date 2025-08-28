import type {
  ICreateUserInput,
  IUser,
  IUserWithPassword,
} from "../../domain/entities/user.js";

export interface IUserRepository {
  create(user: ICreateUserInput): Promise<IUser>;
  findByEmail(email: string): Promise<IUserWithPassword | null>;
}
