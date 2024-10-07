"use client"; // components/ModalWithCheckboxes.js
import React, { useState } from "react";
import useStore from "@/stores/useStore";
import { useData } from "@/stores/useData";
import { ChevronLeft } from "lucide-react";
import { Input } from "../ui/input";
import { province } from "@/constants";
export default function Filter() {
  const store = useStore(useData, (state) => state);
  const [filterType, setFilterType] = useState<
    "province" | "city" | "district"
  >("province");
  const [Provinces, setProvinces] = useState<string[]>(Object.keys(province));
  const [Cities, setCities] = useState<string[]>(
    Object.keys(province["البرز"]),
  );
  const [Districts, setDistrict] = useState<string[]>(
    Object.keys(province["البرز"]["صنعتی"]),
  );
  const [selectProvince, setSelectProvince] = useState<string>("البرز");
  const [selectCity, setSelectCity] = useState<string>("صنعتی");
  return (
    <>
      <div className="my-[20px] flex flex-col gap-3 text-base">
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <button
            className={`${filterType === "province" && "bg-primary"} h-10 w-1/4 border border-gray-600/20 bg-gray-300 text-sm font-medium md:text-lg lg:text-xl`}
            onClick={() => setFilterType("province")}
          >
            انتخاب استان
          </button>
          <button
            className={`${filterType === "city" && "bg-primary"} h-10 w-1/4 border border-gray-600/20 bg-gray-300 text-sm font-medium md:text-lg lg:text-xl`}
            onClick={() => setFilterType("city")}
          >
            انتخاب شهر
          </button>
          <button
            className={`${filterType === "district" && "bg-primary"} h-10 w-1/4 border border-gray-600/20 bg-gray-300 text-sm font-medium md:text-lg lg:text-xl`}
            onClick={() => setFilterType("district")}
          >
            بخش/منطقه
          </button>
          <button
            className="h-10 w-1/4 border border-gray-600/20 bg-gray-300 text-sm font-medium md:text-lg lg:text-xl"
            onClick={() => setFilterType("province")}
          >
            حذف همه
          </button>
        </div>
        <div className="flex">
          <Input
            placeholder="جستجوی اگهی"
            className="bg-gray-300"
            onChange={(e) => {
              const val = e.target.value;
              switch (filterType) {
                case "province":
                  setProvinces(() => {
                    return Object.keys(province).filter((value) =>
                      value.includes(val),
                    );
                  });
                  break;
                case "city":
                  setCities(() => {
                    // @ts-expect-error the
                    return Object.keys(province[selectProvince]).filter(
                      (value) => value.includes(val),
                    );
                  });
                  break;
                case "district":
                  setDistrict(() => {
                    return Object.keys(
                      // @ts-expect-error the
                      province[selectProvince][selectCity],
                    ).filter((value) => value.includes(val));
                  });
                  break;
              }
            }}
          ></Input>
        </div>
        <div className="flex flex-col text-xl">
          {filterType === "province"
            ? Provinces.map((key) => (
                <button
                  className="mt-3 h-10 w-full border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                  key={key}
                  onClick={() => {
                    // @ts-expect-error the
                    setCities(Object.keys(province[key]));
                    setSelectProvince(key);
                    store?.setFilters({
                      ...store?.filters,
                      province: { [key]: true },
                    });
                    setFilterType("city");
                  }}
                >
                  <div className="flex flex-row justify-between">
                    <div className="">{key}</div>
                    <ChevronLeft className="mt-1"></ChevronLeft>
                  </div>
                </button>
              ))
            : filterType === "city"
              ? Cities.map((key) => (
                  <button
                    className="mt-3 h-10 w-full border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                    key={key}
                    onClick={() => {
                      // @ts-expect-error the
                      setDistrict(Object.keys(province[selectProvince][key]));
                      setSelectCity(key);
                      setFilterType("district");
                    }}
                  >
                    <div className="flex flex-row justify-between">
                      <div className="">{key}</div>
                      <ChevronLeft className="mt-1"></ChevronLeft>
                    </div>
                  </button>
                ))
              : filterType === "district"
                ? Districts.map((key) => (
                    <button
                      className="mt-3 h-10 w-full border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                      key={key}
                    >
                      <div className="flex flex-row justify-between">
                        <div className="">{key}</div>
                        <ChevronLeft className="mt-1"></ChevronLeft>
                      </div>
                    </button>
                  ))
                : ""}
        </div>
      </div>
    </>
  );
}
