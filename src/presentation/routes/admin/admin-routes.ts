import { Router } from "express";
import { AdminLoginUC } from "../../../application/use-cases/admin/auth/login.js";
import { AdminAuthController } from "../../controllers/admin/auth-controller.js";

const adminRouter = Router();

const adminLoginUC = new AdminLoginUC();
const adminAuthController = new AdminAuthController(adminLoginUC);

adminRouter.post("/auth/login", adminAuthController.login);




export default adminRouter;
