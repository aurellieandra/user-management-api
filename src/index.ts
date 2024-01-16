import express, { Request, Response } from "express";

import dotenv from "dotenv";
import router from "./routes/Routes";
import cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        status: 200,
        message: "Success GET route",
    });
});

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
    console.log(`Running ${process.env.APP_NAME}...`);
});
