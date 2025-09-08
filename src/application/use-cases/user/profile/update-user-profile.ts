import type {
  IUpdateProfileRequestDTO,
  IUpdateProfileResponseDTO,
} from "../../../../domain/dtos/user.js";
import type { IUserRepository } from "../../../interfaces/user-repository.js";
import { UserMapper } from "../../../mappers/user.js";

export class UpdateUserProfileUC {
  constructor(private userRepository: IUserRepository) {}

  execute = async (
    userId: string,
    profileData: IUpdateProfileRequestDTO
  ): Promise<IUpdateProfileResponseDTO> => {
    try {
      const updatedUser = await this.userRepository.updateProfile(
        userId,
        profileData
      );

      if (!updatedUser) {
        throw new Error("User not found");
      }

      const publicUser = UserMapper.toPublicDTO(updatedUser);

      return {
        success: true,
        user: publicUser,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.error("Update profile error:", error);

      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unable to update profile. Please try again.");
    }
  };
}
