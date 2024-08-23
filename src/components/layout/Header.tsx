"use client";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import styles from "./Header.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation.js";
import CityFilter from "../modals/CityFilter";
import { Button } from "../ui/button";
import CustomModal from "../modals/CustomModal";
import { useStore } from "zustand";
import { useModal } from "@/stores/useModal";
import React from "react";

function Header() {
  const store = useStore(useModal, (state) => state);
  const { data: session } = useSession();
  const router = useRouter();
  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URLSearchParams(window.location.search);
    url.set("search", e.target.value);
    router.push("/?" + url.toString());
  };
  return (
    <div className="mt-[20px] hidden h-[50px] justify-center md:flex">
      <div className="flex w-[1200px] items-center justify-between divide-red-200 rounded-sm bg-white px-[20px] py-[10px] shadow-md shadow-foreground/10">
        <div className="flex w-[300px] items-center">
          <Button
            onClick={() => {
              store.setOpen(
                <CustomModal
                  title="Create a Subaccount"
                  subheading="You can switch between"
                >
                  <CityFilter />
                </CustomModal>,
              );
            }}
          >
            تهران
          </Button>
          <form className="mr-[20px] flex items-center">
            <input
              className="ml-2 rounded-3xl border border-foreground/30 bg-card p-2 font-['YekanBakh'] font-bold"
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
            {session ? (
              <div className="pr-3">
                <Link href="/dashboard">
                  <FaUserAlt />
                </Link>
              </div>
            ) : (
              <div className="pr-3">
                <Link href="/signin">
                  <span>ورود / ثبت نام</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
