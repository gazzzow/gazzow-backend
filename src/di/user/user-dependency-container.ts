import { UpdateUserProfileUC } from "../../application/use-cases/user/profile/update-user-profile.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";
import { UserController } from "../../presentation/controllers/user/user-controller.js";


export class UserDependencyContainer{
    constructor(){}

    createUserRepository(): UserRepository{
        return new UserRepository();
    }


    createUserProfileUC(): UpdateUserProfileUC{
        return new UpdateUserProfileUC(
            this.createUserRepository(),
        )
    }


    createUserController(): UserController{
        return new UserController(
            this.createUserProfileUC(),
        )
    }
}