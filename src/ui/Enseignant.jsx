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
import profile from "../assets/profile.svg";

import React from "react";
import { PenIcon } from "lucide-react";
import { PenLine } from "lucide-react";
import 'animate.css';


function Enseignant() {
  return (
    <div className="overflow-hidden w-full flex items-center gap-3 h-full min-h-full bg-gray-50 ">
      <div className="animate__animated animate__bounceIn w-[72%] h-full p-4 bg-white rounded-xl shadow-2xl shadow-gray-100/50  ">
        <div className=" w-full flex px-2 justify-between ">
          <div className=" flex items-center gap-2 ">
            <Menubar className="  bg-white ">
              <MenubarMenu>
                <MenubarTrigger className="bg-white  ">
                  Tous les module
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
          <EnseignantList />
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
      <div className="animate__animated animate__bounceIn w-[28%] flex flex-col items-center gap-5 h-full bg-white rounded-xl shadow-2xl shadow-gray-100/50  ">
        <div className="items-center px-2 pb-2 pt-8 flex flex-col w-full  ">
          <img className=" w-14 " src={profile} alt="..." />
          <p className="w-full text-center text-lg text-gray-600 font-semibold mt-3  ">
            {" "}
            Sayah abdelilah{" "}
          </p>
        </div>
        <EnseignantModule />
        <EnseignantSection />
      </div>
    </div>
  );
}

function EnseignantList() {
  return (
    <table className="   w-full ">
      <thead className="    h-10 rounded-2xl  ">
        <tr className=" w-full rounded-2xl text-left border-b-[1.2px] border-gray-300 ">
          <th className="pl-2 w-16 bg-[#cbceff] rounded-tl-2xl text-sm font-medium text-gray-700 "></th>
          <th className="bg-[#cbceff] pl-2  text-sm font-medium text-gray-700 ">
            Enseignant
          </th>
          <th className="bg-[#cbceff]  text-sm font-medium text-gray-700 ">
            E-mail
          </th>
          <th className="bg-[#cbceff]  text-sm font-medium text-gray-700 ">
            Contact
          </th>
          <th className="bg-[#cbceff] pl-2 rounded-tr-2xl  text-sm font-medium text-gray-700 ">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
        <tr className=" border-b-[1.2px] border-gray-200 hover:bg-gray-50 cursor-pointer ">
          <p className="pl-3 py-3  rounded-bl-2xl text-sm font-medium text-gray-900 ">
            1324
          </p>
          <td className="pl-2  py-3 text-sm font-medium text-gray-900 ">
            Sayah abdelilah
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            Sayah@gmqil.com
          </td>
          <td className=" py-3 text-sm font-medium text-gray-900 ">
            {" "}
            213 6 99 54 23{" "}
          </td>
          <td className=" py-3 rounded-br-2xl text-sm font-medium text-gray-900 ">
            {" "}
            <EnseignantAction />{" "}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function EnseignantAction() {
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

function EnseignantModule() {
  return (
    <div className=" flex scale-95 w-full flex-col px-3 ">
      <div className=" w-full flex justify-between ">
        <p> Module assigné </p>
        <PenLine size={16} />
      </div>
      <div className="p-1 overflow-y-auto thin-scroll py-2 mt-2 rounded-md flex flex-wrap w-full h-40 bg-[#D0DCEE] ">
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Reseaux{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Anglais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Anglais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme avance{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme avance{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          francais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          POO{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#1B2431] text-white ">
          {" "}
          Algorithme{" "}
        </p>
      </div>
    </div>
  );
}
function EnseignantSection() {
  return (
    <div className="flex scale-95 w-full flex-col px-3 ">
      <div className=" w-full flex justify-between ">
        <p> Groupe assigné </p>
        <PenLine size={16} />
      </div>
      <div className="p-1 overflow-y-auto thin-scroll py-2 mt-2 rounded-md flex flex-wrap w-full h-36 bg-[#FFEDC0] ">
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Reseaux{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Anglais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Anglais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme avance{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme avance{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          francais{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          POO{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme{" "}
        </p>
        <p className="w-fit m-[2px] h-8 max-h-8 flex justify-center items-center scale-90 p-2 rounded-2xl bg-[#FABB18] text-white ">
          {" "}
          Algorithme{" "}
        </p>
      </div>
    </div>
  );
}

export default Enseignant;
