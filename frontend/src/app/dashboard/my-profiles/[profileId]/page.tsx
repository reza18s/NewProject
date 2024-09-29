import { AddProfilePage } from "@/components/forms/AddProfilePage";
import { db } from "@/lib/db"; // Assume db is a SQL client instance

async function Edit({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  // Fetch the profile using raw SQL
  let profile;
  try {
    const query = "SELECT * FROM Profiles WHERE id = ?";
    const [results] = await db.execute(query, [profileId]);
    // @ts-expect-error the
    profile = results[0]; // Assuming results is an array
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return <h3>مشکلی پیش آمده است. لطفا دوباره امتحان کنید ...</h3>;
  }

  // If profile is not found, return error message
  if (!profile) {
    return <h3>مشکلی پیش آمده است. لطفا دوباره امتحان کنید ...</h3>;
  }

  // Pass the profile data to the AddProfilePage component
  return <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />;
}

export default Edit;
