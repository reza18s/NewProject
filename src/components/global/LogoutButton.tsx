"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

function LogoutButton() {
  return (
    <button
      className="mt-[20px] flex w-full cursor-pointer border-none bg-none text-right text-base text-destructive"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <FiLogOut className="ml-2 text-xl text-destructive" />
      خروج
    </button>
  );
}

export default LogoutButton;
