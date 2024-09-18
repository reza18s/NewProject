import React from "react";
import Header from "./Header";
import { getSession } from "@/utils/query";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header user={getSession()} />
      <div className="mx-auto p-10">{children}</div>
    </div>
  );
}

export default Layout;
