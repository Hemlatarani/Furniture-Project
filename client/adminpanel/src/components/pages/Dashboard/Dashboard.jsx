import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";

import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
<>

    <div className=" font-bold p-5 text-2xl border-b ">
     <span className='hover:text-blue-700'>Home</span>/<span className='hover:text-blue-700'>Dashboard</span></div>
    <section className='grid grid-cols-3 gap-3 py-5 '>
      <div className='  shadow mx-3 h-[150px] rounded-2xl bg-blue-600 '>
        <div  className='flex justify-around pt-5'>
        <h2 className='flex text-white '>26K <span className='flex justify-center'>(-12.4% <FaArrowDownLong className='pt-2' />)</span></h2>
      <BsThreeDotsVertical className='text-white'/>
    </div>
      <h1 className='text-white mx-11'>User</h1>
  </div>
      <div className='  shadow mx-3 h-[150px] rounded-2xl bg-red-200'>
        <div  className='flex justify-around pt-5'>
        <h2 className='flex text-white '>$6,200 <span className='flex justify-center'>(40.9% <FaArrowUp className='pt-2' />)</span></h2>
      <BsThreeDotsVertical className='text-white'/>
    </div>
      <h1 className='text-white mx-11'>Product</h1>
      </div>
      <div className='  shadow mx-3 h-[150px] rounded-2xl bg-yellow-400'>
        <div  className='flex justify-around pt-5'>
        <h2 className='flex text-white '>2.49% <span className='flex justify-center'>(84.7% <FaArrowUp className='pt-2' />)</span></h2>
      <BsThreeDotsVertical className='text-white'/>
    </div>
      <h1 className='text-white mx-11'>Category</h1>
      </div>
    <div className='  shadow mx-3 h-[150px] rounded-2xl bg-green-400'>
      <div  className='flex justify-around pt-5'>
        <h2 className='flex text-white '>44K <span className='flex justify-center'>(-23.6% <FaArrowDownLong className='pt-2' />)</span></h2>
      <BsThreeDotsVertical className='text-white'/>
    </div>
      <h1 className='text-white mx-11'>Orders</h1>
    </div>
    </section>
</>
   

  )
}
