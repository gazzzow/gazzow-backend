import { Router } from "express";
import { AdminDependencyContainer } from "../../../di/admin/admin-dependency-container.js";

const adminRouter = Router();


const adminContainer = new AdminDependencyContainer();

const adminAuthController = adminContainer.createAuthController();
const adminController = adminContainer.createAdminController();

adminRouter.post("/auth/login", adminAuthController.login);

adminRouter.get("/users", adminController.listUsers);

export default adminRouter;
