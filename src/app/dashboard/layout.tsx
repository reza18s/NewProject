import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { db } from "@/lib/db";
import React from "react";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "پنل کاربری املاک | پروژه بوتواستارت",
};

async function DashboardLayout({ children }: { children: React.ReactNode }) {
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
