import DashboardSidebar from "@/components/layout/DashboardSidebar";
import React from "react";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";

export const metadata = {
  title: "پنل کاربری املاک | پروژه بوتواستارت",
};

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies().get("jwt");
  const user = await getSession(cookieStore?.value);

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
