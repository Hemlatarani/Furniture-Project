import React from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { CiFilter } from "react-icons/ci";
import { FaRegSquare, FaSquare } from "react-icons/fa";
import { BsPencil, BsPencilFill } from 'react-icons/bs';




export default function () {
  <Header />
  return (
    <>
     <div className=" font-bold p-5 text-2xl border-b ">
     <span className='hover:text-blue-700'>Home</span>/<span className='hover:text-blue-700'>User</span></div>
      <section className='max-w-[1320px] border-1 mx-5 mt-3'>
        <div className=' grid grid-cols-[70%_auto] border-b border-gray-600   justify-center bg-gray-400 '>
          <h1 className=' py-5 font-bold'>View User</h1>
          <div className='flex justify-center mb-2'>
            <button className='bg-blue-500 relative  p-[20px_20px] mt-3  mx-3 rounded-md'>
              <CiFilter className='absolute top-[15px] right-[13px] text-white' /></button>
            <button className='bg-green-400 p-[10px_10px] mt-4 rounded-md'>Change Status</button>
            <button className='bg-red-600 mt-3 p-[8px_15px] mx-3 rounded-md'>Delete</button>
          </div>

        </div>
        <div className='grid grid-cols-[40%_AUTO] mt-5'>
          <div className='flex mx-5 gap-10'> <FaRegSquare className='mt-1.5'/>  Name</div>
          <div className='flex justify-center gap-20 font-bold'>
            <div>EMAIL ID</div>
            <div>MOBILE NUMBER</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>
           </div>
        <div className='grid grid-cols-[40%_auto] mt-10'>
          <div className='flex mx-5 gap-10'> <FaRegSquare className='mt-1.5 ' />Nail sims</div>
          <div className='flex justify-around-center  gap-19 py-3 ml-2 '>
            <div className=''>lata@gmail.com</div>
            <div className=''>9098776543</div>
            <button className='bg-green-500 p-[7px_20px] rounded-md text-white'>Active</button>
            <div className='bg-blue-700 rounded-3xl p-[10px_10px] relative'>
              <BsPencilFill className='text-white' />
            </div>
          </div>
        </div>
         <div className='grid grid-cols-[40%_auto] mt-5'>
          <div className='flex mx-5 gap-10'> <FaRegSquare className='mt-1.5 ' />Nail sims</div>
          <div className='flex justify-around-center  gap-19 py-3 ml-2 '>
            <div className=''>lata@gmail.com</div>
            <div className=''>9098776543</div>
            <button className='bg-red-600 p-[7px_18px] rounded-md text-white'>Deactive</button>
            <div className='bg-blue-700 rounded-3xl p-[10px_10px] relative '>
              <BsPencilFill className='text-white '/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

