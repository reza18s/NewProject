import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/utils/auth';
import { db } from '@/lib/db';
import { signupObject } from '@/validator';

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = signupObject.parse(await req.json());
    console.log({ email, password });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'لطفا اطلاعات معتبر وارد کنید' },
        { status: 422 },
      );
    }

    const existingUser = await db.users.findUnique({
      where: { email },
    });
    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { error: 'این حساب کاربری وجود دارد' },
        { status: 422 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.users.create({
      data: {
        name,
        email: email,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    return NextResponse.json(
      { message: 'حساب کاربری ایجاد شد' },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'مشکلی در سرور رخ داده است' },
      {
        status: 500,
      },
    );
  }
}
