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
import { Home, Search } from "lucide-react";
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
    <div className="fixed inset-0 z-10 flex h-[100px] w-full flex-col justify-center border-b-2 border-gray-300 bg-background">
      <div className="flex h-9 w-full items-center justify-center bg-blue-700 font-semibold">
        <h1 className="text-sm text-white md:text-lg">
          کلید موفقیت شما در املاک و مستغلات
        </h1>
        <Link
          href="/signup"
          className="mr-5 h-6 bg-background px-2 text-sm font-semibold text-primary md:text-base"
        >
          ثبت نام کنید
        </Link>
        <Link href="/" className="mx-3">
          <Home></Home>
        </Link>
      </div>
      <div className="flex h-16 w-full justify-between px-2 md:flex-row xl:pl-14 xl:pr-10">
        <div className="flex w-full max-w-[600px]">
          <div className="-mt-5 hidden size-32 lg:flex">
            <Link href="/" legacyBehavior>
              <Image
                src="/image/logo1.png"
                width={150}
                height={150}
                alt="Logo"
              />
            </Link>
          </div>
          <form className="flex w-full items-center lg:mr-[20px]">
            <div className="w-full max-w-96 overflow-hidden bg-sky-400 py-[2px]">
              <div className="mx-[-2px] flex h-8 overflow-hidden rounded-3xl bg-black bg-primary">
                <button
                  type="submit"
                  className="flex w-10 items-center justify-center bg-purple-600"
                >
                  <Search className="stroke-teal-50"></Search>
                </button>
                <input
                  className="w-full rounded-none border-0 bg-card p-2 font-['YekanBakh'] font-bold sm:flex"
                  onChange={handleSearchQuery}
                  type="text"
                  placeholder="ملک مورد نظر خود را بیان کنید "
                />
              </div>
            </div>
          </form>
        </div>
        <div className="hidden items-center justify-center text-nowrap text-lg font-semibold lg:flex">
          021-091017240
        </div>
        <div className="flex max-w-[400px] items-center justify-end">
          <div className="flex items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <Avatar user={user}></Avatar>
            </Suspense>
          </div>{" "}
          <Button
            className="hidden items-end gap-2 border border-gray-300 bg-background px-2 text-sm font-medium text-gray-600 hover:bg-popover-foreground hover:text-background sm:flex lg:text-base"
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
    <div className="ml-3 flex items-center text-nowrap rounded-lg border border-gray-300 px-3 py-2 text-sm lg:text-base">
      {user ? (
        <>
          <MdLocationPin className=""></MdLocationPin>
          <Link href="/dashboard">پنل من</Link>
        </>
      ) : (
        <>
          <Link href="/signin">ورود / ثبت نام</Link>
        </>
      )}
    </div>
  );
};

export default Header;
