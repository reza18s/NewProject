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
    <div className="mt-16 w-full">
      <div className="flex h-60 gap-4 px-40">
        <div className="h-full w-1/2">
          <Carousel images={DATA} />
        </div>
        <video
          width="100%"
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
