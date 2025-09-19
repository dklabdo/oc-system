import React, { useEffect, useState } from "react";
import img from "../assets/temp.png";
import { ChevronLeft } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { BookCheck } from "lucide-react";
import { User2 } from "lucide-react";
import { LibraryBig } from "lucide-react";
import { X } from "lucide-react";
import { Plus } from "lucide-react";

function Section() {
  const [section, setsection] = useState([]);
  const [currentSection, setcurrentSection] = useState(0);
  function handleSelection(select) {
    setsection([...section, select]);
  }
  const replaceLast = (newValue) => {
    setsection((prev) => {
      if (prev.length === 0) return prev; // handle empty array
      return [...prev.slice(0, -1), newValue];
    });
  };

  const removeLast = () => {
    setsection((prevItems) => prevItems.slice(0, -1));
  };

  return (
    <div className=" w-full h-full overflow-hidden items-center flex flex-col gap-4 min-h-full bg-gray-50 ">
      <div className="text-gray-700 shadow-2xl shadow-gray-100/50 flex items-center px-3 h-16 min-h-16  w-full rounded-xl bg-white ">
        <span className="mr-[6px] "> Home </span>
        {section.map((sec, index) => {
          return (
            <span className="mr-[6px]" key={index}>
              {" "}
              &gt; {sec}{" "}
            </span>
          );
        })}
      </div>
      <div className=" h-full overflow-y-hidden max-h-full   w-full  flex gap-4 ">
        <div className=" h-full px-2 w-[25%] shadow-2xl shadow-gray-100/50 bg-white rounded-xl ">
          {section.length === 0 && <SelectSystem fnc={handleSelection} />}
          {section.length === 1 && (
            <SelectSpecialite prev={removeLast} fnc={handleSelection} />
          )}
          {section.length === 2 && (
            <SelectNiveau prev={removeLast} fnc={handleSelection} />
          )}
          {section.length > 2 && (
            <SelectSection
              currentSection={currentSection}
              setcurrentSection={setcurrentSection}
              prev={removeLast}
              fnc={replaceLast}
              fnc2={handleSelection}
            />
          )}
        </div>
        <div className=" h-full w-[75%] shadow-2xl shadow-gray-100/50 bg-white rounded-xl ">
          {section.length === 0 && <Temp />}
          {section.length === 1 && <Temp />}
          {section.length === 2 && <Temp />}
          {section.length > 2 && <SectionDetails />}
        </div>
      </div>
    </div>
  );
}

function Temp() {
  return (
    <div className="flex flex-col  justify-center items-center w-full h-full   ">
      <img src={img} alt="..." className=" w-52 h-44 " />
      <h2 className="text-center  text-lg font-semibold text-black  ">
        Aucun document disponible
      </h2>
      <p className="text-center text-sm text-gray-800  ">
        {" "}
        Veuillez sélectionner une section, un niveau spécifique pour afficher{" "}
        <br /> les documents associés.{" "}
      </p>
    </div>
  );
}

function SelectSystem({ fnc }) {
  return (
    <div className=" w-full h-full flex flex-col py-8 justify-between  ">
      <div className=" w-full  flex flex-col gap-3 px-3 items-center ">
        <h2 className="text-lg  font-semibold">Etape 1</h2>
        <p className="text-gray-700 text-sm text-center">
          Sélectionnez entre les deux systèmes d&apos;enseignement disponibles.
        </p>
      </div>
      <div className=" p-4 flex flex-col gap-4  ">
        <div
          onClick={() => fnc("LMD")}
          className="hover:text-white flex transition-all cursor-pointer justify-center items-center w-full h-32 bg-gray-100 hover:bg-main rounded-xl   "
        >
          <h2 className=" text-lg text-center font-semibold ">
            Systéme <br /> LMD
          </h2>
        </div>
        <div
          onClick={() => fnc("Classique")}
          className="hover:text-white flex transition-all cursor-pointer justify-center items-center  w-full h-32 bg-gray-100 hover:bg-main rounded-md   "
        >
          <h2 className=" text-lg text-center font-semibold ">
            Systéme <br /> Classique
          </h2>
        </div>
      </div>
    </div>
  );
}

function SelectSpecialite({ prev, fnc }) {
  const sp = [
    "Informatique",
    "Mathematique",
    "Physique",
    "Chimie",
    "Biologie",
    "Géologie",
    "Mécanique",
    "Électronique",
    "Électromécanique",
    "Génie civil",
  ];
  return (
    <div className=" w-full relative gap-6 py-8 h-full flex flex-col   ">
      <button
        onClick={() => prev()}
        className=" bg-gray-100 flex justify-center items-center w-8 h-8 absolute top-3 left-1  hover:text-white hover:bg-main transition-all rounded-full  "
      >
        {" "}
        <ChevronLeft size={20} />{" "}
      </button>
      <div className=" w-full h-28  flex flex-col gap-3 px-3 items-center ">
        <h2 className="text-lg  font-semibold">Etape 2</h2>
        <p className="text-gray-700 text-sm text-center">
          Sélectionnez entre les specialité d&apos;de votre departement.
        </p>
      </div>
      <div className="h-full w-full  thin-scroll2  mt-2 overflow-y-auto items-center flex flex-col gap-4  ">
        {sp.map((s, i) => (
          <div
            onClick={() => fnc(s)}
            key={i}
            className="hover:text-white scale-90 flex transition-all cursor-pointer justify-center items-center w-full py-3 bg-gray-100 hover:bg-main rounded-md   "
          >
            <h2 className=" text-sm text-center font-semibold ">{s}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectNiveau({ prev, fnc }) {
  const level = [
    "L1 (1 ére année licence)",
    "L2 (2 éme année licence)",
    "L3 (3 éme année licence) ",
    "M1 (1 ére année master)",
    "M2 (2 éme année master)",
  ];
  return (
    <div className=" w-full relative gap-6 py-8 h-full flex flex-col   ">
      <button
        onClick={() => prev()}
        className=" bg-gray-100 flex justify-center items-center w-8 h-8 absolute top-3 left-1  hover:text-white hover:bg-main transition-all rounded-full  "
      >
        {" "}
        <ChevronLeft size={20} />{" "}
      </button>
      <div className=" w-full h-28  flex flex-col gap-3 px-3 items-center ">
        <h2 className="text-lg  font-semibold">Etape 3</h2>
        <p className="text-gray-700 text-sm text-center">
          Sélectionnez L'année universitaire d&apos;de la specialité.
        </p>
      </div>
      <div className="h-full w-full  thin-scroll2  mt-2 overflow-y-auto items-center flex flex-col gap-4  ">
        {level.map((s, i) => (
          <div
            onClick={() => fnc(s)}
            key={i}
            className="hover:text-white group scale-90 flex transition-all cursor-pointer gap-4 justify-center items-center w-full py-3 bg-gray-100 hover:bg-main rounded-xl   "
          >
            <div className=" w-9 group-hover:bg-gray-50 bg-[#FFD143]/50 text-main flex items-center justify-center rounded-md h-9 ">
              {" "}
              {s.charAt(0)}{" "}
            </div>
            <h2 className=" text-sm text-center font-semibold ">{s}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectSection({ currentSection, setcurrentSection,fnc2 , prev, fnc }) {
  const sp = [
    "Section 1",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
    "Section 2",
  ];

  useEffect(() => {
    fnc2(sp[0]);
  }, []);

  return (
    <div className=" w-full relative gap-6 py-6 h-full flex flex-col   ">
      <button
        onClick={() => prev()}
        className=" bg-gray-100 flex justify-center items-center w-8 h-8 absolute top-3 left-1  hover:text-white hover:bg-main transition-all rounded-full  "
      >
        {" "}
        <ChevronLeft size={20} />{" "}
      </button>
      <div className=" w-full h-28  flex flex-col gap-3 px-3 items-center ">
        <h2 className="text-lg  font-semibold">Manage</h2>
        <p className="text-gray-700 text-sm text-center">
          Sélectionnez la specialite &apos;Les enseignant et les enseignants de
          la section.
        </p>
      </div>
      <div className=" w-full  thin-scroll2  mt-2 overflow-y-auto items-center flex flex-col gap-4  ">
        {sp.map((s, i) => (
          <div
            onClick={() => {
              setcurrentSection(i), fnc(s);
            }}
            key={i}
            className={` ${
              currentSection === i
                ? "bg-main text-white"
                : "hover:text-white hover:bg-main "
            } scale-90 flex transition-all cursor-pointer gap-4 justify-center items-center w-full py-3 bg-gray-100  rounded-md   `}
          >
            <h2 className=" text-sm text-center font-semibold ">{s}</h2>
          </div>
        ))}
      </div>
      <div className=" px-3 ">
        <button className="cursor-pointer  w-full py-2 rounded-md flex justify-center items-center bg-black text-white transition-all hover:bg-main hover:text-white  ">
          {" "}
          <PlusCircle size={22} />{" "}
        </button>
      </div>
    </div>
  );
}

function SectionDetails() {
  const [action, setaction] = useState("Modules");
  return (
    <div className="flex flex-col gap-2 w-full p-2 h-full ">
      <div className=" w-full h-14 items-center flex justify-between  ">
        <div className="scale-90 -translate-x-1 flex rounded-lg p-1 gap-2 bg-gray-200 items-center ">
          <button
            onClick={() => setaction("Modules")}
            className={` cursor-pointer rounded-md ${
              action === "Modules" && "bg-white"
            } text-sm w-fit p-2 flex items-center gap-2 `}
          >
            <BookCheck size={16} /> Modules{" "}
          </button>
          <button
            onClick={() => setaction("Enseignants")}
            className={` cursor-pointer rounded-md ${
              action === "Enseignants" && "bg-white"
            } text-sm w-fit p-2 flex items-center gap-2 `}
          >
            <User2 size={16} /> Enseignants{" "}
          </button>
        </div>
        <button
          title="Ajouter un enseignant"
          className="px-2   gap-1 text-sm justify-center items-center flex h-10 rounded-md bg-main mr-2 scale-95 cursor-pointer text-white hover:bg-main "
        >
          {" "}
          <Plus size={19} /> Ajouter un {action}
        </button>
      </div>
      <div className=" w-full px-2 h-full ">
        {action === "Modules" && <Modules />}
        {action === "Enseignants" && <Enseignants />}
      </div>
    </div>
  );
}

function Modules() {
  return (
    <div className=" w-full py-5  flex flex-wrap gap-4 ">
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Algorithme </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />{" "}
        </button>{" "}
      </div>
    </div>
  );
}

function Enseignants() {
  return (
    <div className=" w-full overflow-y-auto max-h-full pb-12 py-5  flex flex-wrap gap-4 ">
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
      <div className="h-fit w-fit text-white flex items-center gap-2 p-3 rounded-md bg-black  ">
        {" "}
        <LibraryBig size={16} strokeWidth={2.25} /> <p> Dr boukli hacene </p>{" "}
        <button className="hover:text-main  ">
          {" "}
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default Section;
