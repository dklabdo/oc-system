import React from "react";
import { Book } from "lucide-react";
import { Plus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import img from "../assets/icon1.png";

function ModulePopUp() {
  return (
    <div className="flex scale-[.97] items-center flex-col gap-3 h-[500px]  ">
      <div className="text-blue-600  min-w-10 min-h-10 rounded-lg bg-blue-200 flex items-center justify-center ">
        <Book />
      </div>
      <h2 className=" text-lg font-semibold text-gray-900 ">
        {" "}
        Ajouter un etudiant{" "}
      </h2>
      <p className="text-sm text-center font-medium text-gray-500 ">
        Remplissez les informations de l&apos;élève avec précision pour
        l&apos;inscrire au système scolaire.
      </p>
      <div className="w-full gap-6 scale-95 py-4 flex flex-col  ">
        <div className=" flex  flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 ">
            {" "}
            Nom de l'enseignant{" "}
          </label>
          <input
            type="text"
            placeholder="Jhon doe "
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          />
        </div>
        <div className=" flex flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 ">
            {" "}
            Gender{" "}
          </label>
          <select
            type="text"
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          >
            <option> Male </option>
            <option> Female </option>
          </select>
        </div>
        <div className=" flex flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 ">
            {" "}
            Email professional{" "}
          </label>
          <input
            type="text"
            placeholder=" example@univ-sba.dz "
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          />
        </div>
      </div>

      <div className="w-full scale-95 ">
        <button className="cursor-pointer hover:bg-black transition w-full py-3 rounded-lg bg-main text-white ">
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default ModulePopUp;
