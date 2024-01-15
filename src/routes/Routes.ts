import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

import UserValidation from "../middleware/validation/UserValidation";

import Authorization from "../middleware/Authorization";

const router = express.Router();

// User Data
router.post(
    "/user/register",
    UserValidation.registerValidation,
    UserController.register
);
router.post("/user/login", UserController.login);
router.get("/user/refresh-token", UserController.refreshToken);
router.get(
    "/user/profile",
    Authorization.Authenticated,
    UserController.getUserProfile
);
router.get("/user/logout", Authorization.Authenticated, UserController.logout);

// User Role
router.get("/role", Authorization.Authenticated, RoleController.getRoles);
router.get(
    "/role/:id",
    Authorization.Authenticated,
    RoleController.getRoleByID
);
router.post(
    "/role",
    Authorization.Authenticated,
    Authorization.AdminRole,
    RoleController.createRole
);
router.post(
    "/role/:id",
    Authorization.Authenticated,
    Authorization.AdminRole,
    RoleController.updateRole
);
router.delete(
    "/role/:id",
    Authorization.Authenticated,
    Authorization.SuperAdminRole,
    RoleController.deleteRole
);

export default router;
