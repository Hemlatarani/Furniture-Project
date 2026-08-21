"use client"
import { homeFeaturedProduct } from '@/app/api-service/homeservice'
import ProductCart from '@/app/common/ProductCart'



import React, { useState } from 'react'

export default function HomeProduct({categoryData, showProduct }) {

  // console.log("showProduct:", showProduct);
  // console.log("productCollection:", showProduct?.productCollection);

  let [getProduct, setGetProduct] = useState(showProduct?.productCollection || showProduct?.productid || [])
  let [imagePath, setImagePath] = useState(showProduct?.staticPath || '')
  let [categoryDataget, setcategoryDataget] = useState(categoryData)
  // console.log("getProduct:", getProduct)
  // console.log("imagePath:", imagePath)
  // let {productData,setproductData}=useState(productData)
  
  const handleCatgory = async (category) => {

    // console.log("Fetching category:", category);
    
    let data = await homeFeaturedProduct(category);

    // console.log("Received data:", data);

    if(data && data.productid) {
      setGetProduct(data.productid);
      setImagePath(data.staticPath);
    } 
  }
  
  
  return (
    
    <div className='m-[20px_40px]'>
      <div className='flex justify-center gap-10'>
        {
          categoryDataget.map((Obj, index) => {
            // console.log(Obj)
            return (
              <button
              onClick={() => handleCatgory(Obj._id)}
              key={Obj._id}
              className='bg-premium-500 text-2xl border px-3 py-2 text-[#c09578] gap-2 hover:bg-[#c09578] hover:text-white'>{Obj.categoryName}</button>
            )
          })

        }

        {/* <button 
        onClick={()=>handleCatgory("furniture")}
        className='bg-premium-500 text-2xl border px-3 py-2 text-[#c09578] gap-2 hover:bg-[#c09578] hover:text-white'>Featured</button>
        <button 
        onClick={()=>handleCatgory("laptops")}
        className='bg-premium-500 text-2xl border px-3 py-2 text-[#c09578] gap-2 hover:bg-[#c09578] hover:text-white'>New Arrivels</button>
        <button 
        onClick={()=>handleCatgory("smartphones")}
        className='bg-premium-500 text-2xl border px-3 py-2 text-[#c09578] gap-2 hover:bg-[#c09578] hover:text-white'>Onsale</button> */}
      </div>
      <div className='max-w-[1320px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 my-5 gap-5 px-3'>
        {
          getProduct && getProduct.length > 0 ? (
            getProduct.map((data, index) => (
              <ProductCart key={index} data={data} imagePath={imagePath} />
            ))
          ) : (
            <p className='col-span-4 text-center py-10'>No products available</p>
          )
        }
      </div>
    </div>
  )
}
