import express, { Request, Response } from "express";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
    return res.status(200).send({
        success: true,
        message: "Success GET route",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
    console.log(`Running ${process.env.APP_NAME}...`);
});
