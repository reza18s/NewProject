import DashboardSidebar from "@/components/layout/DashboardSidebar";
import React from "react";
import { getSession } from "@/utils/query";

export const metadata = {
  title: "پنل کاربری املاک | پروژه بوتواستارت",
};

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();

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
