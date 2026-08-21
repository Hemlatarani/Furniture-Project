import React from 'react'

export default function HomeNews() {
  return (
    <>
      <section>
        <div className='max-w-[1270px] mx-auto'>
          <div className='my-5'>
            <h1 className='font-bold text-3xl text-center mx-5'>Our Newsletter</h1>
            <p className='text-center py-3 mx-5'>Get E-mail updates about our latest shop and special offers.</p>
          </div>
          <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row justify-center items-center w-full sm:w-[60%] mb-15 gap-2'>
              <input className='border border-gray-300 w-full p-[10px_25px]' type="text" placeholder="Email address" required />
              <button className='bg-yellow-700 p-[10px_35px] text-white rounded-lg whitespace-nowrap'>Subscribe</button>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
