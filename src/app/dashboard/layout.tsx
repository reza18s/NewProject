import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { db } from "@/lib/db";
import React from "react";

export const metadata = {
  title: "پنل کاربری املاک | پروژه بوتواستارت",
};

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  const user = await db.users.findUnique({
    where: { phoneNumber: session.user.phoneNumber },
  });

  if (!user) {
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return (
    <DashboardSidebar role={user.role} phoneNumber={user.phoneNumber}>
      {children}
    </DashboardSidebar>
  );
}

export default DashboardLayout;
