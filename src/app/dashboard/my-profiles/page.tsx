import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MyProfilesPage from "@/components/dashboard/MyProfilesPage";
import { getSession } from "@/utils/query";

async function Myprofiles() {
  const user = await getSession();
  if (!user) {
    redirect("/signin");
  }
  const profile = await db.profiles.findMany({
    where: { userId: user?.id },
  });
  return <MyProfilesPage profiles={profile} />;
}

export default Myprofiles;
