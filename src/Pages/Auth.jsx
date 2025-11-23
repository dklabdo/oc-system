import React, { useEffect, useState } from "react";
import bgAuth from "../assets/bg-auth.svg";
import logo from "../assets/logo.png";
import { LockIcon, Mail, User2Icon } from "lucide-react";
import { CircleUser } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Lock } from "lucide-react";
import { useAuth } from "@/Hooks/useAuth";

function Auth() {
  const { login, isLoading, isError, error } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login({ email, password });

  }

  const [currentRole, setCurrentRole] = useState("Admin");
  useEffect(() => {
    localStorage.setItem("role", currentRole);
  }, [currentRole]);

  return (
    <div className=" w-full overflow-y-hidden h-dvh flex bg-gray-50 items-center ">
      <div className="items-center pt-14 pb-4 flex flex-col justify-between  w-[60%] h-dvh ">
        <div className="items-center  w-full flex flex-col  ">
          <div className="flex mb-4 scale-90 justify-center items-center w-18 h-18 rounded-2xl bg-emerald-300/20 ">
            <CircleUser className="text-gray-500" size={35} />
          </div>
          <h3 className="font-medium text-lg ">
            Connexion - Espace Administrateur
          </h3>
          <p className="text-sm">
            Gérer les enseignants, les plannings, les modules et les groupes.
          </p>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="items-center scale-95 w-[60%] flex flex-col gap-8 "
        >
          <div className=" w-full ">
            <label className="translate-y-2 flex items-center gap-2 pl-1 ">
              {" "}
              <Mail size={18} /> E-mail
            </label>{" "}
            <br />
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="outline-none border border-gray-300 rounded-md px-3 py-3 w-full  focus:border-main "
            />
          </div>
          <div className="relative w-full ">
            <label className="translate-y-2 flex gap-2 items-center pl-1 ">
              <LockIcon size={18} /> Mot de pass
            </label>{" "}
            <br />
            <input
              type="password"
              placeholder="*************"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="outline-none border  border-gray-300 rounded-md px-3 py-3 w-full  focus:border-main "
            />
            {/* <button
              type="button"
              className="bottom-[14px] right-[10px] absolute "
            >
              {" "}
              <Lock size={20} />{" "}
            </button> */}
          </div>
          <div className="flex w-full justify-between">
            <div className=" flex items-center gap-1 ">
              {" "}
              <input
                id="connect"
                className="caret-main fill-main "
                type="checkbox"
              />{" "}
              <label htmlFor="connect" className="mb-[1px] ">
                Rester connecter
              </label>{" "}
            </div>
            <a className="text-gray-700 underline  "> Mot de pass oublier ? </a>
          </div>
          <button
            type="submit"
            className=" w-full h-12 bg-main rounded-md text-white "
          >
            Connecter
          </button>
        </form>
        <p className=" text-main text-sm ">
          Accès réservé aux membres de l&apos;équipe administrative.
        </p>
      </div>
      <div className="bg-gradient-to-b relative from-main to-main/70 w-[40%] h-dvh ">
        <img
          src={bgAuth}
          alt=""
          className=" w-full absolute top-0 h-full object-cover "
        />
        <div className=" w-full h-dvh flex justify-center items-center flex-col gap-8 ">
          <div className="scale-90 w-22 h-22 rounded-3xl bg-black ">
            <img src={logo} alt="" className=" w-full p-4 " />
          </div>
          <h2 className="text-center text-xl font-semibold text-white ">
            Bienvenue dans l&apos;Espace Administrateur
          </h2>
          <ul className="text-center text-white px-5 w-full text-sm ">
            <li>Gérer les enseignants et leurs affectations</li>
            <li>Créer et organiser les modules</li>
            <li>Structurer les groupes, sections et niveaux</li>
            <li>Construire et ajuster le planning hebdomadaire</li>
          </ul>
          <div className="absolute py-1 px-1 scale-95 bottom-4 flex rounded-lg items-center  bg-white h-12 w-[90%] ">
            <div
              onClick={() => setCurrentRole("Admin")}
              className={` cursor-pointer  ${
                currentRole === "Admin"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } text-sm flex items-center justify-center w-1/2  h-full scale-90 rounded-md `}
            >
              Compte Departement
            </div>
            <div
              onClick={() => setCurrentRole("Teacher")}
              className={`  cursor-pointer ${
                currentRole === "Teacher"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } text-sm flex items-center justify-center w-1/2    h-full scale-90 rounded-md `}
            >
              Compte Enseignant
            </div>
            <div
              onClick={() => setCurrentRole("SuperAdmin")}
              className={`  cursor-pointer ${
                currentRole === "SuperAdmin"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              } text-sm flex items-center justify-center w-1/2    h-full scale-90 rounded-md `}
            >
              Compte Université
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
