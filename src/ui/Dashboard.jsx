import { Paperclip } from "lucide-react";
import { Timer } from "lucide-react";
import { File } from "lucide-react";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import img from "../assets/example.png";
import { Plus } from "lucide-react";
import { Bell } from "lucide-react";
import 'animate.css';


function Dashboard() {
  return (
    <div className="parent min-h-full h-full w-full  ">
      <div className="min-h-28   div1  rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <FileStat />
      </div>
      <div className="min-h-28 div2 px-2 bg-white rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <PeapoleStat />
      </div>
      <div className="min-h-72  p-3 div3 bg-white rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <DocumentComp />
      </div>
      <div className="min-h-72 p-3 div4 bg-white rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <GenderStat />
      </div>
      <div className="min-h-[420px] h-scroll  overflow-x-auto p-3 div5 bg-white rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <Anonce />
      </div>
      <div className="min-h-[420px] p-3 div6 bg-white rounded-xl shadow-2xl shadow-gray-100/50 m-2   ">
        <Report/>
      </div>
    </div>
  );
}

function FileStat() {
  return (
    <div className="animate__animated animate__bounceIn w-full h-full  flex gap-4 items-center  ">
      <div className="w-[25%] pl-4  h-full  rounded-md justify-center bg-white px-2 flex flex-col gap-3  ">
        <div className=" w-full flex items-center gap-2 ">
          <div className=" w-9 h-9 flex justify-center items-center rounded-md bg-blue-300/50 ">
            <File className="text-blue-500" size={20} />
          </div>
          <h3 className="  font-semibold text-black  "> 40000 </h3>
        </div>
        <p className="text-sm text-gray-500 ">Document</p>
      </div>
      <div className="w-[25%] pl-4 justify-center h-full  rounded-md bg-white px-2 flex flex-col gap-3  ">
        <div className=" w-full flex items-center gap-2 ">
          <div className=" w-9 h-9 rounded-md flex justify-center items-center bg-orange-300/40 ">
            <Paperclip className="text-orange-400" size={20} />
          </div>
          <h3 className="  font-semibold text-black "> 3000 </h3>
        </div>
        <p className="text-sm text-gray-500 ">Fiche TD</p>
      </div>
      <div className="w-[25%] pl-4 justify-center h-full  rounded-md bg-white px-2 flex flex-col gap-3  ">
        <div className=" w-full flex items-center gap-2 ">
          <div className=" w-9 h-9 rounded-md flex justify-center items-center bg-orange-300/40 ">
            <Paperclip className="text-orange-400" size={20} />
          </div>
          <h3 className="  font-semibold text-black "> 3000 </h3>
        </div>
        <p className="text-sm text-gray-500 ">Fiche TP</p>
      </div>
      <div className="w-[25%] pl-4 justify-center h-full  rounded-md bg-white px-2 flex flex-col gap-3  ">
        <div className=" w-full flex items-center gap-2 ">
          <div className=" w-9 h-9 rounded-md flex justify-center items-center bg-orange-300/40 ">
            <Paperclip className="text-orange-400" size={20} />
          </div>
          <h3 className="  font-semibold text-black "> 3000 </h3>
        </div>
        <p className="text-sm text-gray-500 ">Cours </p>
      </div>
    </div>
  );
}

function PeapoleStat() {
  return (
    <div className="animate__animated animate__bounceIn w-full h-full p-4 flex gap-4  ">
      <div className="bg-[#F8E38D] h-full  w-1/3 justify-center rounded-xl items-center flex flex-col gap-2 ">
        <p className=" text-sm text-gray-700 "> Student </p>
        <h3 className=" text-black font-bold   "> 40000 </h3>
      </div>
      <div className="bg-[#CBCEFF] w-1/3 h-full flex justify-center items-center rounded-xl flex-col gap-2 ">
        <p className=" text-sm text-gray-700 "> Teacher </p>
        <h3 className=" text-black font-bold   "> 40000 </h3>
      </div>
      <div className="bg-[#E2D8FC] w-1/3 h-full flex justify-center items-center rounded-xl flex-col gap-2 ">
        <p className=" text-sm text-gray-700 "> Repoert </p>
        <h3 className=" text-black font-bold   "> 40000 </h3>
      </div>
    </div>
  );
}

function DocumentComp() {
  return (
    <div className="animate__animated animate__bounceIn h-full flex flex-col gap-3  ">
      <h2 className="text-lg pl-3 pb-1 font-semibold text-black ">
        {" "}
        Nouveaux documents{" "}
      </h2>
      <div className="px-3 h-full max-h-full overflow-y-auto w-full flex flex-col gap-3  ">
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
        <div className="bg-gray-50 w-full flex justify-between rounded-md py-3 px-2 ">
          <p className="flex text-sm gap-2">
            {" "}
            <span className="text-main font-semibold">
              {" "}
              M. Karim Belkacem{" "}
            </span>{" "}
            a publié un nouveau document{" "}
          </p>
          <p className="text-sm flex items-center gap-1 text-gray-500 ">
            {" "}
            <Timer size={16} /> 21/09/2025 , 21:00{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

function GenderStat() {
  const malePercentage = 65; // example: 65% male
  const femalePercentage = 35; // example: 35% female

  return (
    <div className=" animate__animated animate__bounceIn flex flex-col  w-full h-full   ">
      <h2 className="text-lg pl-3 pb-1 font-semibold text-black ">
        {" "}
        Students gender statestics{" "}
      </h2>
      <div className="flex  items-center justify-evenly w-full h-full  ">
        <div className="w-32">
          <CircularProgressbar
            value={malePercentage}
            text={`${malePercentage}%`}
            styles={buildStyles({
              pathColor: "#3b82f6", // Tailwind blue-500
              textColor: "#3b82f6",
              trailColor: "#e5e7eb", // Tailwind gray-200
            })}
          />
          <p className="text-center mt-5 justify-center flex items-center gap-2  font-medium">
            {" "}
            <div className="min-h-4 scale-75 min-w-4 w-4 h-4 rounded-full bg-blue-600 ">
              {" "}
            </div>{" "}
            4,4000 (Boys){" "}
          </p>
        </div>
        <div className="w-32">
          <CircularProgressbar
            value={femalePercentage}
            text={`${femalePercentage}%`}
            styles={buildStyles({
              pathColor: "#ec4899", // Tailwind pink-500
              textColor: "#ec4899",
              trailColor: "#e5e7eb",
            })}
          />
          <p className="text-center justify-center flex items-center gap-2 mt-5  font-medium">
            {" "}
            <div className="min-h-4 scale-75 min-w-4 w-4 h-4 rounded-full bg-pink-600 ">
              {" "}
            </div>{" "}
            2,560 (Girls){" "}
          </p>
        </div>
      </div>
    </div>
  );
}

function Anonce() {
  return (
    <div className="animate__animated animate__bounceIn w-full flex flex-col h-full  gap-3 items-center    ">
      <h2 className="text-lg w-full text-start pl-1 py-1 font-semibold text-black ">
        {" "}
        Students gender statestics{" "}
      </h2>
      <div className="gap-2 overflow-x-auto h-full pb-3 w-full flex  ">
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="border-[.7px] relative border-gray-600 min-w-64 w-64 h-full rounded-xl flex flex-col gap-2 p-2  ">
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
        <div className="mr-4 flex flex-col gap-2 justify-center items-center w-52 min-w-52 h-full rounded-md bg-main/60  hover:bg-main ">
          <Plus className="text-white" size={30} />
          <p className=" text-white  ">Ajouter une annonce</p>
        </div>
        <div className="h-full min-w-1 w-1  "></div>
      </div>
    </div>
  );
}

function Report() {
  return (
    <div className="animate__animated animate__bounceIn w-full  h-full flex flex-col ">
      <h2 className="text-lg  pl-3 font-semibold text-black ">
        {" "}
        Repoerts{" "}
      </h2>
      <div className=" flex  p-3  flex-col gap-3 overflow-y-auto  " >
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
        <div className="w-full rounded-xl p-2 border-[1.2px] border-gray-500 flex gap-2  " >
          <div className="min-w-12 min-h-12 w-12 h-12 rounded-md mt-1 bg-main/80 flex justify-center items-center " >
            <Bell className="text-white" size={20} />
          </div>
          <div className="flex flex-col w-full " >
            <h2 className="font-semibold" > Sports Day Announcement </h2>
            <p className=" text-sm text-gray-600 font-light " > The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars! </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
