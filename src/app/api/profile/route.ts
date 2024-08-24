import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { createProfileObject, updateProfileObject } from "@/validator";

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.url?.split("?")[1]);
    const query = [
      { name: "category", value: "category" },
      { name: "search", value: "title", op: true },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const searchObj: { [key: string]: any } = {};
    query.map((el) => {
      if (searchParams.get(el.name)) {
        searchObj[el.value] = el.op
          ? { $in: new RegExp(searchParams.get(el.name)!, "i") }
          : searchParams.get(el.name);
      }
    });
    const profiles = await db.profile.findMany({ where: searchObj });
    return NextResponse.json(
      {
        data: profiles,
      },
      { status: 200 },
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
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
    } = createProfileObject.parse(await req.json());

    // @ts-expect-error bec
    const session = await getServerSession(req);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 },
      );
    }

    const user = await db.users.findUnique({
      where: { phoneNumber: session.user.phoneNumber },
    });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }

    await db.profile.create({
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
    return NextResponse.json(
      { message: "آگهی جدید اضافه شد" },
      { status: 201 },
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const {
      id,
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      category,
      amenities,
      rules,
      province,
      city,
    } = updateProfileObject.parse(await req.json());
    // @ts-expect-error bec
    const session = await getServerSession(req);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 },
      );
    }

    const user = await db.users.findUnique({
      where: { phoneNumber: session.user.phoneNumber },
    });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }

    const profile = await db.profile.findUnique({ where: { id: id } });
    if (!profile) {
      return NextResponse.json({ error: "پروفایل یافت نشد" }, { status: 404 });
    }
    if (user.id !== profile?.userId) {
      return NextResponse.json(
        {
          error: "دستری شما به این آگهی محدود شده است",
        },
        { status: 403 },
      );
    }
    await db.profile.update({
      where: { id: id },
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
      },
    });

    return NextResponse.json(
      {
        message: "آگهی با موفقیت ویرایش شد",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
