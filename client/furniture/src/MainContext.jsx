"use client"
import React, { createContext, useEffect, useState } from 'react'

export let cartContext = createContext()

export default function MainContext({ children }) {

    let [cart, setCart] = useState([])

    

    useEffect(()=>{
        let saveCart = localStorage.getItem("CART")
        if(saveCart){
            setCart(JSON.parse(saveCart))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("CART",JSON.stringify(cart))
    },[cart])

   let obj = {
        cart,
        setCart
    }

    return (
        <cartContext.Provider value={obj}>
            {children}
         </cartContext.Provider>
    )
}