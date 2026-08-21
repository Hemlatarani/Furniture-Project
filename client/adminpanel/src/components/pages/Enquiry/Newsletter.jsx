import React from 'react'
import { CiFilter } from 'react-icons/ci'
import { FaRegSquare } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'

export default function Newsletter() {
  
  return (
    <>
      <section className='max-w-[1320px] border-1 mx-5 mt-3'>
        <div className=' grid grid-cols-[70%_auto] border-b border-gray-600   justify-center bg-gray-400 '>
          <h1 className=' py-5 font-bold text-2xl'>Newsletter Managmentg</h1>
          <div className='flex justify-center mb-2'>
            <button className='bg-blue-500 relative  p-[20px_20px] mt-3  mx-3 rounded-md'>
              <CiFilter className='absolute top-[15px] right-[13px] text-white' /></button>
            <button className='bg-green-400 p-[10px_10px] mt-4 rounded-md'>Change Status</button>
            <button className='bg-red-600 mt-3 p-[8px_15px] mx-3 rounded-md'>Delete</button>
          </div>

        </div>
        <div className='grid grid-cols-[40%_AUTO] mt-5'>
          <div className='flex mx-5 gap-10'> <FaRegSquare className='mt-1.5' />  USER INFO</div>
          <div className='flex justify-center gap-20 font-bold'>
            <div>SUBJECT</div>
            <div>MESSAGE</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>
        </div>
        <div className='grid grid-cols-[40%_auto] mt-10'>
          <div className='flex mx-5 gap-10'> <FaRegSquare className='mt-1.5 ' />Nail sims</div>
          <div className='flex justify-around-center  gap-15 py-3 ml-10'>
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
          <div className='flex justify-around-center  gap-15 py-3 ml-10 '>
            <div className=''>lata@gmail.com</div>
            <div className=''>9098776543</div>
            <button className='bg-red-600 p-[7px_18px] rounded-md text-white'>Deactive</button>
            <div className='bg-blue-700 rounded-3xl p-[10px_10px] relative '>
              <BsPencilFill className='text-white ' />
            </div>
          </div>
        </div>
        
      </section>
    </>
  )
}
