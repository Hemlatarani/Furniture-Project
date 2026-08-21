// "use client"
// import React, { useEffect, useState } from 'react'
// import Breadcrumb from '../common/Breadcrumb'
// import Productfilter from './Productfilter'
// import Productlist from './Productlist'
// import axios from 'axios'

// export default function Products() {
//     let [product,setproducts]=useState();
    
//     let getproduct=()=>{
//         axios.get("https://dummyjson.com/products")
//         .then((Res)=>Res.data)
//         .then((final)=> setproducts(final.products))
        
//     }

//     useEffect(()=>{
//         getproduct();
//     },[])
  
//     let pageName="Products"
//   return (
//     <>
//     <Breadcrumb  pageName={pageName}/>
//     <div className='max-w-[1270px] mx-auto   grid grid-cols-[20%_auto] gap-10 '>

//     <Productfilter/>
//     <Productlist product={product}/>
//     </div>
//     </>
//   )
// }

"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Breadcrumb from "@/app/common/Breadcrumb";
import Productfilter from "./Productfilter";
import Productlist from "./Productlist";

export default function page() {

  return (
    <div>
      <Breadcrumb pageName="Products"/>
      <div className="max-w-[1320px] mx-auto grid gird-cols-[20%_auto] gap-5 ">
        <Productfilter/>
        <Productlist/>
    </div>
    </div>
  );
}
