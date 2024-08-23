import { AddProfilePage } from "@/components/forms/AddProfilePage";
import { db } from "@/lib/db";

async function Edit({
  params: { profileId },
}: {
  params: { profileId: string };
}) {
  const profile = await db.profile.findUnique({ where: { id: profileId } });

  if (!profile) {
    return <h3>مشکلی پیش آمده است. لطفا دوباره امتحان کنید ...</h3>;
  }

  return <AddProfilePage data={JSON.parse(JSON.stringify(profile))} />;
}

export default Edit;
