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
router.get("/role/:id", RoleController.getRoleByID);
router.post("/role", RoleController.createRole);
router.post("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

export default router;
