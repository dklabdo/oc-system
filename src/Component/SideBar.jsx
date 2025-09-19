import React from 'react'
import logo from '../assets/logo.png'
import { BookMarked, CalendarDays, FileUser, GraduationCap, Home, House, Megaphone, Settings, SquareUser } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function SideBar() {
  const location = useLocation();
  return (
    <div className='bg-black h-full w-56 rounded-2xl flex flex-col justify-between px-3 ' >
        <div className='scale-90 mt-7 justify-center w-full flex items-center ' >
            <img src={logo} alt='...' />
        </div>
        <ul className=' pt-2 flex flex-col gap-2 ' >
            <Link to={"/dashboard"} className={` ${location.pathname === "/dashboard" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><House size={20} /> Dashboard </Link>
            <div className=' w-[85%] mx-auto h-[.4px] my-2 bg-gray-50 ' ></div>
            <Link to={"/enseignant"} className={` ${location.pathname === "/enseignant" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><GraduationCap size={20} />  Enseignants </Link>
            <Link to={"/module"} className={` ${location.pathname === "/module" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><BookMarked size={20} /> Modules </Link>
            <Link to={"/section"} className={` ${location.pathname === "/section" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><SquareUser size={20} /> Section </Link>
            <Link to={"/etudiant"} className={` ${location.pathname === "/etudiant" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><FileUser size={20} /> Etudiant </Link>
            <div className=' w-[85%] mx-auto h-[.4px] my-2 bg-gray-50 ' ></div>
            <Link to={"/plan"} className={` ${location.pathname === "/plan" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><CalendarDays size={20} /> Planing </Link>
            <Link to={"/anonce"} className={` ${location.pathname === "/anonce" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><Megaphone size={20} /> Anonce </Link>
            <div className=' w-[85%] mx-auto h-[.4px] my-2 bg-gray-50 ' ></div>
            <Link to={"/setting"} className={` ${location.pathname === "/setting" ? "bg-gray-50 text-black" : "text-white "} cursor-pointer scale-90 py-2 pl-3 px-2 rounded-md flex items-center gap-2 hover:bg-gray-50 hover:text-black`} ><Settings size={20} /> Parametre </Link>
        </ul>
        <p>dfdsfdsfdsf</p>
    </div>
  )
}

export default SideBar