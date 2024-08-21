import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { createProfileObject } from '@/validator';

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URLSearchParams(req.url?.split('?')[1]);
    const query = [
      { name: 'category', value: 'category' },
      { name: 'search', value: 'title', op: true },
    ];
    const searchObj: { [key: string]: any } = {};
    query.map((el) => {
      if (searchParams.get(el.name)) {
        searchObj[el.value] = el.op
          ? { $in: new RegExp(searchParams.get(el.name)!, 'i') }
          : searchParams.get(el.name);
      }
    });
    const profiles = await db.profile.findMany({ where: searchObj });
    console.log(profiles);
    return NextResponse.json(
      {
        data: profiles,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'مشکلی در سرور رخ داده است' },
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
    // @ts-ignore
    const session = await getServerSession(req);
    if (!session?.user) {
      return NextResponse.json(
        {
          error: 'لطفا وارد حساب کاربری خود شوید',
        },
        { status: 401 },
      );
    }

    const user = await db.users.findUnique({
      where: { email: session.user.email! },
    });
    if (!user) {
      return NextResponse.json(
        { error: 'حساب کاربری یافت نشد' },
        { status: 404 },
      );
    }

    const newProfile = await db.profile.create({
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
    console.log(newProfile);
    return NextResponse.json(
      { message: 'آگهی جدید اضافه شد' },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'مشکلی در سرور رخ داده است' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const {
      _id,
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
    } = await req.json();
    // @ts-ignore
    const session = await getServerSession(req);
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: 'لطفا وارد حساب کاربری خود شوید',
        },
        { status: 401 },
      );
    }

    const user = await db.users.findUnique({
      where: { email: session.user.email! },
    });
    if (!user) {
      return NextResponse.json(
        { error: 'حساب کاربری یافت نشد' },
        { status: 404 },
      );
    }

    const profile = await db.profile.findUnique({ where: { id: _id } });
    if (!profile) {
      return NextResponse.json({ error: 'پروفایل یافت نشد' }, { status: 404 });
    }
    if (user.id === profile?.userId) {
      return NextResponse.json(
        {
          error: 'دستری شما به این آگهی محدود شده است',
        },
        { status: 403 },
      );
    }

    profile.title = title;
    profile.description = description;
    profile.location = location;
    profile.phone = phone;
    profile.realState = realState;
    profile.price = price;
    profile.constructionDate = constructionDate;
    profile.amenities = amenities;
    profile.rules = rules;
    profile.category = category;
    profile.province = province;
    profile.city = city;

    return NextResponse.json(
      {
        message: 'آگهی با موفقیت ویرایش شد',
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: 'مشکلی در سرور رخ داده است' },
      { status: 500 },
    );
  }
}
