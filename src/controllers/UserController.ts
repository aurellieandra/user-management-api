import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/Helper";
import PasswordHelper from "../helpers/PasswordHelper";

const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        const hashed = await PasswordHelper.PasswordHashing(password);

        const user = await User.create({
            name,
            email,
            password,
            active: true,
            verified: true,
            roleID: 1,
        });

        return res
            .status(200)
            .send(
                Helper.ResponseData(201, "Successfully create user", null, user)
            );
    } catch (error: any) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res
                .status(401)
                .send(
                    Helper.ResponseData(401, "Unauthorized Access", null, null)
                );
        }

        /**
        const matched = await PasswordHelper.PasswordCompare(
            password,
            user.password
        );

        if (!matched) {
            return res
                .status(401)
                .send(
                    Helper.ResponseData(401, "Unauthorized Access", null, null)
                );
        }
         */

        return res
            .status(200)
            .send(
                Helper.ResponseData(
                    200,
                    "Successfully logged in",
                    null,
                    user.dataValues
                )
            );
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll({
            where: {
                active: true,
            },
        });

        return res.status(200).send({
            status: 200,
            message: "Successfully Get Users",
            data: users,
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
        });
    }
};

const getRoleByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const role = await User.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null,
            });
        }

        return res.status(200).send({
            status: 200,
            message: "Successfully Get User Role by ID",
            data: role,
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
        });
    }
};

const createRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { roleName, active } = req.body;

        const role = await User.create({
            active,
        });

        return res.status(201).send({
            status: 201,
            message: "Successfully Create User Role",
            data: role,
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
        });
    }
};

const updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { roleName, active } = req.body;

        const role = await User.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null,
            });
        }

        role.active = active;
        await role.save();

        return res.status(201).send({
            status: 201,
            message: "Successfully Update User Role",
            data: role,
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
        });
    }
};

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const role = await User.findByPk(id);

        if (!role) {
            return res.status(404).send({
                status: 404,
                message: "Data Not Found",
                data: null,
            });
        }

        await role.destroy();

        return res.status(201).send({
            status: 201,
            message: "Successfully Delete User Role",
            data: null,
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            });
        }

        return res.status(500).send({
            status: 500,
            message: "Internal Server Error",
            errors: error,
        });
    }
};

export default {
    register,
    login,
    /**
    getRoles,
    getRoleByID,
    createRole,
    updateRole,
    deleteRole,
     */
};