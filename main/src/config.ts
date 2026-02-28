import dotenv from "dotenv";

dotenv.config();

export const config = {
  appName: process.env.APP_NAME || "microservice",
  rabbitUrl: process.env.RABBITMQ_URL || "",
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};