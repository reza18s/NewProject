import express, { NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import userRouter from "./routes/userRoutes";
import { globalErrorHandler } from "./controllers/errorController";
import { ErrorHandler } from "./utils/ErrorHandler";
import profilesRouter from "./routes/profileRoutes";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin) return callback(null, true); // Allow no-origin requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow credentials like cookies, authorization headers, etc.
};
// Middleware
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

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
