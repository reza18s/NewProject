import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MyProfilesPage from "@/components/dashboard/MyProfilesPage";
import { Profile } from "@prisma/client";

async function Myprofiles() {
  // @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }

  const user = await db.users.findUnique({
    where: { email: session?.user?.email },
  });
  if (!user) {
    redirect("/signin");
  }
  const profile = await db.profile.findMany({
    where: { userId: user?.id },
  });
  // @ts-ignore
  return <MyProfilesPage profiles={profile} />;
}

export default Myprofiles;
