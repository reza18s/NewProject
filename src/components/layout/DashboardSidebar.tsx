import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import LogoutButton from "../global/LogoutButton";
import React from "react";

async function DashboardSidebar({
  children,
  email,
  role,
}: {
  children: React.ReactNode;
  email: string;
  role: string;
}) {
  return (
    <div className="mt-20 flex justify-between">
      <div className="ml-[40px] flex h-fit w-[220px] flex-col items-center rounded-md px-[15px] py-[30px] shadow-md shadow-primary/30">
        <CgProfile className="text-5xl text-primary" />
        {role === "ADMIN" ? "ادمین" : null}
        <p className="mt-[30px] text-lg font-normal text-foreground/70">
          {email}
        </p>
        <span className="mb-[30px] h-px w-full bg-foreground/50"></span>
        <Link href="/dashboard" className="mx-2 my-0 w-full font-normal">
          حساب کاربری
        </Link>
        <Link
          href="/dashboard/my-profiles"
          className="mx-2 my-0 w-full font-normal"
        >
          آگهی های من
        </Link>
        <Link href="/dashboard/add" className="mx-2 my-0 w-full font-normal">
          ثبت آگهی
        </Link>
        {role === "ADMIN" ? (
          <Link href="/admin" className="mx-2 my-0 w-full font-normal">
            در انتظار تایید
          </Link>
        ) : null}
        <LogoutButton />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

export default DashboardSidebar;
