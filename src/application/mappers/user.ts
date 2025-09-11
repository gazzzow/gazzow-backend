import type { IUserPublicDTO } from "../../domain/dtos/user.js";
import { UserStatus } from "../../domain/enums/user-role.js";
import type { IUserDocument } from "../../infrastructure/db/models/user-model.js";

export class UserMapper {
  static toPublicDTO(user: IUserDocument): IUserPublicDTO {
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status ?? UserStatus.ACTIVE,
      bio: user.bio ?? "",
      techStacks: user.techStacks ?? [],
      learningGoals: user.learningGoals ?? [],
      experience: user.experience ?? "",
      developerRole: user.developerRole ?? "",
      imageUrl: user.imageUrl ?? "",
      createdAt: user.createdAt,
    };
  }
}
