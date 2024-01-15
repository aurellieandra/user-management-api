import { Request, Response, NextFunction } from "express";
import Helper from "../helpers/Helper";

const Authenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers["authorization"]
        const token = authToken && authToken.split(" ")[1]

        if (token){
            const result = Helper.ExtractToken(token!)
            if (!result) {
                return res.status(401).send(Helper.ResponseData(401, "Unauthorized Access", null, null))
            }
            next()
        } else {
            return res.status(401).send(Helper.ResponseData(401, "Unauthorized Access", null, null))
        }       
    } catch (error) {
        return res.status(500).send(Helper.ResponseData(500, "", error, null))
    }
}
export default {
    Authenticated,
};
