"use client";
import React from "react";
import AdCard from "./Card";
import { useData } from "@/stores/useData";
import { IProfiles } from "@/types";

const AdList = () => {
  const { data } = useData((state) => state);
  return (
    <div>
      <div className="grid w-full max-w-[1500px] grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {!data || data.length === 0 ? (
          <p className="h-12 rounded-lg bg-destructive/20 px-2 py-3 text-lg text-destructive">
            هیچ آگهی ثبت نشده است
          </p>
        ) : (
          data.map((data: IProfiles) => (
            <AdCard
              key={data.id}
              data={data}
              adImg={"/image/1.jpeg"}
              profileImg={"/image/2.jpg"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AdList;
