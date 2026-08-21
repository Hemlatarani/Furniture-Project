"use client"
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { CiFilter } from 'react-icons/ci'
import { FaRegSquare } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'
import { FaSearchPlus } from "react-icons/fa";

export default function Contact() {

      let apibaseurl = import.meta.env.VITE_APIBASEURL

  const [showBar, setShowBar] = useState(false)
  let [search,setsearch]=useState("")

  let [getdetails,setgetdetails]=useState([])

//  
let handlefooter = () => {
  axios.get(`${apibaseurl}/enquiry/get-enquiry`)
    .then((res) => {
      console.log("FULL RESPONSE:", res.data);

      // 🔥 safe extraction
      let data = res.data.data || res.data.EnquiryData || [];

      setgetdetails(data);
    })
    .catch((err) => console.log(err));
};
 useEffect(()=>{
  handlefooter()
 },[])

  return (
    <>
      {/* 🔍 SEARCH BAR (BOX KE UPAR) */}
      {showBar && (
        <div className='flex justify-start p-4 bg-gray-200 border m-5'>
             <div className='flex justify-content-center gap-2'>
                <input onChange={(e)=>setsearch(e.target.value)}
               type="text"
               placeholder="Search here..."
               className='border p-2 rounded w-[260px]'
             />
           <FaSearchPlus  className='mt-[0.5] text-5xl py-2 border rounded-md text-white bg-blue-500' />
             </div>
           

           </div>
      )}

      {/* 📦 MAIN CONTENT BOX */}
      <section className='max-w-[1320px] border mx-5 mt-3 bg-white'>

        {/* Header */}
        <div className='grid grid-cols-[70%_auto] border-b border-gray-600 bg-gray-400 items-center'>
          <h1 className='py-5 px-5 font-bold text-2xl'>
            Content Enquiry Management
          </h1>

          <div className='flex justify-center gap-3'>
            <button
              onClick={() => setShowBar(!showBar)}
              className='bg-blue-500 p-4 rounded-md'
            >
              <CiFilter className='text-white text-xl' />
            </button>

            <button className='bg-green-400 px-4 py-2 rounded-md'>
              Change Status
            </button>

            <button className='bg-red-600 px-4 py-2 rounded-md text-white'>
              Delete
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className='grid grid-cols-[50%_auto] mt-5 px-5 font-bold'>
          <div className='flex gap-3 items-center'>
            <FaRegSquare /> USER INFO
          </div>
          <div className='flex justify-center gap-20'>
            <div>EMAIL</div>
            <div>CONTACT</div>
            <div>MESSAGE</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>
        </div>

        {/* Row */}

        {/* <div className='grid grid-cols-[50%_auto] mt-6 px-5 items-center'>
          <div className='flex gap-3 items-center'>
            <FaRegSquare /> Nail Sims
          </div>

          <div className='flex justify-center gap-16 items-center'>
            <div>lata@gmail.com</div>
            <div>9098776543</div>
            <button className='bg-green-500 px-5 py-1 rounded-md text-white'>
              Active
            </button>
            <div className='bg-blue-700 rounded-full p-2'>
              <BsPencilFill className='text-white' />
            </div>
          </div>
        </div> */}
{
  getdetails.map((item, index) => (
  <div className='grid grid-cols-[50%_auto] mt-5 px-5 '>
      
      <div name="name" className='flex gap-3 items-center'>
        <FaRegSquare /> {item.name}
      </div>

      <div className='flex justify-center gap-5 items-center'>
        <div>{item.email}</div>
        <div>{item.phone}</div>
        <div>{item.subject}</div>
        <div>{item.message}</div>

        <button className='bg-green-500 px-5 py-1 rounded-md text-white'>
          Active
        </button>

        <div className='bg-blue-700 rounded-full p-2'>
          <BsPencilFill className='text-white' />
        </div>
      </div>

    </div>
  ))
}
      </section>
    </>
  )
}
