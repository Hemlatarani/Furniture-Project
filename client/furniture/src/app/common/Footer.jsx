"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { counterDecrement } from '../redux/slice/counterslice'
import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
import { useRouter } from 'next/navigation'



export default function Footer() {
    let [footerData, setfooterData] = useState({})
    let [tRated, settRated] = useState([])
    let [imagePath, setimagePath] = useState("")
    let router = useRouter()

    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL

    let handlefooter = () => {
        axios.get(`${apiBaseurl}company-profile/details`)

            .then((res) => res.data)
            .then((finalRes) => {
                // console.log("handlefooter data",finalRes)
                setfooterData(finalRes.data)
            })
            .catch((err) => {
                console.log("API ERROR:", err)
            })

    }
    useEffect(() => {
        handlefooter()
        TopProduct()
    }, [])

    let dispatch = useDispatch()
    let TopProduct = () => {
        axios.get(`${apiBaseurl}product/top-rated`)
            .then((res => res.data))
            .then((FinalRes) => {
                settRated(FinalRes.topData)
                setimagePath(FinalRes.staticPath)

            })
    }
    return (
        <>
            <footer>



                <div className="bg-gray-100 text-gray-700 py-6 px-6 my-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                        <div>
                            <button onClick={() => dispatch(counterDecrement())} className="border bg-purple-400 p-2 mx-2">Decrement counter</button>
                            <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
                            <p className="text-sm mb-2">
                                <span className="font-medium">Address:</span>{footerData.Address}</p>
                            <p className="text-sm mb-2">
                                <span className="font-medium">Phone:</span>{footerData.Mobilenumber}
                            </p>
                            <div>

                                <span className="text-sm mb-2">
                                    <p className="font-medium">Email:</p>
                                    <a href="mailto:furnitureinfo@gmail.com" className="text-blue-600 hover:underline">
                                        {footerData.Email}
                                    </a>
                                </span>
                            </div>


                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-gray-600 hover:text-blue-500 text-xl">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-pink-500 text-xl">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-700 text-xl">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-red-600 text-xl">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-telegram"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-3">Information</h2>
                            <p className="text-sm mb-2">
                                <a href='/about-us' className="font-medium pointer-cursor">About Us</a>
                            </p>
                            <p className="text-sm mb-2">
                                 <a href='/contact-us' className="font-medium pointer-cursor">Contact Us</a>
                            </p>
                            <p className="text-sm mb-2">
                                
                                <a href='/Faq-us' className="font-medium pointer-cursor">Frequently Questions</a>

                            </p>


                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-gray-600 hover:text-blue-500 text-xl">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-pink-500 text-xl">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-700 text-xl">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-red-600 text-xl">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-telegram"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-3">My Account</h2>
                            <span className="text-sm mb-2">
                                <Link href="/my-dashboard" className="font-medium cursor-pointer hober:text-[#c09578]">My dashboard</Link>
                            </span>
                            <p className="text-sm mb-2">
                                <Link href="/wishlist" className="font-medium cursor-pointer hover:underline hover:text-[#c09578]">Wishlist</Link>
                            </p>
                            <p className="text-sm mb-2">
                                <Link href="/Cart" className="font-medium cursor-pointer hover:underline hover:text-[#c09578]">Cart</Link>
                            </p>
                            <p className="text-sm mb-2">
                                <Link href="/chekout" className="font-medium cursor-pointer hover:underline hover:bg-gray">Checkout</Link>
                            </p>


                            <div className="flex space-x-4 mt-3">
                                <a href="#" className="text-gray-600 hover:text-blue-500 text-xl">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-pink-500 text-xl">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-700 text-xl">
                                    <i className="fab fa-linkedin"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-red-600 text-xl">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="text-gray-600 hover:text-blue-400 text-xl">
                                    <i className="fab fa-telegram"></i>
                                </a>
                            </div>
                        </div>

                        <div className=''>

                            {
                                tRated.map((item, index) => {
                                    return (
                                        <div>
                                            <h2 className="text-lg font-semibold mb-3">Top Rated Products</h2>

                                            <div key={item._id} className='flex border-b my-4'>

                                                <img
                                                    src={imagePath + item.productImage}
                                                    onClick={() => router.push(`/Product-us/${item.slug}`)}
                                                    className='h-[60px] w-[80px] cursor-pointer'
                                                    alt=""
                                                />

                                                <div className='mx-5'>
                                                    <p>{item.productType}</p>
                                                    <h2>{item.productName}</h2>

                                                    <div className='flex'>
                                                        <span className='line-through mr-3'>
                                                            Rs. {item.actulPrice}
                                                        </span>
                                                        <p className='text-yellow-700'>
                                                            Rs. {item.salePrice}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    )
                                })
                            }


                        </div>


                    </div>
                </div>
                <section>
                    <div className='max-w-4xl mx-auto bg-gray-200 '>
                        <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 text-center border-b border-t border-gray-200 my-10 '>
                            <div className='font-bold text-2xl py-5'>Home</div>
                            <div className='font-bold text-2xl py-5'>Online Store</div>
                            <div className='font-bold text-2xl py-5'>Privcy Policy</div>
                            <div className='font-bold text-2xl py-5'>Trems of use</div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-center'>All Rights Reserved By Furniture | © 2025</h1>
                        <div className='flex justify-center my-3'>

                            <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/papyel2.png" alt="" />
                        </div>

                    </div>
                </section>
            </footer>

        </>
    )
}
