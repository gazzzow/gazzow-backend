import logger from "../../../../utils/logger.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";

export class ListUsersUC{
    constructor(
        private userRepository: IUserRepository,
    ){}

    execute = async () => {
        
        const users = await this.userRepository.findAll();
        logger.debug(`users list: ${users}`);
        console.log(`users list after mapped: ${JSON.stringify(users)}`)
        return {
            success: true,
            users,
        }
    }
}