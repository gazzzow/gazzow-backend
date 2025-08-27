import type { IUser } from "../../../domain/entities/user.js";
import type { IUserRepository } from "../../interfaces/user-repository.js";
import type { IPasswordHasher } from "../../providers/password-hasher.js";

export class RegisterUser {
  constructor(private userRepository: IUserRepository, private passwordHasher: IPasswordHasher) {}

  async execute(userData: IUser): Promise<IUser> {
    const user = await this.userRepository.findByEmail(userData.email);

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);

    const newUser: IUser = {
      ...userData,
      password: hashedPassword,
    };

    return await this.userRepository.create(newUser);
  }

}
