import { db } from "@/lib/db";
import { signupObject } from "@/validator";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = signupObject.parse(await req.json());

    // Check if the user already exists
    const [existingUserRows] = await db.execute(
      "SELECT * FROM Users WHERE phoneNumber = ?",
      [phoneNumber],
    );
    // @ts-expect-error the
    if (existingUserRows.length > 0) {
      return NextResponse.json({ message: "user not found" }, { status: 500 });
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

    // @ts-expect-error the
    const newUser = newUserRows[0];
    const token = sign(
      { id: newUser.id, phoneNumber: newUser.phoneNumber },
      process.env.JWT_SECRET!,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    cookies().set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Ensure cookies are secure in production
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return NextResponse.json(
      {
        status: "success",
        data: {
          newUser,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
