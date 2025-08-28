import type { IUserRepository } from "../../application/interfaces/user-repository.js";
import type { IBaseUser } from "../../domain/entities/base-entity.js";
import type { UserRole } from "../../domain/enums/user-role.js";
import { UserModel } from "../db/models/user-model.js";

export interface IUser extends IBaseUser {
  name: string;
  email: string;
  role: UserRole;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export interface IUserPublic {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: Date;
}
