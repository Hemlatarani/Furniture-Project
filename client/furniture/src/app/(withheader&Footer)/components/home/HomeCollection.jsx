import React from 'react'

export default function HomeCollection() {
  return (
    <section className='border-b border-gray-200 py-5'>
      <div className='max-w-[1270px] mx-auto'>

        <div className='grid lg:grid-cols-3 md:grid-cols-1 pt-5 gap-5 mx-5'>

          {/* CARD 1 */}
          <div className='overflow-hidden relative'>
            <img
              className='w-full h-[300px] object-cover hover:scale-125 transition duration-300 cursor-pointer'
              src="https://ouchcart.com/cdn/shop/products/e.jpg?v=1721366810&width=400"
              alt=""
            />
            <div className='absolute bottom-5 left-5 text-black'>
              <h5>Design Creative</h5>
              <h1 className='font-bold text-2xl'>Chair Collection</h1>
            </div>
          </div>

          {/* CARD 2 */}
          <div className='overflow-hidden relative'>
            <img
              className='w-full h-[300px] object-cover hover:scale-125 transition duration-300 cursor-pointer'
              src="https://i.ytimg.com/vi/K6UtUT1LJuE/maxresdefault.jpg"
              alt=""
            />
            <div className='absolute bottom-0 left-0 text-xl text-black bg-white'>
              <h5>BestSelling Product</h5>
              <h1 className='font-bold text-3xl'>Chair Collection</h1>
            </div>
          </div>

          {/* CARD 3 */}
          <div className='overflow-hidden relative'>
            <img
              className='w-full h-[300px] object-cover hover:scale-125 transition duration-300 cursor-pointer'
              src="https://woodentwist.com/cdn/shop/products/91pjix_sL5L._SL1500.jpg?v=1743258594"
              alt=""
            />
            <div className='absolute bottom-5 left-5 text-white'>
              <h5>Onsale Product</h5>
              <h1 className='font-bold text-2xl'>Chair Collection</h1>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}