// File: src/controllers/userController.ts
import { Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ErrorHandler } from "../utils/ErrorHandler";
import { IRequest } from "../types";
import { db } from "../utils/db";

// Get all users
export const getAllUsers = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const [rows] = await db.execute("SELECT * FROM Users");
    res.status(200).json({
      status: "success",
      results: rows.length,
      data: {
        users: rows,
      },
    });
  },
);
export const getMe = (req: IRequest, res: Response, next: NextFunction) => {
  req.params.id = req.user.id;
  next();
};
// Get a single user by ID
export const getUser = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const [rows] = await db.execute("SELECT * FROM Users WHERE id = ?", [
      userId,
    ]);

    if (rows.length === 0) {
      return next(new ErrorHandler("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        user: rows[0],
      },
    });
  },
);
