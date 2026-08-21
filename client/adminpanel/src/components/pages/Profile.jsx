import { Link, useNavigate } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { LoginContext } from "../../context/Maincontext";
import { useContext, useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import axios from "axios";
import Header from "../common/Header";



export default function Profile() {
  const [open, setOpen] = useState(false);
  const { id, setid } = useContext(LoginContext);
  let [activeTab,setActiveTab]=useState('edit')
  let [imagepreview,setimagepreview]=useState(null)

  let apibaseurl=import.meta.env.VITE_APIBASEURL
  let changepassword=(e)=>{
e.preventDefault()
 let formData=new FormData(e.target)

    axios.put(`${apibaseurl}/auth/change-password/${id}`,formData)
    .then((res)=>res.data)
    .then((finalRes)=>{

    })
}

  let navigate=useNavigate();
  const handleLogout = () => {
    setid("");           // context clear
    setOpen(false);      // dropdown close
  };

  useEffect(()=>{
    navigate('/profile')

  },[])
  return (
    <>

      {/* HEADER */}
      <div className="flex justify-between items-center border-b px-4 py-3 overflow-visible">
            
             

      </div>
      
      <Link to="/dashboard" className="hover:text-blue-700 mx-2 border-b cursor-pointer">
  Home
  </Link>/
  <Link to="/profile"className="hover:text-blue-700 mx-2 border-b cursor-pointer">
  Profile
</Link>

      <div className="grid grid-cols-[30%_70%] gap-10 border-1 p-5 m-3">


<div className=" border shadow-md m-2 rounded-md h-70 w-100%">

<div className="flex justify-center items-center ">
  <img src="https://media.istockphoto.com/id/2042526830/photo/successful-businesswoman-using-laptop-working-in-office-business-technology-corporate-concept.jpg?s=612x612&w=0&k=20&c=-NJyxcMesUAKzzPwoHXC10ZuBHPGa1dRp1gFl2T37o8="
            className="h-20 w-20 rounded-full object-cover cursor-pointer border mt-3"
            alt="profile"
            />
</div>
          <h1 className=" text-center text-xl mt-2">Admin</h1>
<h1 className="text-2xl italic underline mx-2 mt-5">Contact Information</h1>
<div className="flex m-3 gap-2">
  <FaPhone  className="mt-2  text-sm text-blue-500 "/>
<h5 className=" underline ">: 9087654321</h5>
</div>
<div className="flex ml-2 ">
<IoIosMail className="mt-1  text-xl text-yellow-500 " />

<h5 className="mx-2 underline">:   Lata@gmail.com</h5>
</div>
{/* <div className="flex justify-center">

</div> */}
            </div>

       
         <div className="bg-white rounded-lg shadow-md p-6">
      {/* TABS */}
      <div className="flex gap-6 border-b mb-6">
        <button
          onClick={() => setActiveTab("edit")}
          className={`pb-2 font-medium ${
            activeTab === "edit"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}>
          Edit Profile
        </button>

        <button
          onClick={() => setActiveTab("password")}
          className={`pb-2 font-medium ${
            activeTab === "password"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}>

          Change Password
        </button>
      </div>

      {/* CONTENT */}
        {activeTab === "edit" && (
      <form >
        <div className="grid grid-cols-12 gap-6">
          {/* Image Box */}
          <div className="col-span-12 md:col-span-4">
            <div className="border-2 border-dashed rounded-lg h-40 flex flex-col items-center justify-center text-gray-400">
              ☁️
              <input type="file"
              onClick={(e)=>setimagepreview(e.target.files[0])} className="text-sm m-5"/>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 md:col-span-8 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded px-4 py-2"/>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-2"/>
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full border rounded px-4 py-2"/>

            <button className="bg-purple-600 text-white px-6 py-2 rounded">
              Update Profile
            </button>
          </div>
        </div>
</form>
      )}

{activeTab === "password" && (
<form onSubmit={changepassword}>
        <div className="w-full space-y-4">
          <label className="text-1xl">Old Password</label>
          <input
          name="OldPassword"
            type="password"
            placeholder="Old Password"
            className="w-full border rounded px-4 py-2"/>
          <label className="text-1xl">New Password</label>
          <input
          name="NewPassword"
            type="password"
            placeholder="New Password"
            className="w-full border rounded px-4 py-2"/>
          <label className="text-1xl">Confirm Password</label>
          <input
          name="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded px-4 py-2"/>
          <button className="bg-purple-600 text-white px-6 py-2 rounded">
            Change Password
          </button>
        </div>
      </form>
      )}
    </div> 
      </div>

  
      
    </>
  );
}


// for practice 
// import React, { useState } from 'react'

// export default function Profile() {

//   return (
//     <div className=' w-full border-1 rounded-md m-3 object-cover'>
//  <h1 className='text-1xl font-style'>Profile </h1>
//     <div className='grid grid-cols-[30%_70%] gap-10 p-5'>
    
//       <div className='border rounded '>left</div>
//       <div className='border rounded '>right</div>
      
//     </div>
//     </div>
//   )
// }

