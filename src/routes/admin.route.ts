import { Router } from "express";
import { AdminUserController } from "../controllers/admin/admin.controller";
import { authorizationMiddleware, adminOnlyMiddleware } from "../middlewares/authorization.middleware";

let adminController = new AdminUserController();
const router = Router();

router.post("/api/admin/users",adminController.createUser);
router.get("/api/admin/users/:id",adminController.getUserById);
router.get("/",authorizationMiddleware,adminOnlyMiddleware,adminController.getAllUsers);
router.put("/api/admin/users/:id",adminController.updateOneUser);
router.delete("/api/admin/users/:id",adminController.deleteOneUser);

export default router;

//crud for users - admin only