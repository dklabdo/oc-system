import React from "react";
import { Book } from "lucide-react";
import { Plus } from "lucide-react";
import { PlusCircle } from "lucide-react";
import img from "../assets/icon1.png"

function EtudiantPopUp() {
  return (
    <div className="flex scale-[.97] items-center flex-col gap-3 h-[620px]  ">
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
      <div className="w-full flex flex-col gap-2 ">
        <div className=" w-full flex scale-95  items-center gap-2 ">
          <div className="w-[40%] flex flex-col gap-2  ">
            <label className="px-1 text-sm font-medium text-gray-700 ">
              {" "}
              Nom prenom{" "}
            </label>
            <input
              type="text"
              placeholder="Jhon doe "
              className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            />
          </div>
          <div className="w-[40%] flex flex-col gap-2  ">
            <label className="px-1 text-sm font-medium text-gray-700 ">
              {" "}
              N carte edtudiant{" "}
            </label>
            <input
              type="text"
              placeholder="XXXXXXXXXXXXX "
              className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main "
            />
          </div>
          <div className="w-[40%] flex flex-col gap-2  ">
            <label className="px-1 text-sm font-medium text-gray-700 ">
              {" "}
              Nom prenom{" "}
            </label>
            <select className=" w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-main " >
              <option> Male </option>
              <option> Female </option>
            </select>
          </div>
        </div>
        <button className=" w-full rounded-lg scale-95 my-2 bg-black flex items-center justify-center py-2 text-white  " > <PlusCircle/> </button>
        <div className="max-h-22 text-sm flex flex-col gap-2 overflow-y-auto w-full h-28 scale-95  " >
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
            <div className="py-2 px-1 w-full flex gap-2 " >
                <p className=" w-[40%] " > Sayah abdelilah </p>
                <p className=" w-[40%] " > 2222 38290610 </p>
                <p className=" w-[20%] " > Male </p>
            </div>
        </div>
      </div>
      <div className=" w-full border-2 border-dashed border-gray-600 rounded-2xl scale-95 flex-col flex items-center justify-center  " >
            <img className="scale-75 translate-y-2 " src={img}  width={80} height={100} alt="..." />
            <p className="py-3 text-sm " > Drop your file to upload </p>
      </div>
      <div className="w-full scale-95 " >
            <button className="cursor-pointer hover:bg-black transition w-full py-3 rounded-lg bg-main text-white " >
                Enregistrer
            </button>
      </div>
    </div>
  );
}

export default EtudiantPopUp;
