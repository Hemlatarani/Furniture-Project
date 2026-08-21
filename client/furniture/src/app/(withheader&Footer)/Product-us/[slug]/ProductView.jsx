"use client"
import React, { useState } from 'react'

export default function ProductView({ data, staticPath }) {
  let [currentImg, setcurrentImg] = useState(staticPath + data.productImage)

  return (
    <section>
      <div className='max-w-[1270px] mx-auto grid grid-cols-[45%_auto] py-5 gap-10'>
        <div>
          <img width={"100%"} src={currentImg} alt="" />
          <div className='flex gap-2 mt-2'>
            <img onClick={() => setcurrentImg(staticPath + data.productImage)} className='border-1 cursor-pointer' width={"25%"} src={staticPath + data.productImage} alt='' />
            {data.backImage && (
              <img onClick={() => setcurrentImg(staticPath + data.backImage)} className='border-1 cursor-pointer' width={"25%"} src={staticPath + data.backImage} alt='' />
            )}
          </div>
        </div>
        <div className='py-5'>
          <h1 className='font-bold text-2xl'>Product Name: &nbsp;&nbsp;{data.productName}</h1>
          <h3 className='mt-5'>
            <span className='underline text-2xl' > Actul Price :&nbsp;&nbsp; <span className='line-through'>{data.actulPrice}</span></span>
            <br/>
            <br/>
            &nbsp;<span className='text-2xl underline'>Sale Price :&nbsp;&nbsp;{data.salePrice}</span>
          </h3>
          <p className='mt-8'>{data.productDesc}</p>
          <hr className='mt-2 border-[#eee]' />
          <button className='mt-10 bg-amber-500 p-3 w-[300px] rounded text-white cursor-pointer'>Add To Cart</button>
        </div>
      </div>
    </section>
  )
}
