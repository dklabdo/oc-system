import { GraduationCap, LogInIcon, LogOutIcon, Mail, PlusCircle, User } from "lucide-react";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import Setting from "@/ui/Setting";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EnseignantPopUp from "./EnseignantPopUp";
import SelectSectionPopUp from "./SelectSectionPopUp";
import { useAuth } from "@/Hooks/useAuth";

function Nav() {
  const [open, setOpen] = useState(false);
  const {logout} = useAuth();

  return (
    <div className="pb-6 w-full flex justify-between  ">
      <div className=" bg-gray-100 w-72 flex gap-2 items-center py-1 px-2 rounded-md  ">
        <Search size={22} className="mx-1" />
        <input
          className="py-2 border-none outline-none w-full "
          type="text"
          placeholder="Rechercher ... "
        />
      </div>
      <div className="scale-90 flex items-center gap-3 ">
        <button onClick={() => logout()} className=" bg-gray-100 w-12 h-12 hover:bg-red-600 cursor-pointer hover:text-white  transition-all scale-90 rounded-full flex text-gray-500 justify-center items-center  ">
          {" "}
          <LogOutIcon size={22} />{" "}
        </button>

        <Dialog>
          <DialogTrigger>
            <div className="bg-main cursor-pointer hover:scale-105  transition-all relative text-white rounded-full py-[10px] flex items-end px-[10px]  ">
              <p className="flex items-center gap-1">
                <GraduationCap size={20} strokeWidth={2.25} />
              </p>
              <PlusCircle className="scale-[.85] bg-white rounded-2xl absolute -top-[10px] text-main p-[.5px] -right-2 " />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            {" "}
            <SelectSectionPopUp />{" "}
          </DialogContent>
        </Dialog>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="bg-main/20 text-main scale-90 w-12 h-12 rounded-full flex  justify-center items-center  "
            >
              {" "}
              <Settings size={24} />{" "}
            </button>
          </PopoverTrigger>

          <PopoverContent className="mx-5 mt-5">
            <Setting />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Nav;
