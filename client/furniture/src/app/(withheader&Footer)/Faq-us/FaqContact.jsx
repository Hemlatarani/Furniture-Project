"use client"
import React, { useState } from 'react'




export default function FaqContact() {
    let FaqData = [
        {
            id: 1,
            que: "Mauris congue euismod purus at semper. Morbi et vulputatemassa?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 2,
            que: "Donec mattis finibus elit ut tristique?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 3,
            que: "Aenean elit orci, efficitur quis nisl at, accumsan?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 4,
            que: "Pellentesque habitant morbi tristique senectus et netus?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 5,
            que: "Nam pellentesque aliquam metus?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 6,
            que: "Aenean elit orci, efficitur quis nisl at?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        },
        {
            id: 7,
            que: "Morbi gravida, nisi id fringilla ultricies, elit lorem?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"

        },
        {
            id: 8,
            que: "Aenean elit orci, efficitur quis nisl at, accumsan?",
            ans: "Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem"
        }

    ]
    let [currentOpen,setCurrentOpen]=useState(0);
    return (
        <section className='shadow-3xl'>
            <div className='max-w-[1270px] mx-auto mt-5'>
                {FaqData.map((items, index) => {
                    return (
                <div className='border-1 mx-3 sm:mx-10 my-5 rounded-lg relative' key={index}>
                            <h3 onClick={() => setCurrentOpen(currentOpen === items.id ? "" : items.id)} className=' bg-gray-200 py-2 border-b cursor-pointer rounded-lg p-2'>{items.que} <span className='absolute right-16'> {currentOpen === items.id ? '-' : '+'}</span></h3>
                            <p className={`bg-gray-300 mt-2 rounded-lg p-2 ${currentOpen === items.id ? '' : 'hidden'}`}>{items.ans}</p>
                        </div>
                    )
                }
                )}


                {/* <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Donec mattis finibus elit ut tristique?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div>
                 <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Aenean elit orci, efficitur quis nisl at, accumsan?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem

</p>
                </div>
                 <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Pellentesque habitant morbi tristique senectus et netus?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div>
                 <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Nam pellentesque aliquam metus?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div>
                 <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Aenean elit orci, efficitur quis nisl at?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div> 
                <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Morbi gravida, nisi id fringilla ultricies, elit lorem?
                                   <span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div>
                 <div className='border-1 mx-10 mt-5  '>
                    <h3 className=' bg-gray-300 py-2 border-b rounded-lg p-2'>Aenean elit orci, efficitur quis nisl at, accumsan?<span className='absolute right-15'>+</span></h3>
                    <p className='bg-gray-400 mt-2 p-2  '>Donec mattis finibus elit ut tristique. Nullam tempus nunc eget arcu vulputate, eu porttitor tellus commodo. Aliquam erat volutpat. Aliquam consectetur lorem eu viverra lobortis. Morbi gravida, nisi id fringilla ultricies, elit lorem eleifend lorem</p>
                </div> */}
            </div>
        </section>
    )
}