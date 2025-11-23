import React from "react";
import { Book, Copy, Group } from "lucide-react";
import { Plus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import img from "../assets/icon1.png";
import { User2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";

function SelectSectionPopUp() {
  return (
    <div className="flex scale-[.97] items-center flex-col gap-3 h-[520px]  ">
      <div className="text-blue-600  min-w-10 min-h-10 rounded-lg bg-blue-200 flex items-center justify-center ">
        <Group />
      </div>
      <h2 className=" text-lg font-semibold text-gray-900 ">
        {" "}
        Ajouter un enseignant{" "}
      </h2>
      <p className="text-sm text-center font-medium text-gray-500 ">
        Entrez les données de l&apos;enseignant pour l&apos;intégrer dans le
        système
      </p>
      <div className="w-full gap-6 scale-95 py-4 flex flex-col  ">
        <div className="mt-2 w-full flex flex-wrap  ">
          <div className="w-[40%] px-1 flex flex-col gap-2 ">
            <label className="px-1 text-sm font-semibold text-gray-600 ">
              {" "}
              Systeme
            </label>
            <select
              type="text"
              className=" w-full px-1 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            >
              <option> LMD (5 ans) </option>
              <option> LMD (7 ans) </option>
              <option> INGENIEUR </option>
            </select>
          </div>
          <div className="w-[60%]  px-1 flex flex-col gap-2 ">
            <label className="px-1 text-sm font-semibold text-gray-600 ">
              {" "}
              Specialité{" "}
            </label>
            <select
              type="text"
              className=" w-full px-1 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            >
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>
          <div className="mt-4 w-[70%] px-1 flex flex-col gap-2 ">
            <label className="px-1 text-sm font-semibold text-gray-600 ">
              {" "}
              Section{" "}
            </label>
            <select
              type="text"
              className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            >
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>
          <div className="mt-4 w-[30%] px-1 flex flex-col gap-2 ">
            <label className="px-1 text-sm font-semibold text-gray-600 ">
              {" "}
              Groupe{" "}
            </label>
            <select
              type="text"
              className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            >
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>
        </div>
      </div>
      <div className=" w-full scale-95 flex items-center gap-3 py-2  ">
        <div className=" min-w-10 min-h-10 flex items-center justify-center rounded-full bg-green-200 text-green-600 ">
          {" "}
          <Copy size={18} />{" "}
        </div>
        <p className=" text-sm ">
          un email sera envoyes aus prof pour accede a espace proffeseur
        </p>
      </div>
      <div className="py-2 scale-95 flex items-center gap-2  w-full ">
        <input
          type="text"
          placeholder="Home / Specialité / Section / Groupe "
          className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
        />
        <button className=" bg-main   hover:bg-black transition-all text-white px-4 py-2 rounded-md ">
          {" "}
          <Plus />{" "}
        </button>
      </div>

      <div className="w-full mt-2 scale-95 ">
        <button className="cursor-pointer hover:bg-black transition w-full py-3 rounded-lg bg-main text-white ">
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default SelectSectionPopUp;
