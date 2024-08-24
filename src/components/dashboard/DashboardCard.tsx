"use client";

import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Profile } from "@prisma/client";

function DashboardCard({ data }: { data: Profile }) {
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data.id}`);
  };

  const deleteHandler = async () => {
    const res = await fetch(`/api/profile/delete/${data.id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <div className="mb-5 flex rounded-2xl border-2 border-primary/30">
      {/* <AdCard data={data} /> */}
      <div className="flex w-full items-end justify-between p-[10px]">
        <button
          onClick={editHandler}
          className="flex h-10 w-[48%] cursor-pointer items-center justify-center rounded-md border border-green-400 bg-background text-sm text-green-400"
        >
          ویرایش
          <FiEdit />
        </button>
        <button
          onClick={deleteHandler}
          className="flex h-10 w-[48%] cursor-pointer items-center justify-center rounded-md border border-destructive bg-background text-sm text-destructive"
        >
          حذف آگهی
          <AiOutlineDelete />
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default DashboardCard;
