import React from "react";
import logo from "../assets/logo.png";
import {
  BookMarked,
  Building2,
  CalendarDays,
  Dock,
  File,
  FileUser,
  GraduationCap,
  Home,
  House,
  Megaphone,
  Settings,
  SquareUser,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MoveLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";

function SideBar() {
  const role = localStorage.getItem("role");
  return (
    <div className="bg-black h-full w-56 rounded-2xl flex flex-col  px-3 ">
      <div className="scale-90 my-10 justify-center w-full flex items-center ">
        <img src={logo} alt="..." />
      </div>
      {role === "Admin" && <DeptSideBar />}
      {role === "Teacher" && <EnseignantSideBar />}
      {role === "SuperAdmin" && <UnivSideBar />}
      <div className="flex absolute bottom-2 items-center gap-2 pb-6 text-sm px-5 text-white ">
        <p> 2025-2026 , S1 </p>
      </div>
    </div>
  );
}

function DeptSideBar() {
  const location = useLocation();

  return (
    <ul className=" pt-2 flex flex-col gap-2 ">
      <Link
        to={"/dashboard"}
        className={` ${
          location.pathname === "/dashboard"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <House size={20} /> Dashboard{" "}
      </Link>
      <div className=" w-[85%] mx-auto h-[.2px] my-3 bg-gray-50 "></div>
      <Link
        to={"/section"}
        className={` ${
          location.pathname === "/section"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <SquareUser size={20} /> Section{" "}
      </Link>
      <Link
        to={"/module"}
        className={` ${
          location.pathname === "/module"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <BookMarked size={20} /> Modules{" "}
      </Link>
      <Link
        to={"/enseignant"}
        className={` ${
          location.pathname === "/enseignant"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <GraduationCap size={20} /> Enseignants{" "}
      </Link>

      <Link
        to={"/etudiant"}
        className={` ${
          location.pathname === "/etudiant"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <FileUser size={20} /> Etudiant{" "}
      </Link>
      <div className=" w-[85%] mx-auto h-[.1px] my-3 bg-gray-50 "></div>
      <Link
        to={"/plan"}
        className={` ${
          location.pathname === "/plan"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <CalendarDays size={20} /> Planing{" "}
      </Link>
      <Link
        to={"/anonce"}
        className={` ${
          location.pathname === "/anonce"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <File size={20} /> Documents{" "}
      </Link>
    </ul>
  );
}

function EnseignantSideBar() {
  const location = useLocation();

  return (
    <ul className=" pt-2 flex flex-col gap-2 ">
      <Link
        to={"/dashboard"}
        className={` ${
          location.pathname === "/dashboard"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <House size={20} /> Dashboard{" "}
      </Link>
      <div className=" w-[85%] mx-auto h-[.2px] my-3 bg-gray-50 "></div>
      <Link
        to={"/anonce"}
        className={` ${
          location.pathname === "/anonce"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <File size={20} /> Documents{" "}
      </Link>
      <Link
        to={"/enseignantSpace"}
        className={` ${
          location.pathname === "/enseignantSpace"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <SquareUser size={20} /> Profile{" "}
      </Link>

      <Link
        to={"/etudiant"}
        className={` ${
          location.pathname === "/etudiant"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <FileUser size={20} /> Etudiant{" "}
      </Link>
      <div className=" w-[85%] mx-auto h-[.1px] my-3 bg-gray-50 "></div>
      <Link
        to={"/plan"}
        className={` ${
          location.pathname === "/plan"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <CalendarDays size={20} /> Planing{" "}
      </Link>
    </ul>
  );
}

function UnivSideBar() {
  const location = useLocation();

  return (
    <ul className=" pt-2 flex flex-col gap-2 ">
      <Link
        to={"/dashboard"}
        className={` ${
          location.pathname === "/dashboard"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <House size={20} /> Dashboard{" "}
      </Link>

      <Link
        to={"/departement"}
        className={` ${
          location.pathname === "/departement"
            ? "bg-gray-50 text-black"
            : "text-white "
        } cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`}
      >
        <Building2 size={20} /> Department{" "}
      </Link>
    </ul>
  );
}

export default SideBar;
