import React from "react"
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

export default function TableContent() {
    // let [products,setporducts]=useState([])
    // let getproducts= async()=>{
    // axios.get("https://dummyjson.com/products/1")
    //     .then((res)=>res.data)
    //     .then((data)=>setporducts(data.products))
    //     console.log()
    // }
    // useEffect(()=>{
    //     getproducts()
    // },[])
  return (
   <>
   <section>
    <div className='max-wq-[1270px] mx-atuo'>
<div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5 m-5'>
    <div className=' shadow-2xl my-5 '>
        <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" alt="" />
        <div className="flex justify-center gap-5 my-5 ">
            <div className='border'>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" className="w-[100] " alt="" />
            </div>
           <div className='border'>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" className="w-[100] " alt="" />
            </div>
            <div className='border'>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" className="w-[100] " alt="" />
            </div>
            <div className='border'>
                <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/products/1617829052195Caroline%20Study%20Tables__.jpg" className="w-[100] " alt="" />
            </div>
        </div>
    </div>
    <div className=' shadow-2xl px-5'>
        <h1 className="font-bold text-3xl py-2">Caronline Study Tables</h1>
        <div className="flex gap-3 ">
            <h2 className='line-through gap-4'>Rs.3000 </h2>
            <span className='font-bold text-[#c09578]'>Rs.2,500</span>
        </div>
        <h1 className="py-5 border-b border-gray-300 mb-5 ">The Drawer is for your storage needs and camouflages perfectly with the tables carved front. The use of Sheesham ensures its longevity.</h1>
        
        <div className="mt-5">
            <button className="bg-[#c09578] text-white py-2 px-16 rounded">Add to Cart</button>
            <div className="my-5">

            <p className="py-2"> Code:jodST0011</p>
            <p className="py-2">Dimension: 72L * 32H * 30W</p>
            <p className="py-2">Estimate Delivery Days: "40-45" Days</p>
            <p className="py-2">Category: <span className="cursor-pointer">Nest Of Tables</span></p>
            <p className="py-2">Color: <span className="cursor-pointer">Cobalt Blue</span></p>
            <p className="py-2">Material:</p>
            </div>
        </div>
    </div>
    </div>
    <div className="mx-5">
        <h1 className="font-bold text-3xl text-[#c09578] border-b border-gray-300 py-5">Description</h1>
    <p className="py-5">The caroline table is sure to make you travel back in time, aesthetics that have a royal and periodic feel will enhance the look and feel of any space. The Drawer is for your storage needs and camouflages perfectly with the tables carved front. The use of Sheesham ensures its longevity.</p>
    </div>
    </div>
   </section>
   </>
  )
}

