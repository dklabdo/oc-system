import React from "react";
import { Book } from "lucide-react";
import { Plus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import img from "../assets/icon1.png";
import { User2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";

function EnseignantPopUp() {
  return (
    <div className="flex scale-[.97] items-center flex-col gap-3 h-[560px]  ">
      <div className="text-blue-600  min-w-10 min-h-10 rounded-lg bg-blue-200 flex items-center justify-center ">
        <User2 />
      </div>
      <h2 className=" text-lg font-semibold text-gray-900 ">
        {" "}
        Ajouter un enseignant{" "}
      </h2>
      <p className="text-sm text-center font-medium text-gray-500 ">
        Entrez les données de l&apos;enseignant pour l&apos;intégrer dans le système
      </p>
      <div className="w-full gap-6 scale-95 py-4 flex flex-col  ">
        <div className=" flex  flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 " > Nom de l'enseignant </label>
          <input
            type="text"
            placeholder="Jhon doe "
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 " > Gender </label>
          <select
            type="text"
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          >
            <option> Male </option>
            <option> Female </option>
          </select>
        </div>
        <div className=" flex flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 " > Email professional </label>
          <input
            type="text"
            placeholder=" example@univ-sba.dz "
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          />
        </div>
      </div>
      <div className=" w-full scale-95 flex items-center gap-3 py-2  " >
        <div className=" min-w-10 min-h-10 flex items-center justify-center rounded-full bg-green-200 text-green-600 " > <ShieldCheck /> </div>
        <p className=" text-sm " >un email sera envoyes aus prof pour accede a espace proffeseur</p>
      </div>

      <div className="w-full mt-2 scale-95 ">
        <button className="cursor-pointer hover:bg-black transition w-full py-3 rounded-lg bg-main text-white ">
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default EnseignantPopUp;
