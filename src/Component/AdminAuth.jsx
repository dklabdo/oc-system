import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LockIcon, Mail, ShieldAlert } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Lock } from "lucide-react";


function AdminAuth() {
     const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

  }
  return (
    <Dialog>
        <DialogTrigger asChild>
          <button className=' px-6 py-3 scale-95 bg-gray-200 text-black '  ><ShieldAlert /></button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <p className='text-lg pb-2 ' > Company admin access </p>
          <form
          onSubmit={(e) => handleSubmit(e)}
          className="items-center scale-95  flex flex-col gap-8 "
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
        </DialogContent>
    </Dialog>
  )
}

export default AdminAuth
