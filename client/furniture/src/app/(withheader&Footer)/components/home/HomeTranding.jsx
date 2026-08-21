 import React from 'react'

export default function HomeTranding() {
  return (
    <section className="my-8 ">
      <div className="overflow-hidden flex justify-center ">
        
        {/* Banner Wrapper */}
        <div className=" relative  rounded-lg shadow-2xl bg-yellow-100">
          
          {/* Image */}
          <img
            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/home-page/e9234fa4-3ff6-4a6e-a00e-0c9ff26e7b20-1670180400.jpg"
            alt="Trending Collection"
            className=""/>

         
          {/* <div className="left-10  absolute z-1 bottom-5  overflow-hidden py-10 group-hover w-full grid grid-cols-1">
           <div className='hover:scale-110 px-10 duration-800 '> 

      <h1 className="font-bold lg:text-4xl sm:text-4xl md:text-2xl top-200  ml-10 py-5">New Trending Collection</h1>   
       <p className='ml-10 py-2 text-1xl font-bold'>We Believe That Good Design is Always in Season</p>
      <button className='mt-5  ml-10 py-3 border-1 p-2 text-[#c09578] hover:bg-[#c09578] hover:text-white hover:border-red'>SHOPPING NOW</button>
      </div> 
</div> */}
<div className="
  absolute bottom-5 
  left-1/2 -translate-x-1/2 
  lg:left-10 lg:translate-x-0
  w-full grid grid-cols-1
">

  <div className="px-10 hover:scale-110 duration-700 text-center lg:text-left">

    <h1 className="font-bold lg:text-4xl sm:text-4xl md:text-2xl py-5">
      New Trending Collection
    </h1>   

    <p className="py-2 text-lg font-bold">
      We Believe That Good Design is Always in Season
    </p>

    <button className="mt-5 py-3 border p-2 text-[#c09578] hover:bg-[#c09578] hover:text-white">
      SHOPPING NOW
    </button>

  </div> 
</div>

        </div>

      </div>
    </section>
  )
}
