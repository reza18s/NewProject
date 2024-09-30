import React from "react";
import Header from "./Header";
import { getSession } from "@/utils/query";
import { cookies } from "next/headers";

function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies().get("jwt");
  return (
    <div className="">
      <Header user={getSession(cookieStore?.value)} />
      <div className="mx-auto p-10">{children}</div>
    </div>
  );
}

export default Layout;
