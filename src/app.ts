import express from "express";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import { connectionToServeDatabase } from "./config/db";
import routes from "./routes";

const app = express();
app.use(express.json());


/**
 * The routes of API
 */
app.use(routes);

/**
 * open access to services
 */
app.use(cors());

/**
 * Permission to receive and send json
 */
app.use(bodyParser.json());

/**
 * Configuration of logs
 */
app.use(logger("dev"));

/**
 * Connection in DB
 */
connectionToServeDatabase();


export { app } 