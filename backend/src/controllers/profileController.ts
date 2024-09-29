import { NextFunction, Request, Response } from "express";
import { db } from "../utils/db"; // Assuming db is a MySQL connection
import { catchAsync } from "../utils/catchAsync";
import { createProfileObject, updateProfileObject } from "../validator";
import { IRequest } from "../types";
import { ErrorHandler } from "../utils/ErrorHandler";
import { createId } from "@paralleldrive/cuid2";

// Get multiple profiles with optional search parameters
export const getProfiles = catchAsync(async (req: Request, res: Response) => {
  const searchParams = req.query;
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  if (searchParams.category) {
    conditions.push("category = ?");
    values.push(searchParams.category);
  }
  if (searchParams.search) {
    conditions.push("title LIKE ?");
    values.push(`%${searchParams.search}%`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const [profiles] = await db.query(
    `SELECT * FROM Profiles ${whereClause}`,
    values,
  );
  res.status(200).json({ data: profiles });
});

// Get a single profile by ID
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const [profiles] = await db.query(`SELECT * FROM Profiles WHERE id = ?`, [
    id,
  ]);

  if (profiles.length === 0) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.status(200).json({ data: profiles[0] });
});

// Create a new profile
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
      tag,
    } = createProfileObject.parse(req.body);

    const user = await db.query(`SELECT * FROM Users WHERE phoneNumber = ?`, [
      req.user.phoneNumber,
    ]);

    if (user[0].length === 0) {
      return next(new ErrorHandler("حساب کاربری یافت نشد", 404));
    }

    const userId = user[0][0].id;
    const id = createId();

    const result = await db.query(
      `INSERT INTO Profiles (id , title, description, location, phone, realState, constructionDate, amenities, rules, province, city, tag, category, price, userId,createdAt,updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`,
      [
        id,
        title,
        description,
        location,
        phone,
        realState,
        new Date(constructionDate),
        amenities,
        rules,
        province,
        city,
        tag,
        category,
        price,
        userId,
        new Date(Date.now()),
        new Date(Date.now()),
      ],
    );
    console.log(result);
    res.status(201).json({
      message: "آگهی جدید اضافه شد",
      data: { id: id, ...req.body },
    });
  },
);

// Update an existing profile
export const updateProfile = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const data = updateProfileObject.parse(req.body);
    data["updatedAt"] = new Date(Date.now());

    const [existingProfile] = await db.query(
      `SELECT * FROM Profiles WHERE id = ? AND userId = ?`,
      [id, req.user.id],
    );

    if (existingProfile.length === 0) {
      return next(new ErrorHandler("Profile not found or not authorized", 404));
    }

    const updates = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const valuesArray = Object.keys(data).map((key) => {
      if (key == "constructionDate") {
        return new Date(data[key]);
      } else {
        return data[key];
      }
    });
    const values = [...valuesArray, id, req.user.id];

    await db.query(
      `UPDATE Profiles SET ${updates} WHERE id = ? AND userId = ?`,
      values,
    );

    res.status(200).json({ message: "آگهی به روز شد", data });
  },
);

// Remove a profile
export const removeProfile = catchAsync(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const [existingProfile] = await db.query(
      `SELECT * FROM Profiles WHERE id = ? AND userId = ?`,
      [id, req.user.id],
    );

    if (existingProfile.length === 0) {
      return next(new ErrorHandler("Profile not found or not authorized", 404));
    }

    await db.query(`DELETE FROM Profiles WHERE id = ? AND userId = ?`, [
      id,
      req.user.id,
    ]);

    res.status(200).json({ message: "آگهی حذف شد", data: null });
  },
);
