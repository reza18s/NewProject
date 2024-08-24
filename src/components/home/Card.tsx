import React from "react";
import Image from "next/image";
import { Profile } from "@prisma/client";

const AdCard = ({
  data: { title, location, price },
  profileImg,
  adImg,
}: {
  data: Profile;
  adImg: string;
  profileImg: string;
}) => {
  return (
    <div className="m-2 flex h-[150px] w-[300px] items-center overflow-hidden rounded-lg border border-primary p-3 shadow-sm shadow-foreground md:h-[120px]">
      <div className="relative h-full w-[150px] shrink-0 overflow-hidden rounded-lg">
        <Image
          src={adImg}
          alt="Ad"
          className="size-full object-cover"
          width={150}
          height={100}
        />
      </div>
      <div className="flex grow flex-col justify-center pr-3">
        <h3 className="flex w-full flex-wrap pb-1 font-['YekanBakh'] text-sm font-bold">
          {title}
        </h3>
        <p className="m-0 text-sm font-medium text-foreground/60">{price}</p>
        <p className="m-0 text-xs font-medium text-foreground/60">{location}</p>
        <p className="text-xs font-normal">{"user"}</p>
      </div>
      <div className="mb-[-60px] size-8 shrink-0 overflow-hidden rounded-[50%]">
        <Image
          src={profileImg}
          alt="Profile"
          className="size-full object-cover"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default AdCard;
