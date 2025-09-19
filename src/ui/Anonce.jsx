import React from "react";
import { Timer } from "lucide-react";
import img from "../assets/example.png";


function Anonce() {
  return <div className=" w-full h-full bg-white p-3 rounded-2xl  overflow-hidden min-h-full  ">
    <div className=" w-full gap-6 py-6 flex max-h-full pl-5 px-2 overflow-y-auto  flex-wrap h-full rounded-xl bg-white  " >
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
        <AnonceCard/>
    </div>
  </div>;
}

function AnonceCard() {
  return (
    <div className="shadow-gray-200/70 shadow-2xl relative border-gray-600 min-w-64 w-[31%] h-72 rounded-xl flex flex-col gap-2 p-2  ">
      <div className="w-full rounded-md overflow-hidden h-32 ">
        <img src={img} alt="..." className="h-full object-cover w-full " />
      </div>
      <h2 className=" text-sm font-bold ">
        Changement d&apos;horaire pour le TP Réseaux
      </h2>
      <p className=" text-sm font-light line-clamp-2 ">
        Changement d&apos;horaire pour le TP Réseaux
      </p>
      <p className=" absolute scale-75 bottom-1 right-1"> 21/09/2024 </p>
    </div>
  );
}

export default Anonce;
