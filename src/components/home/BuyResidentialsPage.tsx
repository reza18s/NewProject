"use client";
import { IProfiles } from "@/types";
import Sidebar from "../sidebar/Sidebar";
import AdList from "./AdList";
import { useData } from "@/stores/useData";
import { useEffect } from "react";
import "react-slideshow-image/dist/styles.css";
import Carousel from "../global/carousel";
const DATA = [
  { image: "/image/image1.jpg" },
  { image: "/image/image2.jpg" },
  { image: "/image/image3.jpg" },
];
function BuyResidentialsPage({ data }: { data: IProfiles[] }) {
  const { setData } = useData((state) => state);
  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <div className="mt-16">
      <div className="flex h-60 gap-4">
        <div className="h-full w-full bg-primary"></div>
        <video height={160} width={400}>
          <source src="/video1.webm" type="video/webm" />
        </video>
      </div>
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="mt-1 h-fit w-[400px] flex-col items-center border-2 px-7 py-4 sm:flex">
          <Sidebar />
        </div>
        <div className="flex w-full flex-wrap justify-center md:justify-center">
          <AdList />
        </div>
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
