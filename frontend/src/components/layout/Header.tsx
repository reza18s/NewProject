/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
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
import { ChevronDown } from "lucide-react";
import { IUser } from "@/types";

function Header({ user }: { user: Promise<IUser> }) {
  const store = useStore(useModal, (state) => state);
  const router = useRouter();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URLSearchParams(window.location.search);
    url.set("search", e.target.value);
    router.push("/?" + url.toString());
  };
  return (
    <div className="fixed z-10 flex h-[80px] w-full justify-center bg-background pt-[15px]">
      <div className="flex w-[90%] items-center justify-between border-b border-border px-[20px] py-[10px]">
        <div className="mr-[20px] hidden md:flex">
          <Link href="/" legacyBehavior>
            <Image src="/image/logo.png" width={70} height={70} alt="Logo" />
          </Link>
        </div>
        <div className="flex w-[350px] items-center justify-end">
          <Button
            className="rounded-3xl border border-border bg-background px-7 text-base text-secondary-foreground hover:bg-popover-foreground hover:text-background"
            onClick={() => {
              store.setOpen(
                <CustomModal title="Cites" subheading="choose a city">
                  <CityFilter />
                </CustomModal>,
              );
            }}
          >
            تهران
            <ChevronDown></ChevronDown>
          </Button>
          {/* <Button
            className="rounded-3xl border border-border bg-background text-base text-secondary-foreground hover:bg-popover-foreground hover:text-background"
            onClick={() => {
              store.setOpen(
                <CustomModal title="My Accounts" subheading="choose an account">
                  <div></div>
                </CustomModal>,
              );
            }}
          >
            <Avatar user={user}></Avatar>
            لیلا شعبانی
            <ChevronDown></ChevronDown> 
          </Button>*/}
          {/* <form className="mr-[20px] flex w-[400px] items-center">
            <input
              className="ml-2 hidden rounded-3xl border border-foreground/30 bg-card p-2 font-['YekanBakh'] font-bold sm:flex"
              onChange={handleSearchQuery}
              type="text"
              placeholder="جستجوی آگهی"
            />
            <button type="submit" className="hidden">
              جستجو
            </button>
          </form> */}

          <div className="flex items-center">
            <Suspense fallback={<div>Loading...</div>}>
              <Avatar user={user}></Avatar>
            </Suspense>
          </div>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </div>
  );
}
const Avatar = (props: { user: Promise<IUser> }) => {
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
