import type {
  IUser,
  IUserPublic,
  IUserWithPassword,
} from "../../domain/entities/user.js";

export interface IUserRepository {
  create(user: Partial<IUserWithPassword>): Promise<IUserWithPassword>;
  findByEmail(email: string): Promise<IUserWithPassword | null>;
}
