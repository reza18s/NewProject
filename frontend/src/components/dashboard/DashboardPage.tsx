import { User2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

function DashboardPage({ createdAt }: { createdAt: Date }) {
  return (
    <div className="h-2/5 text-xl font-normal text-popover-foreground">
      {/* <div className="flex h-full w-4/5 items-center rounded-md border-2 border-border">
        <div className="">
          <div className="flex size-32 flex-col justify-end overflow-hidden rounded-full border-2 border-popover-foreground">
            <User2 className="-mb-10 size-full text-popover-foreground"></User2>
            <Button className="z-10 h-7 w-full bg-green-500">+</Button>
          </div>
          <div>
            <h1>لیلا شعبانی</h1>
            <div>
              <div>
                <h3>تایید شده</h3>
              </div>
              <p className="">09123456789</p>
            </div>
          </div>
        </div>

        <div className="mt-24 flex w-fit rounded-sm bg-primary/30 px-2 py-1">
          <p className="m-0 ml-3 font-normal">تاریخ عضویت:</p>
          <span className="text-primary">
            {new Date(createdAt).toLocaleDateString("fa-IR")}
          </span>
        </div>
      </div> */}
    </div>
  );
}

export default DashboardPage;
