import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import AdminPage from "@/components/admin/AdminPage";
import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getSession } from "@/utils/query";

export const metadata = {
  title: "پنل ادمین املاک | پروژه بوتواستارت",
};

export default async function Admin() {
  // Fetch user session on the server side
  const user = await getSession();

  // Redirect based on session and role
  if (!user) {
    redirect("/signin");
  } else if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch profiles only if user is an admin
  const profiles = await db.profiles.findMany({ where: { published: false } });

  return (
    <DashboardSidebar role={user?.role} phoneNumber={user.phoneNumber}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}
