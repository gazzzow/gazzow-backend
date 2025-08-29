import type {
  ICreateUserInput,
} from "../../domain/entities/user.js";
import type { IUserDocument } from "../../infrastructure/db/models/user-model.js";

export interface IUserRepository {
  create(user: ICreateUserInput): Promise<IUserDocument>;
  findByEmail(email: string): Promise<IUserDocument | null>;
}
