import React from "react";
import Enseignant from "@/ui/Enseignant";
import SideBar from "@/Component/SideBar";
import Nav from "@/Component/Nav";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EtudiantPopUp from "@/Component/EtudiantPopUp";
import EnseignantPopUp from "@/Component/EnseignantPopUp";

function EnProfile() {
  return (
    <div className="bg-gray-50 overflow-y-hidden flex w-full h-dvh p-4 ">
      <SideBar />
      <div className="flex flex-col p-2 w-full h-full   ">
        <div className=" w-full min-h-16 px-3 ">
          <Nav />
        </div>
        <div className="px-2 relative flex overflow-hidden flex-col w-full max-h-full  h-full  ">
          <div className="pr-3 pb-3 items-center w-full flex justify-between ">
            <h1 className="px-2 text-2xl  font-semibold text-black ">
              {" "}
              Enseignant{" "}
            </h1>

          
          </div>

          <div className="max-h-full h-full  px-[6px] overflow-auto w-full   ">
            <Enseignant />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnProfile;
