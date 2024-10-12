import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";
import "react-slideshow-image/dist/styles.css";

async function Dashboard() {
  const cookieStore = cookies().get("jwt");
  const user = await getSession(cookieStore?.value);
  if (!user) {
    redirect("/signin");
  }
  return <DashboardPage createdAt={user!.createdAt} />;
}

export default Dashboard;
