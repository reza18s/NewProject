import React from "react";
import Header from "./Header";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";
import ScrollToTopButton from "../global/ScrollToTopButton";

function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies().get("jwt");
  return (
    <div className="relative">
      <Header user={getSession(cookieStore?.value)} />
      <div className="mx-auto p-3 md:px-10">{children}</div>
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
