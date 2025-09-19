import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { Download } from "lucide-react";
import profile from "../assets/etu.svg";

import { PenIcon } from "lucide-react";
import { PenLine } from "lucide-react";

function Etudiant() {
  return (
    <div className=" w-full flex items-center gap-5 h-full min-h-full bg-gray-50 ">
      <div className=" w-full h-full p-4 bg-white rounded-xl shadow-2xl shadow-gray-100/50  ">
        <div className=" w-full flex px-2 justify-between ">
          <div className=" flex items-center gap-2 ">
            <Menubar className="  bg-white ">
              <MenubarMenu>
                <MenubarTrigger className="bg-white  ">
                  Tous les sesctions
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
          </div>
          <button
            title="exporter "
            className=" w-10 mt-1 cursor-pointer h-10 p-2 scale-[.85] bg-gray-300 hover:bg-main rounded-full text-white  flex justify-center items-center "
          >
            {" "}
            <Download size={21} />{" "}
          </button>
        </div>
        <div className="mt-4 scale-[.98] max-h-full border-2 border-gray-200 rounded-2xl ">
          <EtudiantList />
        </div>
        <div className=" w-full pb-1 px-2 items-center flex justify-between pt-3 ">
          <button className=" border-2  w-fit text-sm py-2 px-3 rounded-2xl scale-95 ">
            Previous
          </button>
          <p className=" text-gray-800 text-sm ">
            {" "}
            Page <span>1</span> of <span>10</span>{" "}
          </p>
          <button className=" border-2  w-fit text-sm py-2 px-3 rounded-2xl scale-95 ">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function EtudiantList() {
  return (
    <table className="   w-full ">
      <thead className="    h-10 rounded-2xl  ">
        <tr className=" w-full rounded-2xl text-left border-b-[1.2px] border-gray-300 ">
          <th className="pl-2 w-16 bg-[#FFEDC0] rounded-tl-2xl text-sm font-medium text-gray-700 "></th>
          <th className="bg-[#FFEDC0] pl-2  text-sm font-medium text-gray-700 ">
            Etudiant
          </th>
          <th className="bg-[#FFEDC0]  text-sm font-medium text-gray-700 ">
            ID
          </th>
          <th className="bg-[#FFEDC0]  text-sm font-medium text-gray-700 ">
            Niveaux
          </th>
          <th className="bg-[#FFEDC0] pl-2   text-sm font-medium text-gray-700 ">
            Section/specialité
          </th>
          <th className="bg-[#FFEDC0] pl-2   text-sm font-medium text-gray-700 ">
            Groupe
          </th>
          <th className="bg-[#FFEDC0] pl-2 rounded-tr-2xl  text-sm font-medium text-gray-700 ">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 text-gray-500 py-3  rounded-bl-2xl text-sm font-medium  ">
            1
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            
            <div className="flex items-center gap-2">
              <span className="inline">
                <img className="w-7" src={profile} alt="..." />
              </span>
              <span>Sayah abdelilah</span>
            </div>
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">38290610</td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> ING4</td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            S1 / Reseau informatique
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 "> G1</td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EtudiantAction />{" "}
          </td>
        </tr>
       
       
      </tbody>
    </table>
  );
}

function EtudiantAction() {
  return (
    <div className=" w-12 pl-2 flex items-center gap-3  ">
      <button className=" text-gray-700 hover:text-blue-600 cursor-pointer ">
        {" "}
        <Pen size={18} />{" "}
      </button>
      <button className=" text-gray-700 hover:text-red-600 cursor-pointer ">
        {" "}
        <Trash size={18} />{" "}
      </button>
    </div>
  );
}

export default Etudiant;
