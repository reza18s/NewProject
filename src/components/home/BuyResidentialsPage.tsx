"use client";
import Sidebar from "../sidebar/Sidebar";
import AdList from "./AdList";
import { useData } from "@/stores/useData";
import { useEffect } from "react";
import { Profiles } from "@prisma/client";
function BuyResidentialsPage({ data }: { data: Profiles[] }) {
  const { setData } = useData((state) => state);
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <div className="mt-20 flex">
      <div className="ml-10 mt-1 flex h-fit w-[220px] flex-col items-center rounded-lg px-7 py-4 shadow-md shadow-primary/50">
        <Sidebar />
      </div>
      <div className="flex w-full flex-wrap justify-start">
        <AdList />
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
