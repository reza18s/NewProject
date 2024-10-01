"use client";
import { IProfiles } from "@/types";
import Sidebar from "../sidebar/Sidebar";
import AdList from "./AdList";
import { useData } from "@/stores/useData";
import { useEffect } from "react";
function BuyResidentialsPage({ data }: { data: IProfiles[] }) {
  const { setData } = useData((state) => state);
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <div className="mt-10 flex flex-col items-center gap-10 md:flex-row md:items-start">
      <div className="mt-1 h-fit w-[400px] flex-col items-center rounded-lg px-7 py-4 shadow-md shadow-primary/50 sm:flex">
        <Sidebar />
      </div>
      <div className="flex w-full flex-wrap justify-center md:justify-center">
        <AdList />
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
