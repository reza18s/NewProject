import express, { NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routes/userRoutes";
import { globalErrorHandler } from "./controllers/errorController";
import { ErrorHandler } from "./utils/ErrorHandler";
import profilesRouter from "./routes/profileRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
const allowedOrigins = ["http://localhost:3001", "http://localhost:3001"];
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // This is required to allow credentials (cookies, etc.) to be sent
};

// Middleware
app.use(cors(corsOptions));
configDotenv({ path: "./config.env" });
app.use(express.static(`${__dirname}/public`));

// // // 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profiles", profilesRouter);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ stats: "s" });
});
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});
// 4) START SERVER
const port = process.env.PORT || 3000;
app.use(globalErrorHandler);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
