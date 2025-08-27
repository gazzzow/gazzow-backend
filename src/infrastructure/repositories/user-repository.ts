import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IUser } from "../../domain/entities/user.js";
import { UserModel } from "../db/models/user-model.js";

export class UserRepository implements IUserRepository {
  async create(user: IUser): Promise<IUser> {
    const newUser = new UserModel(user);
    await newUser.save();

    return newUser.toObject();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({email}).lean()
  }
}
