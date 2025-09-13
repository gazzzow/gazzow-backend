import { UserMapper, type IUserMapper } from "../../application/mappers/user.js";
import { UsersMapper, type IUsersMapper } from "../../application/mappers/users.js";
import { GetUserProfileUC, type IGetUserProfileUC } from "../../application/use-cases/user/profile/get-user-profile.js";
import { UpdateUserProfileUC } from "../../application/use-cases/user/profile/update-user-profile.js";
import { UserRepository } from "../../infrastructure/repositories/user-repository.js";
import { UserController } from "../../presentation/controllers/user/user-controller.js";


export class UserDependencyContainer{
    constructor(){}

    createUserRepository(): UserRepository{
        return new UserRepository(
            this.createUserMapper(),
            this.createUsersMapper(),
        );
    }

    createUserMapper(): IUserMapper{
       return new UserMapper();
     }
   
     createUsersMapper(): IUsersMapper{
       return new UsersMapper(
         this.createUserMapper(),
       );
     }
   

    createUpdateProfileUC(): UpdateUserProfileUC{
        return new UpdateUserProfileUC(
            this.createUserRepository(),
        )
    }

    createGetUserProfileUC(): IGetUserProfileUC{
        return new GetUserProfileUC(
            this.createUserRepository(),
        )
    }


    createUserController(): UserController{
        return new UserController(
            this.createUpdateProfileUC(),
            this.createGetUserProfileUC(),
        )
    }
}