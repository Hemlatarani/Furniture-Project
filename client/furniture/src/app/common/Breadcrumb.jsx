import Link from 'next/link'
import React from 'react'

export default function Breadcrumb({ pageName }) {
  return (
    <div>
      <h1 className='font-bold text-3xl py-3 text-center '>{pageName}

      </h1>
      <h1 className='text-center'> <Link href={"/"}>Home</Link> {">"} <span className='text-[#c09578]'>{pageName}</span> </h1>
      {/* <h1><Link href={"/Contactus"}>Home</Link> {">"} <span className='text-red-500'>{pageName}</span> </h1> */}
    </div>
  )
}