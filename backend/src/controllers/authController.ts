import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sign, verify } from "jsonwebtoken";
import { signinObject, signupObject } from "../validator";
import { db } from "../utils/db";
import { Users } from "@prisma/client";
import { ErrorHandler } from "../utils/ErrorHandler";
import { IDecoded, IRequest } from "../types";
export const createToken = (res: Response, statusCode: number, user: Users) => {
  try {
    const token = sign(
      { id: user.id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      expires: new Date(
        Date.now() + +process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000,
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
    console.log(error);
    res.status(400).json({
      status: "failed",
    });
  }
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = signupObject.parse(req.body);

    const existingUser = await db.users.findUnique({
      where: { phoneNumber },
    });

    if (existingUser) {
      return next(new ErrorHandler("this user is already exists", 400));
    }

    const user = await db.users.create({
      data: {
        phoneNumber: phoneNumber,
      },
    });
    createToken(res, 201, user);
  },
);
export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber } = signinObject.parse(req.body);

    if (!phoneNumber) {
      return next(new ErrorHandler("please inter your phoneNumber", 400));
    }
    const user = await db.users.findUnique({
      where: { phoneNumber },
    });
    //create Express Password Checker
    createToken(res, 201, user);
  },
);
export const protect = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token && req.headers.cookie) {
      token = req.headers.cookie.split("=")[1];
      console.log(token);
    }
    if (!token) {
      return next(
        new ErrorHandler(
          "Your not logged in! please log in to get access ",
          400,
        ),
      );
    }
    const decoded: IDecoded = verify(token, process.env.JWT_SECRET);
    const currentUser = await db.users.findUnique({
      where: { id: decoded.id },
    });

    if (!currentUser) {
      return next(
        new ErrorHandler(
          "The user belonging to this token does no longer exist",
          400,
        ),
      );
    }
    req.user = currentUser;
    next();
  },
);
