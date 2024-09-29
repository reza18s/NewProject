import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";

configDotenv({ path: "./config.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = pool;
