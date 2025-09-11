import type { Request, Response } from "express";
import type { ListUsersUC } from "../../../application/use-cases/admin/users/list-users.js";
import logger from "../../../utils/logger.js";

export class UserManagementController {
  constructor(private listUserUC: ListUsersUC) {}

  listUsers = async (req: Request, res: Response) => {
    try {
      const result = await this.listUserUC.execute();
      logger.info(`response result: ${result}`);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  };
}
