import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";

async function Dashboard() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }
  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });
  return <DashboardPage createdAt={user!.createdAt} />;
}

export default Dashboard;
