import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "../global/LogoutButton";
import React from "react";

async function DashboardSidebar({
  children,
  phoneNumber,
  role,
}: {
  children: React.ReactNode;
  phoneNumber: string;
  role: string;
}) {
  return (
    <div className="mt-20 flex h-full justify-between">
      <div className="ml-[40px] flex h-[650px] h-fit w-[350px] flex-col items-center gap-6 border border-secondary-foreground px-[15px] py-[30px]">
        <Link
          href="/dashboard/my-profiles"
          className="mx-2 my-0 -mt-3 w-full text-xl font-normal"
        >
          پنل اختصاصی و اگهی های من
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          چت و پیام های من
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          تنظیمات داشبورد
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          احراز هویت
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          شارژ پول
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          پرداخت و ترانکشهای من
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          نشان ها
        </Link>{" "}
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal">
          بازدید ها
        </Link>
        <Link href="" className="mx-2 my-0 w-full text-xl font-normal"></Link>
        <LogoutButton />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default DashboardSidebar;
