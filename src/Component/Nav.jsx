import { Mail, User } from "lucide-react";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-5 w-full flex justify-between  ">
      <div className=" bg-gray-100 w-72 flex gap-2 items-center py-1 px-2 rounded-md  ">
        <Search size={22} className="mx-1" />
        <input
          className="py-2 border-none outline-none w-full "
          type="text"
          placeholder="Rechercher ... "
        />
      </div>
      <div className="scale-90 flex items-center gap-2 ">
        <button className=" bg-gray-100 w-12 h-12 scale-90 rounded-full flex text-gray-500 justify-center items-center  ">
          {" "}
          <Bell size={22} />{" "}
        </button>
        <button className=" bg-gray-100 w-12 h-12 scale-90 rounded-full flex text-gray-500 justify-center items-center  ">
          {" "}
          <Mail size={22} />{" "}
        </button>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className="bg-main/20 text-main scale-90 w-12 h-12 rounded-full flex  justify-center items-center  "
            >
              {" "}
              <User size={24} />{" "}
            </button>
          </PopoverTrigger>

          <PopoverContent className="mx-5 mt-5" >Place content for the popover here.</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Nav;
