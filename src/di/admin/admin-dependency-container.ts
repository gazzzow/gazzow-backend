import {
  UserMapper,
  type IUserMapper,
} from "../../application/mappers/user.js";
import {
  UsersMapper,
  type IUsersMapper,
} from "../../application/mappers/users.js";
import { AdminLoginUC } from "../../application/use-cases/admin/auth/login.js";
import {
  BlockUserUC,
  type IBlockUserUC,
} from "../../application/use-cases/admin/users-management/block-user.js";
import {
  GetUserUC,
  type IGetUserUC,
} from "../../application/use-cases/admin/users-management/get-user.js";
import { ListUsersUC } from "../../application/use-cases/admin/users-management/list-users.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";
import { AdminAuthController } from "../../presentation/controllers/admin/auth-controller.js";
import { UserManagementController } from "../../presentation/controllers/admin/user-management.js";

export class AdminDependencyContainer {
  constructor() {}

  createUserRepository(): UserRepository {
    return new UserRepository(
      this.createUserMapper(),
      this.createUsersMapper()
    );
  }

  createUserMapper(): IUserMapper {
    return new UserMapper();
  }

  createUsersMapper(): IUsersMapper {
    return new UsersMapper(this.createUserMapper());
  }

  createLoginUC(): AdminLoginUC {
    return new AdminLoginUC();
  }

  createListUsersUC(): ListUsersUC {
    return new ListUsersUC(this.createUserRepository());
  }

  createBlockUserUC(): IBlockUserUC {
    return new BlockUserUC(this.createUserRepository());
  }

  createGetUserUC(): IGetUserUC {
    return new GetUserUC(this.createUserRepository());
  }

  // Admin auth Controller
  createAuthController() {
    return new AdminAuthController(this.createLoginUC());
  }

  // Admin User Controller
  createUserManagementController() {
    return new UserManagementController(
      this.createListUsersUC(),
      this.createBlockUserUC(),
      this.createGetUserUC(),
    );
  }
}
