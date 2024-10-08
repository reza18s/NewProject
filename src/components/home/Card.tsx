import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProfiles } from "@/types";

const AdCard = ({
  data: { title, location, price, id },
  profileImg,
  adImg,
}: {
  data: IProfiles;
  adImg: string;
  profileImg: string;
}) => {
  return (
    <Link href={`/profile/${id}`}>
      <div className="m-2 flex h-[220px] w-[95%] items-center gap-2 overflow-hidden rounded-lg border border-primary p-3 shadow-sm shadow-foreground md:h-[220px]">
        <div className="flex h-full grow flex-col">
          <h1 className="mx-auto h-6 w-3/5 bg-blue-900 text-center text-sm font-bold text-white">
            رهن و اجاره مسکونی
          </h1>
          <div className="h-6 bg-gray-300 text-center text-sm font-semibold">
            رهن و اجاره اپارتمان مسکونی
          </div>
          <div className="my-2 flex flex-row justify-between bg-gray-300 text-center text-sm font-semibold text-blue-900">
            <h3>رهن: 300/000/000تومان</h3>
            <h3>اجاره: 20/000/000تومان</h3>
          </div>
          <div className="flex flex-row justify-between gap-2">
            <div className="w-full bg-gray-300 text-center text-sm font-semibold">
              کداگهی:412
            </div>
            <div className="w-full bg-gray-300 text-center text-sm font-semibold">
              متراژ:200
            </div>
          </div>

          <div className="mt-2 flex flex-row justify-between gap-2">
            <div className="w-full bg-gray-300 text-center text-sm font-semibold">
              دماوند
            </div>
            <div className="w-full bg-gray-300 text-center text-sm font-semibold">
              تحویل:تخلیه
            </div>
          </div>
          <div className="mt-5 flex h-32 items-center justify-between">
            <div className="mt-auto">
              <h2 className="h-full text-sm font-semibold">
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
        <div className="relative h-full w-[150px] shrink-0 overflow-hidden rounded-lg">
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
