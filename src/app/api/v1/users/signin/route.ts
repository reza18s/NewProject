import { db } from "@/lib/db";
import { signinObject, signupObject } from "@/validator";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber) {
      return NextResponse.json({ message: "user not found" }, { status: 500 });
    }

    // Find the user by phone number
    const [userRows] = await db.execute(
      "SELECT * FROM Users WHERE phoneNumber = ?",
      [phoneNumber],
    );

    // @ts-expect-error the
    if (userRows.length < 0) {
      return NextResponse.json({ message: "user not found" }, { status: 500 });
    }

    // @ts-expect-error the
    const user = userRows[0];
    const token = sign(
      { id: user.id, phoneNumber: user.phoneNumber },
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
          user,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
