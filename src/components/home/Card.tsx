import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProfiles } from "@/types";

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
      <div className="m-2 flex h-[170px] w-[95%] items-center gap-2 overflow-hidden rounded-lg p-3 md:h-[170px]">
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
            <div className="w-full text-xs font-bold">دماوند</div>
            <div className="w-full text-xs font-semibold">تحویل:تخلیه</div>
          </div>
          <div className="mt-1 flex flex-row justify-between gap-2 bg-gray-300 text-primary">
            <div className="w-full text-xs font-semibold">300/000/000تومان</div>
            <div className="w-full text-xs font-semibold">
              متر: 20/000/000تومان
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
        <div className="relative h-full w-[200px] shrink-0 overflow-hidden">
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
