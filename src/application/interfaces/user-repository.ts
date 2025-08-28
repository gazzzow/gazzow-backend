import type {
  ICreateUserInput,
  IUserWithPassword,
} from "../../domain/entities/user.js";

export interface IUserRepository {
  create(user: ICreateUserInput): Promise<IUserWithPassword>;
  findByEmail(email: string): Promise<IUserWithPassword | null>;
}
