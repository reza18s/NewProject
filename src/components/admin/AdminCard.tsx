"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { sp } from "@/utils/replaceNumber";
import { IProfiles } from "@/types";

function AdminCard({
  data: { id, title, description, location, price },
}: {
  data: IProfiles;
}) {
  const router = useRouter();

  const publishHandler = async () => {
    const res = await fetch(`/api/profile/publish/${id}`, { method: "PATCH" });
    const result = await res.json();
    if (result.message) {
      toast.success(result.message);
      router.refresh();
    }
  };

  return (
    <div className="mb-20 border-b-2 border-primary/60 pb-[10px]">
      <h3 className="mb-5 text-lg font-normal text-primary">{title}</h3>
      <p className="mb-5 text-justify">{description}</p>
      <div className="mb-5 flex">
        <span className="ml-[15px] rounded-sm bg-primary/30 px-[10px] py-[5px] text-primary">
          {location}
        </span>
        <span className="ml-[15px] rounded-sm bg-primary/30 px-[10px] py-[5px] text-primary">
          {sp(price)}
        </span>
      </div>
      <button
        className="mt-5 cursor-pointer rounded-md border-none bg-green-400 px-[10px] py-[5px] text-sm text-background transition-all duration-100 ease-in hover:text-foreground"
        onClick={publishHandler}
      >
        انتشار
      </button>
    </div>
  );
}

export default AdminCard;
