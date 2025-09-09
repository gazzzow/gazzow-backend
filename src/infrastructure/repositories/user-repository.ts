import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IUpdateProfileRequestDTO } from "../../domain/dtos/user.js";
import type { ICreateUserInput } from "../../domain/entities/user.js";
import { UserModel, type IUserDocument } from "../db/models/user-model.js";

export class UserRepository implements IUserRepository {
  async create(user: ICreateUserInput): Promise<IUserDocument> {
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    const user = await UserModel.findOne({
      email,
    }).lean();

    return user;
  }

  async updatePassword(
    email: string,
    hashedPassword: string
  ): Promise<void | null> {
    return await UserModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );
  }

  async updateProfile(
    userId: string,
    profileData: IUpdateProfileRequestDTO
  ): Promise<IUserDocument> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: profileData },
      { new: true }
    ).lean();

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  findAll(): Promise<IUserDocument[]> {
    return UserModel.find()
  }

}
