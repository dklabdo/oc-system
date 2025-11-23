import React from "react";
import Enseignant from "@/ui/Enseignant";
import SideBar from "@/Component/SideBar";
import Nav from "@/Component/Nav";
import Module from "@/ui/Module";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EnseignantPopUp from "@/Component/EnseignantPopUp";
import ModulePopUp from "@/Component/ModulePopUp";

function ModulePage() {
  return (
    <div className="bg-gray-50 overflow-y-hidden flex w-full h-dvh p-4 ">
      <SideBar />
      <div className="flex flex-col p-2 w-full h-full   ">
        <div className=" w-full min-h-16 px-3 ">
          <Nav />
        </div>
        <div className="px-2 relative flex overflow-hidden flex-col w-full max-h-full  h-full  ">
          <div className="pr-3 pb-3 w-full flex justify-between ">
            <h1 className="px-2 text-2xl  font-semibold text-black ">
              {" "}
              Module{" "}
            </h1>
            <Dialog>
              <DialogTrigger>
                <button
                  title="Ajouter un enseignant"
                  className="px-2   gap-2 text-sm justify-center items-center flex h-8 rounded-md bg-gray-300 cursor-pointer text-white hover:bg-main "
                >
                  {" "}
                  <Plus size={18} /> Ajouter
                </button>{" "}
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px]">
                {" "}
                <ModulePopUp />{" "}
              </DialogContent>
            </Dialog>
            
          </div>
          <div className="max-h-full h-full  px-[6px] overflow-auto w-full   ">
            <Module />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModulePage;
