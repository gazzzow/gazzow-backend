import { Router } from "express";
import { AdminDependencyContainer } from "../../../di/admin/admin-dependency-container.js";

const adminRouter = Router();


const adminContainer = new AdminDependencyContainer();

const adminAuthController = adminContainer.createAuthController();
const userManagementController = adminContainer.createUserManagementController();

adminRouter.post("/auth/login", adminAuthController.login);

adminRouter.get("/users", userManagementController.listUsers);
adminRouter.get('/users/:id', userManagementController.getUser);
adminRouter.patch("/users/:id/status", userManagementController.blockUser);

export default adminRouter;
