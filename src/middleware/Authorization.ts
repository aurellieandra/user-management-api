import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers["authorization"];

        const token = authToken && authToken.split(" ")[1];
        if (token === null) {
            return res
                .status(401)
                .send(
                    Helper.ResponseData(401, "Unauthorized Access", null, null)
                );
        }

        const result = Helper.ExtractToken(token!);
        if (!result) {
            return res
                .status(401)
                .send(
                    Helper.ResponseData(401, "Unauthorized Access", null, null)
                );
        }

        res.locals.userEmail = result?.email;

        next();
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null));
    }
};
export default {
    Authenticated,
};
