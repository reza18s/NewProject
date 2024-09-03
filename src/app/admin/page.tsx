import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AdminPage from "@/components/admin/AdminPage";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getSession } from "@/utils/query";

export const metadata = {
  title: "پنل ادمین املاک | پروژه بوتواستارت",
};

async function Admin() {
  const user = await getSession();
  if (!user) {
    redirect("/signin");
  }
  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const profiles = await db.profiles.findMany({ where: { published: false } });

  return (
    <DashboardSidebar role={user?.role} phoneNumber={user.phoneNumber}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
