import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { LoginContext } from "../../context/Maincontext";
import { CgProfile } from "react-icons/cg";
import { RiProfileFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";



export default function Header() {
  const [open, setOpen] = useState(false);
  let { id, setid } = useContext(LoginContext)

  return (
    <>
      <div className="flex justify-between items-center border-b px-4 py-3 overflow-visible">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <LuMenu className="text-2xl" />
          <h2 className="font-semibold">Dashboard</h2>
        </div>

        {/* PROFILE */}
        <div
          className="relative overflow-visible"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* TOP AVATAR */}
          <img
            src="https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-simon73-1266810.jpg&fm=jpg"
            className="h-10 w-10 rounded-full object-cover cursor-pointer border"
            alt="profile"
          />

          {open && (
            <div className="absolute right-0  w-60 bg-white rounded-lg shadow-xl border z-[9999]">



              {/* MENU */}
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                <div className="flex  gap-2">
                  <CgProfile className="mt-1" />
                  <h4> Profile</h4>
                </div>

              </Link>
              <Link to="/company-profile" className="block px-4 py-2 hover:bg-gray-100">
                <div className="flex gap-2">
                  <RiProfileFill className="mt-1 text-blue-500" />
                  <h4> Company Profile</h4>
                </div>
              </Link>
              <button onClick={() => setid('')} className="w-full text-left px-4 py-2 text-1xl hover:bg-gray-100">
                <div className="flex gap-2 ">
                  <FaLock className="mt-1 text-yellow-500" />
                   <h4>Logout</h4>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
