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
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });
  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const profiles = await db.profile.findMany({ where: { published: false } });

  return (
    <DashboardSidebar role={user?.role} email={user?.email}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
