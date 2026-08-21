import ProductCart from '@/app/common/ProductCart'
import React from 'react'

export default function Productlist({ product }) {

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {product?.map((data, index) => <ProductCart key={index} data={data} />
        )}
      </div>
    </>
  )
}

