'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartData } from '@/app/redux/slice/cartslice'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

export default function MyCart() {
    let token = useSelector((store) => store.user.token)
    let { cart } = useSelector((store) => store.myCart)
    let dispatch = useDispatch()
    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL

    useEffect(() => {
        if (token) dispatch(fetchCartData(token))
    }, [token])

    let deleteFromCart = (cartid) => {
        if (confirm('Remove this item?')) {
            axios.post(`${apiBaseurl}cart/remove-cart`, { cartId: cartid }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(() => dispatch(fetchCartData(token)))
        }
    }

    if (cart.length === 0) {
        return (
            <div className='text-center py-10'>
                <img src="https://wscubetech.co/Assignments/furniture/public/frontend/img/icon/wishlist-Empty.jpg" alt="empty cart" className='mx-auto w-[200px]' />
                <p className='mt-3 text-gray-500'>Your cart is empty!</p>
            </div>
        )
    }

    return (
        <div>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>My Cart</h3>
            <table className='w-full border-collapse'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border border-gray-300 px-3 py-2'>Delete</th>
                        <th className='border border-gray-300 px-3 py-2'>Image</th>
                        <th className='border border-gray-300 px-3 py-2'>Product</th>
                        <th className='border border-gray-300 px-3 py-2'>Price</th>
                        <th className='border border-gray-300 px-3 py-2'>Qty</th>
                        <th className='border border-gray-300 px-3 py-2'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td className='border border-gray-300 px-3 py-2 text-center'>
                                <MdDelete className='text-red-600 text-2xl cursor-pointer mx-auto' onClick={() => deleteFromCart(item._id)} />
                            </td>
                            <td className='border border-gray-300 px-3 py-2'>
                                <img src={item.productImage} alt={item.prodcutTitle} className='w-[60px] mx-auto' />
                            </td>
                            <td className='border border-gray-300 px-3 py-2'>{item.prodcutTitle}</td>
                            <td className='border border-gray-300 px-3 py-2'>Rs. {item.prodcutPrice}</td>
                            <td className='border border-gray-300 px-3 py-2 text-center'>{item.prodcutQty}</td>
                            <td className='border border-gray-300 px-3 py-2'>Rs. {item.prodcutPrice * item.prodcutQty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
