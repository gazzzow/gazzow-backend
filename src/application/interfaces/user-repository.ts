import type { IUser } from "../../domain/entities/user.js";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | null>;
}
