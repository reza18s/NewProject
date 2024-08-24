import React from "react";
import Header from "./Header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="m-auto max-w-[1200px] p-3">{children}</div>
    </>
  );
}

export default Layout;
