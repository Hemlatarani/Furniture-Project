"use client"
import React, { useEffect, useRef, useState } from 'react'
import Slider from "react-slick"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { store } from '@/app/redux/store/store';

import { FaRegHeart } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeSeles({ productSels }) {
  const sliderRef = useRef(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  let [productData, setproductData] = useState([])
  let [imagePath, setImagePath] = useState("")

let router=useRouter()
let token = useSelector((store) => store.user.token)
let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL

  let getProduct = () => {
    axios.get(`${apiBaseurl}home/best-selling`)
      .then((res) => res.data)
      .then((finalres) => {
        // console.log(finalres.Sellingproduct)
        // console.log(finalres.staticPath)
        setproductData(finalres.Sellingproduct|| [])
        setImagePath(finalres.staticPath)
      })
  }
  let addToCart = () => {
    if (token) {

    }
    else {
      alert("please login first")
      router.push("/login")
    }
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (

    <section className='py-10'>
      <div className="w-full flex justify-center mb-8">
        <h2 className="text-3xl font-bold text-gray-600">Best Selling Products</h2>
      </div>

      <div className='max-w-[1400px] mx-auto relative px-12'>
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-3 rounded-full hover:bg-gray-400'
        >
          <IoIosArrowBack className='text-2xl' />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {productData.map((Obj, index) => {
            return (
              <div className='px-2' key={index}>
                <Link href={`/Product-us/${Obj.slug}`}>
                <div className='shadow-2xl h-full'>
                  <img src={imagePath+ Obj.productImage} alt="" className='w-full h-48 object-cover' />
                  <h2 className='text-center p-2  m-1'>{Obj.productName}</h2>
                  <p className='font-bold text-center py-3 border-b border-gray-400'>{Obj.title}</p>
                  <div className='flex justify-center gap-5 py-3'>
                    <div className='flex justify-center gap-5 py-3'>
                      <p className='line-through'>Rs.{Obj.actulPrice}</p>
                      <span className='text-[#c09578]'>Rs. {Obj.salePrice}</span>
                    </div>
                  </div>
                </div>
                </Link>
                  <div className='flex justify-center gap-3 pb-2'>
                    <button><FaRegHeart  className='text-5xl border  p-2 cursor-pointer'/></button>
                    <button onClick={addToCart} className='border border-black bg-gray-300 px-4 py-2 cursor-pointer'>Add To Cart</button>
                  </div>
              </div>
            )
          })}
          {/* {productSels.map((item, index) => {
            return (
              <div key={index} className='px-2'>
                <div className='shadow-2xl h-full'>
                  <img src={item.thumbnail} alt={item.title} className='w-full h-48 object-cover' />
                  <h2 className='text-center py-2 text-gray-400'>{item.category}</h2>
                  <p className='font-bold text-center py-3 border-b border-gray-400'>{item.title}</p>
                  <div className='flex justify-center gap-5 py-3'>
                    <p className='line-through'>Rs.{Math.round(item.price * 1.2)}</p>
                    <span className='text-[#c09578]'>Rs. {item.price}</span>
                  </div>
                  <div className='flex justify-center gap-2 pb-3'>
                    <button className='border border-black bg-gray-300 px-4 py-2'>Add To Cart</button>
                  </div>
                </div>
              </div>
            )
          })} */}
        </Slider>

        <button
          onClick={() => sliderRef.current?.slickNext()}
          className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-300 p-3 rounded-full hover:bg-gray-400'
        >
          <IoIosArrowForward className='text-2xl' />
        </button>
      </div>
    </section>

  )
}

