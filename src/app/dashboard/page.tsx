import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { getSession } from "@/utils/query";

async function Dashboard() {
  const user = await getSession();
  if (!user) {
    redirect("/signin");
  }
  return <DashboardPage createdAt={user!.createdAt} />;
}

export default Dashboard;
