import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MyProfilesPage from "@/components/dashboard/MyProfilesPage";

async function Myprofiles() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  const user = await db.users.findUnique({
    where: { phoneNumber: session.user.phoneNumber },
  });
  if (!user) {
    redirect("/signin");
  }
  const profile = await db.profiles.findMany({
    where: { userId: user?.id },
  });
  return <MyProfilesPage profiles={profile} />;
}

export default Myprofiles;
