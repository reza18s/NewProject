import { redirect } from "next/navigation";
import { db } from "@/lib/db"; // Assume db is a SQL client instance
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
  let profiles = [];
  try {
    const query = "SELECT * FROM Profiles WHERE published = false";
    const [results] = await db.execute(query);
    // @ts-expect-error the
    profiles = results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch profiles:", error);
    return <h3>مشکلی پیش آمده است</h3>;
  }

  return (
    <DashboardSidebar role={user?.role} phoneNumber={user.phoneNumber}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}
