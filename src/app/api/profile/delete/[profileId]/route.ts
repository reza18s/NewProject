import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

export async function DELETE(req: NextRequest, context: any) {
  try {
    const id = context.params.profileId;
    // @ts-ignore
    const session = await getServerSession(req);
    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "لطفا وارد حساب کاربری خود شوید",
        },
        { status: 401 },
      );
    }

    const user = await db.users.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "حساب کاربری یافت نشد",
        },
        { status: 404 },
      );
    }
    console.log(id);
    const profile = await db.profile.delete({
      where: { id: id },
    });
    // if (!user.id.equals(profile.userId)) {
    //   return NextResponse.json(
    //     {
    //       error: 'دستری شما به این آگهی محدود شده است',
    //     },
    //     { status: 403 },
    //   );
    // }

    return NextResponse.json(
      { message: "آگهی موردنظر حذف شد" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
