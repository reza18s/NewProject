import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import AdminPage from "@/components/admin/AdminPage";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export const metadata = {
  title: "پنل ادمین املاک | پروژه بوتواستارت",
};

async function Admin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  const user = await db.users.findUnique({
    where: { phoneNumber: session.user.phoneNumber },
  });
  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const profiles = await db.profile.findMany({ where: { published: false } });

  return (
    <DashboardSidebar role={user?.role} phoneNumber={user.phoneNumber}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
