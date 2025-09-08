import { env } from "../../../../infrastructure/config/env.js";

export class AdminLoginUC {
  constructor() {}

  execute = (email: string, password: string) => {
    if (email === env.admin_email && password === env.admin_password) {
      // generate token
      return { success: true, message: "login successful" };
    } else {
      throw new Error("Invalid Admin Credentials. Please try again!");
    }
  };
}
