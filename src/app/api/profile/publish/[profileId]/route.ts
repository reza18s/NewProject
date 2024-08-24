import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
export async function PATCH(req: NextRequest, context: any) {
  try {
    const id = context.params.profileId;
    //@ts-ignore
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
        {
          error: "حساب کاربری یافت نشد",
        },
        { status: 404 },
      );
    }
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "دسترسی محدود" },
        {
          status: 403,
        },
      );
    }

    await db.profile.update({
      where: { id: id },
      data: { published: true },
    });

    return NextResponse.json({ message: "آگهی منتشر شد" }, { status: 200 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
