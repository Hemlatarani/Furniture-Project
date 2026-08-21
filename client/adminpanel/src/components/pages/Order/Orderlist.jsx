import React, { useEffect, useState } from 'react'
import { BsEmojiGrin } from "react-icons/bs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // mene useNavigate import kiya view button ke liye


export default function Orderlist() {
  let navigate = useNavigate() // mene navigate banaya

  let [showorder,setshoworder]=useState([])

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let getviewData=()=>{
    axios.get(`${apibaseurl}/order/get-order`) // mene extra /admin hataya, .env me already /admin hai
    .then((res)=>{
      console.log("orderfinalRes",res.data)
      setshoworder(res.data.viewadmin) // mene res.data.viewadmin kiya, pehle finalRes.viewadmin tha jo undefined tha
    })

  }
  useEffect(()=>{
    getviewData()
  },[])
  return (

    <section  className='bg-blue-900 p-4 text-white '>
      <div className="border-1 mx-10 mt-10 rounded-md p-[10px_10px] bg-white">
  <div className="border-b bg-gray-400">
    <h1 className="py-4 mx-3 font-bold text-xl text-black">Order's List</h1>
  </div>
  {/* Header Row */}
  <div className="grid grid-cols-9 text-center font-bold py-4 border-b bg-blue-100 text-black">
    <div><button className='p-2   bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-md
'>Delete</button></div>
    <div>SR No.</div>
    <div>Order Id</div>
    <div>NAME</div>
    <div>QUANTITY</div>
    <div>PRICE</div>
    <div>DATE</div>
    <div>STATUS</div>
    <div>VIEW</div>
  </div>

  {/* Data Row */}
  {showorder.map((item,index)=>{
  return(
       <div key={index} className="grid grid-cols-9 text-center py-4 items-center bg-blue-900 text-white">
    
    <div><input type="checkbox" /></div>
    <div>{index + 1}</div>
    <div className="break-all text-xs">{item._id}</div>
    <div className="break-all text-xs">{item.userId}</div> {/* mene orderItem ki jagah userId lagaya */}
    <div>{item.orderQty}</div> {/* mene quantity ki jagah orderQty lagaya */}
    <div>{item.orderAmount}</div> {/* mene price ki jagah orderAmount lagaya */}
    <div>{item.createdAt}</div> {/* mene date ki jagah createdAt lagaya */}
    <div>{item.orderStatus}</div> {/* mene status ki jagah orderStatus lagaya */}

    <button onClick={()=>navigate(`/order/detail/${item._id}`)} className="rounded-md bg-gradient-to-tl from-red-400 via-orange-400 via-yellow-400 via-green-400 to-blue-400 p-1">View</button> {/* mene navigate add kiya order id ke saath */}
  </div>

  )
})}

 </div>
 <div className=' flex justify-between m-20'>
        <div>

 <h4>© 2025 WsCube Tech™. All Rights Reserved.
</h4>
        </div>
<div className='flex'>

 <h4>Design by lata</h4>
 <BsEmojiGrin  className='text-red-800 py-1 bg-white  text-[30px] hover:bg-red-800 rounded-full text-red-900'/>
</div>
       </div> 

    </section>
  )
}
