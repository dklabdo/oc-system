import React, { useState } from "react";
import { Book } from "lucide-react";
import { Plus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import img from "../assets/icon1.png";
import { User2 } from "lucide-react";
import { ShieldCheck } from "lucide-react";

function SectionPopUp() {
  const [isSpeciality, setisSpeciality] = useState(false);
  return (
    <div className="flex scale-[.97] items-center flex-col gap-3 h-fit  ">
      <div className="text-blue-600  min-w-10 min-h-10 rounded-lg bg-blue-200 flex items-center justify-center ">
        <User2 />
      </div>
      <h2 className=" text-lg font-semibold text-gray-900 ">
        {" "}
        Ajouter une section{" "}
      </h2>
      <p className="text-sm text-center font-medium text-gray-500 ">
        Entrez les données de l&apos;enseignant pour l&apos;intégrer dans le
        système
      </p>
      <div className="w-full gap-6 scale-95 py-4 flex flex-col  ">
        <div className=" flex  flex-col gap-2 ">
          <label className="px-1 text-sm font-semibold text-gray-600 ">
            {" "}
            Nombre de groupe{" "}
          </label>
          <input
            type="number"
            placeholder="Jhon doe "
            className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
          />
        </div>
        <div className="justify-between px-2 flex items-center gap-2 ">
          <p>Is this section a speciality</p>
          <label className="switch scale-90 ">
            <input
              onChange={(e) => setisSpeciality(!isSpeciality)}
              type="checkbox"
            />
            <span className="slider"></span>
          </label>
        </div>
        {isSpeciality && (
          <div className=" flex flex-col gap-2 ">
            <label className="px-1 text-sm font-semibold text-gray-600 ">
              {" "}
              Nom de la specialite
            </label>
            <input
              type="text"
              placeholder=" example@univ-sba.dz "
              className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            />
          </div>
        )}
      </div>

      <div className="w-full mt-2 scale-95 ">
        <button className="cursor-pointer hover:bg-black transition w-full py-3 rounded-lg bg-main text-white ">
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default SectionPopUp;
