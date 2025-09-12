import type { IUserBlockResponseDTO } from "../../../../domain/dtos/admin/admin.js";
import type { UserStatus } from "../../../../domain/enums/user-role.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";

export interface IBlockUserUC {
  execute(id: string, status: UserStatus): Promise<IUserBlockResponseDTO>;
}

export class BlockUserUC implements IBlockUserUC {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(
    id: string,
    status: UserStatus
  ): Promise<IUserBlockResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User Not Found");
    }

    const updatedUser = await this.userRepository.updateStatus(id, status);
    if(!updatedUser){
        throw new Error('User not found')
    }

    return {
      success: true,
      message: `User status updated to ${status}`,
      user: updatedUser,
    };
  }
}
