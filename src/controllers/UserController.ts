import { Request, Response } from "express";
import User from "../db/models/User";
import Helper from "../helpers/Helper";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const users = await User.findAll({
            where: {
                active: true,
            },
        });

        return res
            .status(200)
            .send(
                Helper.ResponseData(
                    200,
                    "Successfully Get All User Data",
                    null,
                    users
                )
            );
    } catch (error: any) {
        return res
            .status(500)
            .send(
                Helper.ResponseData(500, "Internal Server Error", error, null)
            );
    }
};

const getUserByID = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(404)
                .send(Helper.ResponseData(404, "User Not Found", null, null));
        }

        return res
            .status(200)
            .send(
                Helper.ResponseData(
                    200,
                    "Successfully Get User Data by ID",
                    null,
                    user
                )
            );
    } catch (error: any) {
        return res
            .status(500)
            .send(
                Helper.ResponseData(500, "Internal Server Error", error, null)
            );
    }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        // not change roleID & password & access token here
        const { name, email, verified, active } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res
                .status(404)
                .send(Helper.ResponseData(404, "User Not Found", null, null));
        }

        user.name = name;
        user.email = email;
        user.verified = verified;
        user.active = active;
        await user.save();

        return res
            .status(201)
            .send(
                Helper.ResponseData(
                    201,
                    "Successfully Update User Data",
                    null,
                    user
                )
            );
    } catch (error: any) {
        return res
            .status(500)
            .send(
                Helper.ResponseData(500, "Internal Server Error", error, null)
            );
    }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({
                status: 404,
                message: "User Data Not Found",
                data: null,
            });
        }

        await user.destroy();

        return res
            .status(201)
            .send(
                Helper.ResponseData(
                    201,
                    "Successfully Delete User Data",
                    null,
                    null
                )
            );
    } catch (error: any) {
        return res
            .status(500)
            .send(
                Helper.ResponseData(500, "Internal Server Error", error, null)
            );
    }
};

export default {
    getUsers,
    getUserByID,
    updateUser,
    deleteUser,
};
