import express from "express";

import RoleController from "../controllers/RoleController";
import UserController from "../controllers/UserController";

import UserValidation from "../middleware/validation/UserValidation";

const router = express.Router();

// User Data
router.post(
    "/user/register",
    UserValidation.registerValidation,
    UserController.register
);

// User Role
router.get("/role", RoleController.getRoles);
router.get("/role/:id", RoleController.getRoleByID);
router.post("/role", RoleController.createRole);
router.post("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

export default router;
