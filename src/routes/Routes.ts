import express from "express";

import RoleController from "../controllers/RoleController";
import AuthController from "../controllers/AuthController";

import UserValidation from "../middleware/validation/UserValidation";

import Authorization from "../middleware/Authorization";
import UserController from "../controllers/UserController";

const router = express.Router();

// Auth
router.post(
    "/auth/register",
    UserValidation.registerValidation,
    AuthController.register
);
router.post("/auth/login", AuthController.login);
router.get("/auth/refresh-token", AuthController.refreshToken);
router.get(
    "/auth/profile",
    Authorization.Authenticated,
    AuthController.getUserProfile
);
router.get("/auth/logout", Authorization.Authenticated, AuthController.logout);

// User Data
router.get("/user", Authorization.Authenticated, UserController.getUsers);
router.get(
    "/user/:id",
    Authorization.Authenticated,
    UserController.getUserByID
);
router.post(
    "/user/:id",
    Authorization.Authenticated,
    Authorization.AdminRole,
    UserController.updateUser
);
router.delete(
    "/user/:id",
    Authorization.Authenticated,
    Authorization.SuperAdminRole,
    UserController.deleteUser
);

// Role for User
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
