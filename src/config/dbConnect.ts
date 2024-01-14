import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dbName = process.env.DB_NAME as string;
const dbUsername = process.env.DB_USERNAME as string;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const sequelizeConnection = new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    dialect: "mysql",
});

export default sequelizeConnection;
