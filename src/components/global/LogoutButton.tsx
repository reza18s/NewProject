"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  return (
    <button
      className="flex w-full cursor-pointer border-none bg-none text-right text-xl"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <FiLogOut className="ml-2 mt-1 text-2xl text-destructive" />
      خروج از حساب کاربری
    </button>
  );
}

export default LogoutButton;
