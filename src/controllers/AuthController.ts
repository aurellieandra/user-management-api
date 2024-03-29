import { Request, Response } from 'express';

import User from '../db/models/User';
import Role from '../db/models/Role';

import Helper from '../helpers/Helper';
import PasswordHelper from '../helpers/PasswordHelper';

const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { name, email, password, roleID } = req.body;

		const hashed = await PasswordHelper.PasswordHashing(password);

		const user = await User.create({
			name,
			email,
			password: hashed,
			roleID,
			active: true,
			verified: true,
		});

		user.password = '';

		return res
			.status(200)
			.send(Helper.ResponseData(201, 'Successfully Create User', null, user));
	} catch (error: any) {
		return res.status(500).send(Helper.ResponseData(500, '', error, null));
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
				.status(404)
				.send(Helper.ResponseData(404, 'User Not Registered', null, null));
		}

		const matched = await PasswordHelper.PasswordCompare(
			password,
			user.password
		);
		if (!matched) {
			return res
				.status(401)
				.send(Helper.ResponseData(401, 'Password or Email is Incorrect', null, null));
		}

		const dataUser = {
			name: user.name,
			email: user.email,
			roleID: user.roleID,
			verified: user.verified,
			active: user.active,
		};

		const token = Helper.GenerateToken(dataUser);
		const refreshToken = Helper.GenerateRefreshToken(dataUser);

		(user.accessToken = refreshToken), await user.save();

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		});

		const responseUser = {
			name: user.name,
			email: user.email,
			roleID: user.roleID,
			verified: user.verified,
			active: user.active,
			token,
		};

		return res
			.status(200)
			.send(
				Helper.ResponseData(200, 'Successfully Logged In', null, responseUser)
			);
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, '', error, null));
	}
};

const refreshToken = async (req: Request, res: Response): Promise<Response> => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) {
			return res
				.status(401)
				.send(Helper.ResponseData(401, 'Unauthorized Access', null, null));
		}

		const decodedUser = Helper.ExtractRefreshToken(refreshToken);
		if (!decodedUser) {
			return res
				.status(401)
				.send(Helper.ResponseData(401, 'Unauthorized Access', null, null));
		}

		const token = Helper.GenerateToken({
			name: decodedUser.name,
			email: decodedUser.email,
			roleID: decodedUser.roleID,
			verified: decodedUser.verified,
			active: decodedUser.active,
		});

		const resultUser = {
			name: decodedUser.name,
			email: decodedUser.email,
			roleID: decodedUser.roleID,
			verified: decodedUser.verified,
			active: decodedUser.active,
			token: token,
		};

		return res
			.status(200)
			.send(Helper.ResponseData(200, 'Success', null, resultUser));
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, '', error, null));
	}
};

const getUserProfile = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const email = res.locals.userEmail;

		const user = await User.findOne({
			where: {
				email,
			},
			include: {
				model: Role,
				attributes: ['id', 'roleName'],
			},
		});
		if (!user) {
			return res
				.status(404)
				.send(Helper.ResponseData(404, 'User Not Found', null, null));
		}

		user.password = '';
		user.accessToken = '';

		return res
			.status(200)
			.send(
				Helper.ResponseData(200, "Successfully Get User's Profile", null, user)
			);
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, '', error, null));
	}
};

const logout = async (req: Request, res: Response): Promise<Response> => {
	try {
		const refreshToken = req.cookies?.refreshToken;
		if (!refreshToken) {
			return res
				.status(200)
				.send(Helper.ResponseData(200, 'Refresh Token Expired', null, null));
		}

		const email = res.locals.userEmail;

		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (!user) {
			res.clearCookie('refreshToken');
			return res
				.status(200)
				.send(
					Helper.ResponseData(200, 'Successfully Logged Out', null, null)
				);
		}

		await user.update({ accessToken: null }, { where: { email } });
		res.clearCookie('refreshToken');

		return res
			.status(200)
			.send(
				Helper.ResponseData(200, 'Successfully Logged Out', null, null)
			);
	} catch (error) {
		return res.status(500).send(Helper.ResponseData(500, '', error, null));
	}
};

export default {
	register,
	login,
	refreshToken,
	getUserProfile,
	logout,
};
