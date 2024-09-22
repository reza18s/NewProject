import Image from "next/image";
import React from "react";

const PropertySale = () => {
  return (
    <div className="flex bg-gray-100 p-5 pt-10 text-center">
      <div className="m-4 flex w-3/5 flex-col px-20">
        <h1 className="m-2 mx-auto h-20 w-3/5 bg-blue-900 text-center text-5xl font-bold text-white">
          رهن و اجاره مسکونی
        </h1>
        <div className="h-20 bg-gray-200 text-4xl font-semibold">
          رهن و اجاره اپارتمان مسکونی
        </div>
        <div className="my-4 flex h-20 flex-row justify-between bg-gray-200 text-center text-4xl font-semibold text-blue-900">
          <h3>رهن: 300/000/000تومان</h3>
          <h3>اجاره: 20/000/000تومان</h3>
        </div>
        <div className="my-4 flex h-20 flex-row justify-between gap-2">
          <div className="w-full bg-gray-200 text-center text-4xl font-semibold">
            کداگهی:412
          </div>
          <div className="w-full bg-gray-200 text-center text-4xl font-semibold">
            متراژ:200
          </div>
        </div>
        <div className="my-4 flex h-20 flex-row justify-between gap-2">
          <div className="w-full bg-gray-200 text-center text-4xl font-semibold">
            دماوند
          </div>
          <div className="w-full bg-gray-200 text-center text-4xl font-semibold">
            تحویل:تخلیه
          </div>
        </div>
        <div className="mt-5 flex h-32 justify-between">
          <div className="mt-auto">
            <h2 className="h-full text-3xl font-semibold">
              <span className="text-blue-900"> املاک دایان</span>/اقای
              شهبازی(100اگهی)
            </h2>
          </div>
          <div className="mb-[-80px] h-full w-32 shrink-0 overflow-hidden rounded-[50%] md:mb-[-90px]">
            <Image
              src={"/image/1.jpeg"}
              alt="Profiles"
              className="size-full object-cover"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
      <div className="h-[90%] w-2/5">
        <div className="absolute flex w-2/5 flex-row justify-end pl-20 pt-5 text-center">
          <div className="ml-5 h-12 w-32 bg-gray-300 text-2xl font-bold text-blue-800">
            قابل تبدیل
          </div>
          <div className="ml-5 h-12 w-32 bg-gray-300 text-2xl font-bold text-blue-800">
            سه ساعت پیش
          </div>
          <div className="h-12 w-32 bg-gray-300 text-2xl font-bold text-blue-800">
            بازدید:40نفر
          </div>
        </div>
        <Image
          src={"/image/1.jpeg"}
          alt=""
          className="size-full"
          width={1000}
          height={1000}
        ></Image>
      </div>
    </div>
  );
};

export default PropertySale;
