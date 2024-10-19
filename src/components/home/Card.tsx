import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProfiles } from "@/types";
import { MdLocationPin } from "react-icons/md";

const AdCard = ({
  data,
  profileImg,
  adImg,
}: {
  data: IProfiles;
  adImg: string;
  profileImg: string;
}) => {
  return (
    <Link href={`/profile/${data.id}`}>
      <div className="m-2 flex h-[170px] w-[95%] items-center gap-2 overflow-hidden border-b border-gray-300 p-3 md:h-[170px]">
        <div className="flex h-full grow flex-col">
          <h1 className="h-6 w-full text-sm font-bold text-primary">
            {data.title}
          </h1>
          <div className="h-6 text-xs font-semibold">{data.description}</div>
          <div className="mt-2 flex flex-row justify-between gap-2">
            <div className="w-full text-xs font-semibold">کداگهی:412</div>
            <div className="w-full text-xs font-semibold">متراژ:200</div>
          </div>

          <div className="mt-1 flex flex-row justify-between gap-2">
            <div className="flex w-full text-xs font-bold">
              <MdLocationPin className=""></MdLocationPin>دماوند
            </div>
            <div className="w-full text-xs font-semibold">تحویل:تخلیه</div>
          </div>
          <div className="mt-1 flex flex-row justify-between gap-2 bg-gray-300 text-primary">
            <div className="w-full pt-1 text-[9px] font-semibold">
              300/000/000تومان
            </div>
            <div className="w-full pt-1 text-[9px] font-semibold">
              20/000/000تومان
            </div>
          </div>
          <div className="mt-2 flex h-32 items-center justify-between">
            <div className="mt-auto">
              <h2 className="h-full text-xs font-semibold">
                <span className="text-blue-900"> املاک دایان</span>/اقای
                شهبازی(100اگهی)
              </h2>
            </div>

            <div className="mt-auto size-8 overflow-hidden rounded-[50%]">
              <Image
                src={"/image/1.jpeg"}
                alt="Profiles"
                className="size-full object-cover"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <div className="relative h-full w-[45%] max-w-52 shrink-0 overflow-hidden rounded-sm border-2 border-gray-500">
          <div className="absolute flex w-full justify-end gap-1">
            <div className="h-4 w-11 text-nowrap bg-gray-300 pt-1 text-center text-[7px] font-bold text-blue-800">
              قابل تبدیل
            </div>
            <div className="h-4 w-11 text-nowrap bg-gray-300 pt-1 text-center text-[7px] font-bold text-blue-800">
              سه ساعت پیش
            </div>
            <div className="h-4 w-11 text-nowrap bg-gray-300 pt-1 text-center text-[7px] font-bold text-blue-800">
              بازدید:40نفر
            </div>
          </div>
          <Image
            src={adImg}
            alt="Ad"
            className="size-full object-cover"
            width={150}
            height={200}
          />
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
