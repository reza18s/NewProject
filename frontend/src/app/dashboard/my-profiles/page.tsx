import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MyProfilesPage from "@/components/dashboard/MyProfilesPage";
import { getSession } from "@/utils/query";

// Mark this page as dynamic because it relies on session data or cookies
export const dynamic = "force-dynamic";

async function Myprofiles() {
  const user = await getSession();

  // Redirect if user is not logged in
  if (!user) {
    redirect("/signin");
  }

  // Fetch profiles for the logged-in user
  const profiles = await db.profiles.findMany({
    where: { userId: user.id }, // Ensure the userId is passed correctly
  });

  // Render the MyProfilesPage component with the fetched profiles
  return <MyProfilesPage profiles={profiles} />;
}

export default Myprofiles;
