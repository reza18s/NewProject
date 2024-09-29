// File: src/controllers/authController.ts
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sign, verify } from "jsonwebtoken";
import { signinObject, signupObject } from "../validator";
import { db } from "../utils/db";
import { ErrorHandler } from "../utils/ErrorHandler";
import { IDecoded, IRequest, IUser } from "../types";
import { createId } from "@paralleldrive/cuid2";

// Function to create a JWT token and send it as a cookie
export const createToken = (res: Response, statusCode: number, user: any) => {
  try {
    const token = sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Ensure cookies are secure in production
      expires: new Date(
        Date.now() +
          parseInt(process.env.COOKIES_EXPIRES!, 10) * 24 * 60 * 60 * 1000,
      ),
    });

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failed",
    });
  }
};

// User Signup
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = signupObject.parse(req.body);

    // Check if the user already exists
    const [existingUserRows] = await db.execute(
      "SELECT * FROM Users WHERE phoneNumber = ?",
      [phoneNumber],
    );

    if (existingUserRows.length > 0) {
      return next(new ErrorHandler("This user already exists", 400));
    }

    // Create a new user with a generated id
    const userId = createId();

    // Insert new user
    await db.execute(
      "INSERT INTO Users (id, phoneNumber,createdAt,updatedAt) VALUES (?, ?,?,?)",
      [userId, phoneNumber, new Date(Date.now()), new Date(Date.now())],
    );

    // Fetch the newly created user
    const [newUserRows] = await db.execute(
      "SELECT id, phoneNumber FROM Users WHERE id = ?",
      [userId],
    );

    const newUser = newUserRows[0];

    createToken(res, 201, newUser);
  },
);

// User Signin
export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = signinObject.parse(req.body);

    if (!phoneNumber) {
      return next(new ErrorHandler("Please enter your phone number", 400));
    }

    // Find the user by phone number
    const [userRows] = await db.execute(
      "SELECT * FROM Users WHERE phoneNumber = ?",
      [phoneNumber],
    );

    if (userRows.length === 0) {
      return next(new ErrorHandler("User does not exist", 400));
    }

    const user = userRows[0];

    // Create and send the token
    createToken(res, 201, user);
  },
);

// Middleware: Protect routes (authentication)
export const protect = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Get the token from the Authorization header or cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.cookie) {
      token = req.cookies.jwt;
      console.log(token);
    }

    if (!token) {
      return next(
        new ErrorHandler(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    try {
      // Verify the token
      const decoded = verify(token, process.env.JWT_SECRET!) as IDecoded;

      // Check if the user still exists
      const [userRows] = await db.execute("SELECT * FROM Users WHERE id = ?", [
        decoded.id,
      ]);

      if (userRows.length === 0) {
        return next(
          new ErrorHandler(
            "The user belonging to this token no longer exists.",
            401,
          ),
        );
      }

      // Attach the user to the request object
      req.user = userRows[0];
      next();
    } catch (err) {
      return next(
        new ErrorHandler("Token verification failed or token expired.", 401),
      );
    }
  },
);
