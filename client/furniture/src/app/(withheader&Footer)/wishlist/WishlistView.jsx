'use client'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { removeWishlist, addWishlist } from '@/app/redux/slice/wishlistslice'
import axios from 'axios'
import { fetchCartData } from '@/app/redux/slice/cartslice'
import { FaHeart } from 'react-icons/fa'

export default function Wishlist() {
    let wishlist = useSelector((store) => store.mywishlist.items)
    let cart = useSelector((store) => store.myCart.cart)
    let token = useSelector((store) => store.user.token)
    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    let dispatch = useDispatch()

    let addToCart = (item) => {
        if (!token) return alert("Kindly Login First..!")
        let cartObj = {
            pid: item._id,
            category: item.parentCategory._id,
            title: item.productName,
            img: item.productImage,
            qty: 1,
            price: item.salePrice
        }
        axios.post(`${apiBaseurl}cart/add-to-cart`, cartObj, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((apiRes) => apiRes.data)
            .then(() => dispatch(fetchCartData(token)))
    }

    return (
        <div>
            <div className='max-w-[1320px] mx-auto px-3'>
                {
                    wishlist.length === 0 ?
                        <div className='mb-3'>
                            <figure>
                                <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg" alt="" className='mx-auto' />
                            </figure>
                            <p className='text-center'>Your wishlist is empty!</p>
                        </div>
                        :
                        <div className='overflow-x-auto'>
                            <table className='w-full min-w-[600px]'>
                                <thead>
                                    <tr className='py-2 bg-[#ccc] w-full text-center'>
                                        <th className='py-2'>Delete</th>
                                        <th className='py-2'>Image</th>
                                        <th className='py-2'>Product</th>
                                        <th className='py-2'>Price</th>
                                        <th className='py-2'>Stock Status</th>
                                        <th className='py-2'>Add To Cart</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishlist.map((item, index) => {
                                            console.log(item.productImage)
                                            // check karo item cart mein hai ya nahi
                                            let inCart = cart.find((cartItem) => cartItem.productNameId == item._id)
                                            let liked = wishlist.find((wishItem) => wishItem._id === item._id)
  return (
            <tr key={index} className='border w-full'>
        <td className='border text-[50px] text-center cursor-pointer' 
        onClick={() => dispatch(removeWishlist(item._id))}>&times;</td>
            <td className='border'>
            <Link href={`/product/${item._id}`}>
            <img src={`${apiBaseurl}${item.productImage}`} alt={item.productName} className='w-[100px] h-full mx-auto' />
                                                        </Link>
                                                    </td>
                                                    <td className='border text-center'>
                                                        <Link href={`/product/${item._id}`}>{item.productName}</Link>
                                                    </td>
                                                    <td className='border text-center'>Rs. {item.salePrice}</td>
                                                    <td className='border text-center'>In Stock</td>
                                                    <td className='text-center flex items-center justify-center gap-2 py-4'>
                                                        {/* wishlist heart icon — liked ho toh red, nahi toh grey */}
                                                        <FaHeart
                                                            onClick={() => liked ? dispatch(removeWishlist(item._id)) : dispatch(addWishlist(item))}
                                                            className={`cursor-pointer text-xl ${liked ? 'text-red-600' : 'text-gray-400'}`}
                                                        />
                                                        {/* cart mein hai toh "Added" dikhao, nahi toh button */}
                                                        {inCart
                                                            ? <span className='border border-[#c09578] p-[5px_15px] bg-green-500 text-white'>Added</span>
                                                            : <button onClick={() => addToCart(item)} className='border border-[#c09578] p-[5px_15px] cursor-pointer bg-[#c09578] text-white'>Add to cart</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                }
            </div>
        </div>
    )
}
