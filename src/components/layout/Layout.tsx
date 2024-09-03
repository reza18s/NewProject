import React from "react";
import Header from "./Header";
import { getSession } from "@/utils/query";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header user={getSession()} />
      <div className="m-auto max-w-[1200px] p-3">{children}</div>
    </>
  );
}

export default Layout;
