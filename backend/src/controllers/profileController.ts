import { NextFunction, Request, Response } from "express";
import { db } from "../util/db";
import { catchAsync } from "../util/catchAsync";
import { createProfileObject, updateProfileObject } from "../validator";
import { IRequest } from "../types";
import { ErrorHandler } from "../util/ErrorHandler";

export const getProfiles = catchAsync(async (req: Request, res: Response) => {
  const searchParams = req.query;
  const query = [
    { name: "category", value: "category" },
    { name: "search", value: "title", op: true },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchObj: { [key: string]: any } = {};
  query.map((el) => {
    if (searchParams[el.name]) {
      searchObj[el.value] = el.op
        ? { contains: searchParams[el.name] }
        : searchParams[el.name];
    }
  });
  const profiles = await db.profiles.findMany({
    where: searchObj,
  });
  res.status(200).json({
    data: profiles,
  });
});
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const profiles = await db.profiles.findUnique({
    where: { id },
  });
  res.status(200).json({
    data: profiles,
  });
});
export const createProfile = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      category,
      province,
      city,
      amenities,
      rules,
    } = createProfileObject.parse(req.body);

    const user = await db.users.findUnique({
      where: { phoneNumber: req.user.phoneNumber },
    });
    if (!user) {
      return next(new ErrorHandler("حساب کاربری یافت نشد", 404));
    }

    const profile = await db.profiles.create({
      data: {
        title,
        description,
        location,
        phone,
        realState,
        constructionDate,
        amenities,
        rules,
        province,
        city,
        category,
        price,
        userId: user.id,
      },
    });
    res.status(201).json({ message: "آگهی جدید اضافه شد", data: profile });
  },
);
export const updateProfile = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = updateProfileObject.parse(req.body);

    const profile = await db.profiles.update({
      where: { id, userId: req.user.id },
      data: { ...data },
    });
    res.status(200).json({ data: profile });
  },
);
export const removeProfile = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const profile = await db.profiles.delete({
      where: { id, userId: req.user.id },
    });
    res.status(200).json({ message: "آگهی حذف شد", data: null });
  },
);
