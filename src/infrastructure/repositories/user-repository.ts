import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type {
  ICreateUserInput,
  IUser,
  IUserWithPassword,
} from "../../domain/entities/user.js";
import { UserModel } from "../db/models/user-model.js";

export class UserRepository implements IUserRepository {
  async create(user: ICreateUserInput): Promise<IUser> {
    const newUser = new UserModel(user);
    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword as IUser;
  }

  async findByEmail(email: string): Promise<IUserWithPassword | null> {
    const user = await UserModel.findOne({
      email,
    }).lean();

    return user as IUserWithPassword;
  }
}
