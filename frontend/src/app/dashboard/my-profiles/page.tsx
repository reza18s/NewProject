import { db } from "@/lib/db"; // Assume db is a SQL client instance
import { redirect } from "next/navigation";
import MyProfilesPage from "@/components/dashboard/MyProfilesPage";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";

// Mark this page as dynamic because it relies on session data or cookies
export const dynamic = "force-dynamic";

async function Myprofiles() {
  const cookieStore = cookies().get("jwt");
  const user = await getSession(cookieStore?.value);

  // Redirect if user is not logged in
  if (!user) {
    redirect("/signin");
  }

  // Fetch profiles for the logged-in user using raw SQL
  let profiles = [];
  try {
    const query = "SELECT * FROM Profiles WHERE userId = ?";
    const [results] = await db.execute(query, [user.id]);
    // @ts-expect-error the
    profiles = results;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to fetch profiles:", error);
    return <h3>مشکلی پیش آمده است</h3>;
  }

  // Render the MyProfilesPage component with the fetched profiles
  return <MyProfilesPage profiles={profiles} />;
}

export default Myprofiles;
