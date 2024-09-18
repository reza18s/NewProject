"use client";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation.js";
import CityFilter from "../modals/CityFilter";
import { Button } from "../ui/button";
import CustomModal from "../modals/CustomModal";
import { useStore } from "zustand";
import { useModal } from "@/stores/useModal";
import React, { Suspense, use } from "react";
import { ModeToggle } from "../global/mode-toggle";
import { Users } from "@prisma/client";

function Header({ user }: { user: Promise<Users> }) {
  const store = useStore(useModal, (state) => state);
  const router = useRouter();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URLSearchParams(window.location.search);
    url.set("search", e.target.value);
    router.push("/?" + url.toString());
  };
  return (
    <div className="fixed z-10 flex h-[70px] w-full justify-center bg-background pt-[15px]">
      <div className="flex w-[1600px] items-center justify-between divide-red-200 rounded-sm bg-accent px-[20px] py-[10px] shadow-md shadow-foreground/10">
        <div className="flex w-[300px] items-center">
          <Button
            onClick={() => {
              store.setOpen(
                <CustomModal title="" subheading="">
                  <CityFilter />
                </CustomModal>,
              );
            }}
          >
            تهران
          </Button>
          <form className="mr-[20px] flex items-center">
            <input
              className="ml-2 hidden rounded-3xl border border-foreground/30 bg-card p-2 font-['YekanBakh'] font-bold sm:flex"
              onChange={handleSearchQuery}
              type="text"
              placeholder="جستجوی آگهی"
            />
            <button type="submit" className="hidden">
              جستجو
            </button>
          </form>
        </div>
        <div className="mr-[20px] flex flex-1 justify-center">
          <Link href="/" legacyBehavior>
            <Image src="/image/logo.png" width={70} height={70} alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center">
          <h5 className="">021-123456</h5>
          <div className="flex items-center">
            <button className="mr-2 cursor-pointer rounded-sm border-none bg-primary p-2 font-['YekanBakh'] text-xs text-primary-foreground">
              پنل اختصاصی من
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              <Avatar user={user}></Avatar>
            </Suspense>
            <ModeToggle></ModeToggle>
          </div>
        </div>
      </div>
    </div>
  );
}
const Avatar = (props: { user: Promise<Users> }) => {
  const user = use(props.user);
  // console.log(user);
  return user ? (
    <div className="ml-3 pr-3">
      <Link href="/dashboard">
        <FaUserAlt />
      </Link>
    </div>
  ) : (
    <div className="ml-3 pr-3">
      <Link href="/signin">
        <span>ورود / ثبت نام</span>
      </Link>
    </div>
  );
};

export default Header;
