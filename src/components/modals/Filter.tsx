"use client"; // components/ModalWithCheckboxes.js
import React, { useEffect, useRef, useState } from "react";
import useStore from "@/stores/useStore";
import { useData } from "@/stores/useData";
import { ChevronLeft, X } from "lucide-react";
import { Input } from "../ui/input";
import { province } from "@/constants";
import { DialogFooter } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
export default function Filter() {
  const store = useStore(useData, (state) => state);
  const [filterType, setFilterType] = useState<
    "province" | "city" | "district"
  >("province");
  const [Provinces, setProvinces] = useState<string[]>(Object.keys(province));
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [Cities, setCities] = useState<string[]>(
    Object.keys(province["البرز"]),
  );
  const [Districts, setDistrict] = useState<string[]>(
    Object.keys(province["البرز"]["آسارا"]),
  );
  const [search, setSearch] = useState<string>("");
  const [selectProvince, setSelectProvince] = useState<string>("البرز");
  const [selectCity, setSelectCity] = useState<string>("صنعتی");
  const [Filter, setFilter] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({
    province: {},
    city: {},
    district: {},
  });

  useEffect(() => {
    // @ts-expect-error the
    setFilter(store?.filters);
  }, [store?.filters]);
  return (
    <>
      <div className="mt-[20px] flex flex-col gap-3 text-base text-foreground">
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
            onClick={() => {
              store?.setFilters({
                province: {},
                city: {},
                district: {},
              });
              setFilter({
                province: {},
                city: {},
                district: {},
              });
            }}
          >
            حذف همه
          </button>
        </div>
        <div className="flex">
          <Input
            placeholder={
              filterType === "province"
                ? "جستجوی استان"
                : filterType === "city"
                  ? "جستجوی شهر"
                  : filterType === "district"
                    ? "جستجوی منطقه"
                    : ""
            }
            className="h-10 bg-gray-300"
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
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
        <div
          className="flex max-w-[350px] gap-2 overflow-scroll pl-3 md:max-w-[550px]"
          ref={scrollContainerRef}
          onWheel={(event) => {
            if (scrollContainerRef.current) {
              // Adjust scroll position based on the wheel delta
              scrollContainerRef.current.scrollLeft += event.deltaY;
            }
          }}
        >
          {Filter &&
            Object.keys(Filter).map(
              (key1) =>
                Filter[key1] &&
                Object.keys(Filter[key1]).map(
                  (key) =>
                    Filter[key1][key] && (
                      <div
                        className="flex text-nowrap border border-primary bg-secondary"
                        key={key}
                      >
                        {key}
                        <X
                          onClick={() =>
                            setFilter({
                              ...Filter,
                              [key1]: { ...Filter[key1], [key]: false },
                            })
                          }
                        ></X>
                      </div>
                    ),
                ),
            )}
        </div>
        <div className="flex h-96 max-h-[380px] flex-col overflow-y-scroll text-xl">
          {filterType === "province"
            ? Provinces.map((key) => (
                <button
                  className="mt-3 h-10 w-full rounded-sm border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                  key={key}
                  onClick={() => {
                    // @ts-expect-error the
                    setCities(Object.keys(province[key]));
                    setSelectProvince(key);
                    setSearch("");
                    setFilter((prev) => ({
                      ...prev,
                      province: { ...prev.province, [key]: true },
                    }));
                    setFilterType("city");
                  }}
                >
                  <div className="flex h-8 flex-row justify-between text-lg">
                    <div className="">{key}</div>
                    <ChevronLeft className="mt-1"></ChevronLeft>
                  </div>
                </button>
              ))
            : filterType === "city"
              ? Cities.map((key) => (
                  <button
                    className="mt-3 h-10 w-full rounded-sm border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                    key={key}
                    onClick={() => {
                      // @ts-expect-error the
                      setDistrict(Object.keys(province[selectProvince][key]));
                      setSelectCity(key);
                      setSearch("");
                      setFilter((prev) => ({
                        ...prev,
                        city: { ...prev.city, [key]: true },
                      }));
                      setFilterType("district");
                    }}
                  >
                    <div className="flex h-8 flex-row items-center justify-between text-lg">
                      {
                        // @ts-expect-error the
                        Object.keys(province[selectProvince][key]).length >
                        0 ? (
                          <>
                            <div className="">{key}</div>
                            <ChevronLeft className="mt-1"></ChevronLeft>
                          </>
                        ) : (
                          <>
                            <label htmlFor={key}>{key}</label>
                            <Checkbox
                              id={key}
                              checked={Filter.city[key] || false}
                            />
                          </>
                        )
                      }
                    </div>
                  </button>
                ))
              : filterType === "district"
                ? Districts.map((key) => (
                    <button
                      className="mt-3 h-8 w-full rounded-sm border border-x-2 border-gray-600/20 border-x-gray-600/60 bg-gray-300 px-3 font-medium"
                      key={key}
                      onClick={() => {
                        setSearch("");
                        setFilter((prev) => ({
                          ...prev,
                          district: { ...prev.district, [key]: true },
                        }));
                      }}
                    >
                      <div className="flex h-8 flex-row items-center justify-between text-sm">
                        <label htmlFor={key}>{key}</label>
                        <Checkbox
                          id={key}
                          checked={Filter.district[key] || false}
                        />
                      </div>
                    </button>
                  ))
                : ""}
        </div>
        <DialogFooter className="-mt-3 flex w-full items-center gap-2 sm:space-x-0">
          <DialogClose className="w-1/2">
            <Button
              className="h-8 w-full rounded-none bg-gray-400 text-black"
              onClick={() => {
                store?.setFilters(Filter);
              }}
            >
              تایید
            </Button>
          </DialogClose>
          <DialogClose className="w-1/2">
            <Button className="m-0 h-8 w-full rounded-none bg-gray-400 text-black">
              انصراف
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </>
  );
}
