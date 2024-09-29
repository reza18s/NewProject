import { IProfiles } from "@/types";
import AdminCard from "./AdminCard";

function AdminPage({ profiles }: { profiles: IProfiles[] }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className="rounded-xl bg-destructive/20 px-[15px] py-[10px] text-lg text-destructive">
          هیچ آگهی در انتظار تاییدی وجود ندارد
        </p>
      )}
      {profiles.map((i) => (
        <AdminCard key={i.id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
