import React, { useState } from "react";

function Planning() {
  const [grp, setGrp] = useState(1);
  const [semestre, setsemestre] = useState(1);
  return (
    <div className=" w-full h-full flex flex-col  gap-3 min-h-full  ">
      <div className=" w-full flex items-center px-4 gap-3 shadow-2xl shadow-gray-100/50 rounded-xl bg-white  h-18 min-h-18 ">
        <div className="py-2 bg-gray-100 w-fit p-2 rounded-md flex gap-2 items-center ">
          {" "}
          <button
            onClick={() => setGrp(1)}
            className={`scale-105 cursor-pointer ${
              grp === 1 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            {" "}
            G1{" "}
          </button>
          <button
            onClick={() => setGrp(2)}
            className={`scale-105 cursor-pointer ${
              grp === 2 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            {" "}
            G2{" "}
          </button>
          <button
            onClick={() => setGrp(3)}
            className={`scale-105 cursor-pointer ${
              grp === 3 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            {" "}
            G3{" "}
          </button>
          <button
            onClick={() => setGrp(4)}
            className={`scale-105 cursor-pointer ${
              grp === 4 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            {" "}
            G4{" "}
          </button>
        </div>
        <div className="py-2 bg-gray-100 w-fit p-2 rounded-md flex gap-2 items-center ">
          {" "}
          <button
            onClick={() => setsemestre(1)}
            className={`scale-105 cursor-pointer ${
              semestre === 1 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            Semestre 1
          </button>
          <button
            onClick={() => setsemestre(2)}
            className={`scale-105 cursor-pointer ${
              semestre === 2 && "bg-white"
            }  px-4 rounded-lg py-1 text-sm font-medium`}
          >
            Semestre 2
          </button>
        </div>
      </div>
      <div className="pb-2 w-full flex flex-col  bg-white shadow-2xl shadow-gray-100/50 rounded-xl h-fit ">
        <div className=" justify-between flex items-center px-4 w-full h-12 min-h-12   ">
          <p>Time</p>
          <p className=" -translate-x-11 ">Dimanche</p>
          <p className=" -translate-x-12 ">Lundi</p>
          <p className=" -translate-x-12 ">Mardi</p>
          <p className=" -translate-x-12 ">Mercredi</p>
          <p className=" -translate-x-12 ">Jeudi</p>
          <p className=" -translate-x-12 ">Samedi</p>
        </div>
        <div className="flex items-center w-full h-full  ">
          <div className="border-r-[1.5px] border-gray-400 w-18 flex justify-between flex-col h-full min-h-full  py-2 ">
            <div className=" w-full flex flex-col items-center  ">
              <h2 className=" font-semibold "> 08:30 </h2>
              <p className=" text-gray-700 text-sm "> 10:00 </p>
            </div>
            <div className=" w-full flex flex-col items-center  ">
              <h2 className=" font-semibold "> 10:00 </h2>
              <p className=" text-gray-700 text-sm "> 11:30 </p>
            </div>
            <div className=" w-full flex flex-col items-center  ">
              <h2 className=" font-semibold "> 11:30 </h2>
              <p className=" text-gray-700 text-sm "> 13:00 </p>
            </div>
            <div className=" w-full flex flex-col items-center  ">
              <h2 className=" font-semibold "> 14:00 </h2>
              <p className=" text-gray-700 text-sm "> 15:30 </p>
            </div>
            <div className=" w-full flex flex-col items-center  ">
              <h2 className=" font-semibold "> 15:30 </h2>
              <p className=" text-gray-700 text-sm "> 17:00 </p>
            </div>
          </div>
          <div className="h-full overflow-auto p-4 min-h-full w-full  ">

          </div>
        </div>
      </div>
    </div>
  );
}

function PlaningCard({ type, module, prof, salle }) {
  return (
    <div className="p-2 bg-white min-w-32 w-62 max-w-62 h-38 min-h-38  rounded-xl ">
      <div className="bg-gray-200 rounded-xl w-full h-full "></div>
    </div>
  );
}

export default Planning;
