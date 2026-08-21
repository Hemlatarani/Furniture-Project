"use client"
import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaHeart } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { counterIncrement } from "../redux/slice/counterslice";
import { logoutData } from "../redux/slice/userslice";
import { fetchCartData } from "../redux/slice/cartslice";
import axios from "axios";

export default function Header() {

  let cart = useSelector((mystore) => mystore.myCart.cart)

  let counter = useSelector((myStore) => myStore.myCounter.count)
  let loginuser = useSelector((myStore) => myStore.user.user)

  let [showoutput, setshowoutput] = useState("")
  let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
  let [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  let [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  let dispatch = useDispatch();
  let router = useRouter();

  let logoutuser = () => {
    dispatch(logoutData())
    router.push('/login')
  }

  let showheader = (e) => {
    axios.get(`${apiBaseurl}company-profile/details`)
      .then((res) => res.data)
      .then((finalres) => {
        // console.log(finalres);
        setshowoutput(finalres.data)
      })
      .catch((err) => {
        console.log("API ERROR:", err)
      })

  }
  useEffect(() => {
    showheader()
  }, [])

  let token = useSelector((myStore) => myStore.user.token)

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData(token))
    }
  }, [token])

  // console.log(cart)
  return (
    <header>
      <div className="max-w-[1270px] mx-auto">

        {/* Top Bar */}
        <div className='hidden md:flex justify-between py-2 border border-gray-200 mt-3'>
          <div className='mx-5'>Contact us 24/7 :{showoutput.Mobilenumber} {showoutput.Email}
            {counter}
            <button onClick={() => dispatch(counterIncrement())} className="border bg-purple-400 p-2 mx-2">Add counter</button>
          </div>
          <div>
            {
              !mounted ? null : loginuser ?
                <>
                  {loginuser.userName}
                  <button onClick={logoutuser} type="button" className="border m-2 px-2 py-1 rounded-lg bg-red-500 hover:text-white">Logout</button>
                </>
                :
                <div className='mx-5'>
                  <Link href="/login"> Login /</Link>
                  <Link href="/Register-us"> Register</Link>
                </div>
            }
          </div>
        </div>

        {/* Logo + Search + Icons */}
        <section>
          <div className="flex justify-between items-center border border-gray-200 py-2 px-3">
            <div className="mx-2">
              <img src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" className="w-32 h-8 md:w-50 md:h-10" alt="" />
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="relative flex mr-5 py-2">
                <input type="text" placeholder='search product' className="pb-4 border border-gray-200 rounded-lg" />
                <button className="border">
                  <CiSearch className="text-4xl py-2 absolute left-[80%] bottom-[20%] cursor-pointer" />
                </button>
              </div>
              <div className="flex mr-5 py-2">
                <Link href={"/wishlist"}>
                  <button className="mx-2 text-2xl rounded-lg py-1 px-2 bg-white">
                    <FaHeart className="border border-gray-200 text-4xl py-1 rounded-lg" /></button>
                </Link>
                <Link href="/Cart">
                  <div className="flex mx-2 justify-center rounded-lg py-2 border border-gray-200">
                    <MdShoppingCart className="text-2xl mx-2 cursor-pointer" />
                    {cart.length}
                  </div>
                </Link>
                <div className="flex mx-2 justify-center rounded-lg py-2 border border-gray-200">
                  <h1 className="mx-2">| Rs. 0.00</h1> <IoIosArrowDown className="mx-2 text-2xl" />
                </div>
              </div>
            </div>

            {/* Mobile: icons + hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <Link href="/Cart">
                <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1">
                  <MdShoppingCart className="text-xl" />
                  <span className="text-sm ml-1">{cart.length}</span>
                </div>
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl p-1">
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </section>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border border-gray-200 px-4 py-3 flex flex-col gap-3 z-50">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold">HOME</Link>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold">LIVING</Link>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-bold">SOFA</Link>
            <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="font-bold">CONTACT US</Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="font-bold">WISHLIST</Link>
            {!mounted ? null : loginuser ? (
              <>
                <span>{loginuser.userName}</span>
                <button onClick={() => { logoutuser(); setMobileMenuOpen(false) }} className="border px-2 py-1 rounded-lg bg-red-500 text-white w-fit">Logout</button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link href="/Register-us" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}

        {/* Desktop Nav */}
        <section>
          <div className="hidden md:block my-4">
            <ul className="flex justify-center gap-20 font-bold">
              <Link href="/" className="hover:text-red-500 transition"><li>HOME</li></Link>
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <Link href="/" className="hover:text-red-500 transition">LIVING</Link>
                  <IoIosArrowDown className="mt-1" />
                </div>
                <div className="absolute left-0 top-full mt-3 bg-white shadow-lg border border-gray-200 rounded-lg w-[650px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-in z-50 p-6">
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">Tables</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-red-500"><Link href="/living/side-end-tables">Side And End Tables</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/nest-tables">Nest Of Tables</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/coffee-table-sets">Coffee Table Sets</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/coffee-tables">Coffee Tables</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">Living Storage</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-red-500"><Link href="/living/prayer-units">Prayer Units</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/display-unit">Display Unit</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/shoe-racks">Shoe Racks</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/chest-drawers">Chest Of Drawers</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/cabinets-sideboard">Cabinets & Sideboard</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/bookshelves">Bookshelves</Link></li>
                        <li className="hover:text-red-500"><Link href="/living/tv-units">TV Units</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">Mirror</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className=""><Link href="/living/wooden-mirrors">Wooden Mirrors</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <Link href="/" className="hover:text-red-500 transition">SOFA</Link>
                  <IoIosArrowDown className="mt-1" />
                </div>
                <div className="absolute left-0 top-full mt-3 bg-red-100 shadow-lg border border-gray-200 rounded-lg w-[650px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-in z-50 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">SOFA CUM BED</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">wooden sofa cum bed</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">SOFA SETES</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">LShape Sofa</Link></li>
                        <li className="hover:text-[#C09578]"><Link href="/living/nest-tables">1 Seater Sofa</Link></li>
                        <li className="hover:text-[#C09578]"><Link href="/living/coffee-table-sets">2 Seater Sofa</Link></li>
                        <li className="hover:text-[#C09578]"><Link href="/living/coffee-tables">3 Seater Sofa</Link></li>
                        <li className="hover:text-[#C09578]"><Link href="/living/coffee-tables">wooden Sofa Sets</Link></li>
                        <li className="hover:text-[#C09578]"><Link href="/living/coffee-tables">Normal</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800 mb-3 uppercase">SWING JHULA</h2>
                      <ul className="space-y-2 text-gray-600">
                        <li className=""><Link href="/living/wooden-mirrors">Wooden Jhula</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className="relative group cursor-pointer">
                <div className="flex items-center gap-1">
                  <Link href="/" className="hover:text-red-500 transition">PAGES</Link>
                  <IoIosArrowDown className="mt-1" />
                </div>
                <div className="absolute left-0 top-full mt-3 bg-red-100 shadow-lg border border-gray-200 rounded-lg w-[200px] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-in z-50 p-6">
                  <div className="text-center">
                    <ul className="space-y-2 text-gray-600">
                      <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">About</Link></li>
                      <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">Cart</Link></li>
                      <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">Checkout</Link></li>
                      <li className="hover:text-[#C09578]"><Link href="/living/side-end-tables">Frequently Questions</Link></li>
                    </ul>
                  </div>
                </div>
              </li>
              <Link href={"/contact-us"}>
                <li className="text-1xl">CONTACT US</li>
              </Link>
            </ul>
          </div>
        </section>
      </div>
    </header>
  )
}
