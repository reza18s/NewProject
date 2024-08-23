import AdminCard from "./AdminCard";
import { Profile } from "@prisma/client";

function AdminPage({ profiles }: { profiles: Profile[] }) {
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
