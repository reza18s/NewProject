"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation.js";
import Filter from "../modals/Filter";
import { Button } from "../ui/button";
import CustomModal from "../modals/CustomModal";
import { useStore } from "zustand";
import { useModal } from "@/stores/useModal";
import React, { Suspense, use } from "react";
import { Search } from "lucide-react";
import { IUser } from "@/types";
import { MdLocationPin, MdMyLocation } from "react-icons/md";
import { useData } from "@/stores/useData";

function Header({ user }: { user: Promise<IUser> }) {
  const store = useStore(useModal, (state) => state);
  const filters = useData((state) => state.filters);
  const router = useRouter();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URLSearchParams(window.location.search);
    url.set("search", e.target.value);
    router.push("/?" + url.toString());
  };
  const cities = Object.keys(filters.city).filter((key) => filters.city[key]);
  const provinces = Object.keys(filters.province).filter(
    (key) => filters.province[key],
  );
  return (
    <div className="fixed z-10 flex h-[88px] w-full flex-col justify-center border-b-2 border-gray-300 bg-background">
      <div className="flex h-8 w-full items-center justify-center bg-blue-700 font-semibold">
        <h1 className="text-lg text-white">
          کلید موفقیت در شما املاک و مستغلات
        </h1>
      </div>
      <div className="flex h-16 w-full justify-between lg:pl-14 lg:pr-10">
        <div className="flex md:mr-[20px]">
          <div className="-mt-5 hidden size-32 md:flex">
            <Link href="/" legacyBehavior>
              <Image
                src="/image/logo1.png"
                width={150}
                height={150}
                alt="Logo"
              />
            </Link>
          </div>
          <form className="mr-[20px] flex items-center">
            <div className="overflow-hidden bg-sky-400 py-[2px]">
              <div className="mx-[-2px] flex h-8 overflow-hidden rounded-3xl bg-black bg-primary">
                <button
                  type="submit"
                  className="flex w-10 items-center justify-center bg-purple-600"
                >
                  <Search className="stroke-teal-50"></Search>
                </button>
                <input
                  className="w-80 rounded-none border-0 bg-card p-2 font-['YekanBakh'] font-bold sm:flex"
                  onChange={handleSearchQuery}
                  type="text"
                  placeholder="ملک مورد نظر خود را بیان کنید "
                />
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center text-lg font-semibold">
          021-091017240
        </div>
        <div className="flex w-[400px] items-center justify-end">
          <div className="flex items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <Avatar user={user}></Avatar>
            </Suspense>
          </div>{" "}
          <Button
            className="flex items-end gap-2 border border-gray-300 bg-background px-2 text-[14px] font-medium text-gray-600 hover:bg-popover-foreground hover:text-background"
            onClick={() => {
              store.setOpen(
                <CustomModal>
                  <Filter />
                </CustomModal>,
              );
            }}
          >
            <MdLocationPin className="size-5 pb-1 text-black"></MdLocationPin>
            {provinces.length > 0
              ? `${provinces.length > 1 ? `${provinces.length} استان` : provinces[0]} ${cities.length > 0 ? (cities.length > 1 ? `${cities.length} شهر` : cities[0]) : ""}`
              : "لطفا شهر خود را انتخاب کنید"}
          </Button>
        </div>
      </div>
    </div>
  );
}
const Avatar = (props: { user: Promise<IUser> }) => {
  const user = use(props.user);
  // console.log(user);
  return (
    <div className="ml-3 flex items-center rounded-lg border border-gray-300 px-3 py-2">
      <MdLocationPin className=""></MdLocationPin>
      {user ? (
        <Link href="/dashboard">پنل من</Link>
      ) : (
        <Link href="/signin">
          <span>ورود / ثبت نام</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
