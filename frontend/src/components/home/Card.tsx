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
      <div className="m-2 flex h-[140px] w-[95%] items-center overflow-hidden rounded-lg border border-primary p-3 shadow-sm shadow-foreground md:h-[150px]">
        <div className="relative h-full w-[150px] shrink-0 overflow-hidden rounded-lg">
          <Image
            src={adImg}
            alt="Ad"
            className="size-full object-cover"
            width={150}
            height={100}
          />
        </div>
        <div className="flex h-full grow flex-col pr-3">
          <h3 className="flex w-full flex-wrap pb-1 font-['YekanBakh'] text-xs font-bold md:text-lg lg:text-lg">
            {title}
          </h3>
          <p className="m-0 text-sm font-medium text-foreground/60 md:text-base">
            {price}
          </p>
          <p className="m-0 text-xs font-medium text-foreground/60 md:text-sm">
            {location}
          </p>
          <p className="text-xs font-normal md:text-sm">{"user"}</p>
        </div>
        <div className="mb-[-80px] size-8 shrink-0 overflow-hidden rounded-[50%] md:mb-[-90px]">
          <Image
            src={profileImg}
            alt="Profiles"
            className="size-full object-cover"
            width={50}
            height={50}
          />
        </div>
      </div>
    </Link>
  );
};

export default AdCard;
