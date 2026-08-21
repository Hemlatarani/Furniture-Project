"use client"
import React from 'react'
import Breadcrumb from '../../common/Breadcrumb'
import CartContent from './Cartlist'


export default function CartUs() {
    let pageName="Shopping Cart"
  return (
   <>
   <Breadcrumb pageName={pageName}/>
   <CartContent/>
   
  

   </>
  )
}
