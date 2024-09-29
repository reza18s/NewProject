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
    <div className="mt-10 flex">
      <div className="ml-10 mt-1 hidden h-fit w-[400px] flex-col items-center rounded-lg px-7 py-4 shadow-md shadow-primary/50 sm:flex">
        <Sidebar />
      </div>
      <div className="flex w-full flex-wrap justify-start">
        <AdList />
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
