import { AdminLoginUC } from "../../application/use-cases/admin/auth/login.js";
import { ListUsersUC } from "../../application/use-cases/admin/users/list-users.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";
import { AdminAuthController } from "../../presentation/controllers/admin/auth-controller.js";
import { UserManagementController } from "../../presentation/controllers/admin/user-controller.js";

export class AdminDependencyContainer {
  constructor() {}

  createUserRepository(): UserRepository {
    return new UserRepository();
  }

  createLoginUC(): AdminLoginUC {
    return new AdminLoginUC();
  }

  createListUsersUC(): ListUsersUC {
    return new ListUsersUC(this.createUserRepository());
  }

  createAuthController() {
    return new AdminAuthController(
        this.createLoginUC(),
    )
  }

  createAdminController() {
    return new UserManagementController(
      this.createListUsersUC(),
    );
  }
}
