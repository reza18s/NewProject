import { IProfiles } from "@/types";
import DashboardCard from "./DashboardCard";

function MyProfilesPage({ profiles }: { profiles: IProfiles[] }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className="rounded-md bg-destructive/20 px-[15px] py-[10px] text-sm text-destructive">
          هیچ آگهی ثبت نشده است
        </p>
      )}
      {profiles.map((i) => (
        <DashboardCard key={i.id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default MyProfilesPage;
