"use client";
import { IProfiles } from "@/types";
import Sidebar from "../sidebar/Sidebar";
import AdList from "./AdList";
import { useData } from "@/stores/useData";
import { useEffect, useRef } from "react";
import "react-slideshow-image/dist/styles.css";
import Carousel from "../global/carousel";
const DATA = ["/image/3.jpg", "/image/1.jpg", "/image/2.jpg"];
function BuyResidentialsPage({ data }: { data: IProfiles[] }) {
  const { setData } = useData((state) => state);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setData(data);
  }, [data]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  return (
    <div className="mt-24 w-full">
      <div className="flex flex-col gap-4 lg:ml-7 lg:h-60 lg:flex-row">
        <div className="size-full lg:w-[68%]">
          <Carousel images={DATA} />
        </div>
        <div className="flex size-full justify-end lg:h-60 lg:w-[33%]">
          <video
            className="w-full lg:h-60"
            ref={videoRef}
            onClick={handleVideoClick}
            controls
            style={{ cursor: "pointer" }}
            preload="metadata" // Preload video metadata but not the entire video
          >
            <source src={"/video1.webm"} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <div className="mt-1 h-fit w-full max-w-[300px] flex-col items-center border-2 px-7 py-4 sm:flex">
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
