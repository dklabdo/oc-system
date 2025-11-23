import React from "react";
import Dashboard from "@/ui/Dashboard";
import SideBar from "@/Component/SideBar";
import Nav from "@/Component/Nav";
import Anonce from "@/ui/Anonce";

function AnoncePage() {
  return (
    <div className="bg-gray-50 overflow-y-hidden flex w-full h-dvh p-4 ">
      <SideBar />
      <div className="flex flex-col p-2 w-full h-full   ">
        <div className=" w-full min-h-16 px-3 ">
          <Nav />
        </div>
        <div className="px-2 relative flex overflow-hidden flex-col w-full max-h-full  h-full  ">
          <h1 className="px-2 text-2xl pb-3 font-semibold text-black ">
            {" "}
            Documents{" "}
          </h1>
          <div className="max-h-full h-full  px-[6px] overflow-auto w-full   ">
            <Anonce />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnoncePage;
