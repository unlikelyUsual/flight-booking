import { Router } from "express";
import * as userController from "../controller/user.controller";
import { isAuthenticated } from "../config/auth";
import { requireRole } from "../middleware/requireRole";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../schema/user.schema";
import { UserRole } from "../types/enum/user.enum";

const router = Router();

router.get("/", isAuthenticated, requireRole(UserRole.USER), userController.getUser);

router.post("/login", validate(loginSchema), userController.loginUser);

router.post("/signup", validate(registerSchema), userController.signupUser);

router.get("/logout", userController.logoutUser);

router.put("/update-user", userController.updateUser);

export default router;
