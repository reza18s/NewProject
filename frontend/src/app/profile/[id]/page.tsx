import Image from "next/image";
import React from "react";

const PropertySale = () => {
  return (
    <div className="flex bg-gray-100 p-5 pt-10">
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
      </div>
      <Image
        src={"/image/1.jpeg"}
        alt=""
        className="h-[90%] w-2/5"
        width={1000}
        height={1000}
      ></Image>
    </div>
  );
};

export default PropertySale;
