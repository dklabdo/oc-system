import { ChevronUp, GraduationCap, Plus, PlusCircle, SquareUser } from "lucide-react";
import React, { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { defaultStyles, FileIcon } from "react-file-icon";
import profile from "../assets/profile.svg";


function Anonce() {
  return (
    <div className=" w-full h-full bg-white flex flex-col gap-2 rounded-2xl  overflow-hidden min-h-full  ">
      <div className="justify-between w-full h-16 min-h-16 bg-white rounded-xl   flex items-center px-3 text-gray-700 ">
       
        <div className=" flex items-center gap-2 ">
          <Menubar className="  bg-white ">
            <MenubarMenu>
              <MenubarTrigger className="bg-white  ">
                Tous les Module
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar className="  bg-white ">
            <MenubarMenu>
              <MenubarTrigger className="bg-white  ">
                Tous les Type
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar className="  bg-white ">
            <MenubarMenu>
              <MenubarTrigger className="bg-white  ">
                Tous les Enseignant
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar className="  bg-white ">
            <MenubarMenu>
              <MenubarTrigger className="bg-white  ">Date</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New Tab</MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className=" w-full flex-col pr-3 h-full min-h-full bg-white rounded-xl shadow-2xl shadow-gray-100/50 flex items-center  text-gray-700 ">
        <div className="my-4 mb-7 scale-[.98] w-full flex gap-1 ">
          <div className=" w-[12%] pl-7 ">ID</div>
          <div className=" w-[18%] text-center  ">Fichier</div>
          <div className=" w-[18%] text-center  ">Module</div>
          <div className=" w-18 min-w-18 text-center  ">Type</div>
          <div className=" w-[20%] text-center  ">Enseignant</div>
          <div className=" w-26 min-w-26 text-center  ">Date</div>
          <div className=" w-24 min-w-24 text-center ">Temps</div>
        </div>
        <DocumentList />
      </div>
    </div>
  );
}

function DocumentList() {
  return (
    <div className=" w-full overflow-y-auto px-2 flex flex-col gap-4 ">
      <DocumentLine />
      <DocumentLine />
      <DocumentLine />
      <DocumentLine />
      <DocumentLine />
      <DocumentLine />
     
    </div>
  );
}

function DocumentLine() {
  const [open, setopen] = useState(false);
  return (
    <div className=" flex flex-col gap-2 rounded-2xl border-[1px] w-full h-fit  ">
      <div
        onClick={() => setopen(true)}
        className={`${
          !open && " hover:bg-gray-50 "
        } py-4 items-center w-full gap-1 flex `}
      >
        <div className=" w-[12%] text-xs pl-4 ">4253544</div>
        <div className=" w-[18%] max-w-[18%] whitespace-nowrap line-clamp-0 overflow-x-hidden pl-4 flex items-center gap-2 text-center text-xs ">
          Algorithme dsfdsfdsfe ezrez r ezrezrezrer
        </div>
        <div className=" rounded-2xl flex justify-center  w-[18%] text-center p-1  text-sm ">
          {" "}
          <p className=" py-2 px-2 scale-90 bg-[#fff1cd] text-[#FABB18] rounded-xl ">
            Algorithme avance
          </p>{" "}
        </div>
        <div className=" w-20 px-2 scale-90 min-w-18 text-center text-sm ">
          {" "}
          <TypeIcon type="Cours" />{" "}
        </div>
        <div className=" w-[20%] text-start pl-4 flex items-center gap-2 justify-center text-xs ">
          {" "}
          <img
            className=" w-8 h-8 min-w-8 min-h-8 scale-90 "
            src={profile}
            alt="..."
          />{" "}
          Boukli hacene soufiane sqddsddffsf {" "}
        </div>
        <div className=" w-26 min-w-26 text-xs   text-center  ">
          {" "}
          21/09/2024{" "}
        </div>
        <div className=" w-24 min-w-24  text-xs text-center "> 21:30 </div>
      </div>
      
      {open && <div className="flex relative pr-10   px-3 pb-3 flex-wrap w-full  ">
            <Bubble type="pdf" text="Algorithm.pdf" />
            <Bubble type="xls" text="Algorithm.pdf" />
            <Bubble type="py" text="Algorithm.pdf" />
            <Bubble type="html" text="Algorithm.pdf" />
            <Bubble type="doc" text="Algorithm.pdf" />
            <Bubble type="java" text="Algorithm.pdf" />
            <Bubble type="csv" text="Algorithm.pdf" />
            <Bubble type="pdf" text="Algorithm.pdf" />
            <Bubble type="c" text="Algorithm.pdf" />
            <Bubble type="pdf" text="Algorithm.pdf" />
            <Bubble type="pdf" text="Algorithm.pdf" />
            <button onClick={() => setopen(false)} className=" bg-main text-white absolute bottom-2 right-2 scale-95 cursor-pointer  w-8 h-8 rounded-full flex justify-center items-center " > <ChevronUp  /> </button>
        </div>}
    </div>
  );
}

function TypeIcon({ type }) {
  return (
    <div
      className={` ${type === "Cours" && "bg-red-100 text-red-600 "} ${
        type === "TP" && "bg-green-100 text-green-700 "
      } ${
        type === "TD" && " bg-blue-100 text-blue-700 "
      } rounded-2xl py-2 px-3 `}
    >
      {type}
    </div>
  );
}

function Bubble({type , text}) {
  return (
    <div className=" px-3 py-2  rounded-xl scale-90 border-[1px] flex items-center gap-2    ">
      {" "}
      <div className="scale-[.80] mb-[1.6px] " style={{ width: 20, height: 25 }}>
        <FileIcon extension={type} {...defaultStyles[type]} />
      </div>
      <p className="text-sm" > {text} </p>
    </div>
  );
}



export default Anonce;
