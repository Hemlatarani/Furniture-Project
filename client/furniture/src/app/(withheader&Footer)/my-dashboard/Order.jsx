"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


export default function Order() {
    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL

    let [orderData, setOrderData] = useState([])
    let router=useRouter()
    let token = useSelector((store) => store.user.token)
    let getOrderData = () => {

        // console.log(token)


        axios.get(`${apiBaseurl}order/get-orderDetails`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                // console.log(finalData.orderData);
                setOrderData(finalData.orderData)
                
            })
    }
    useEffect(() => {
        getOrderData()
    }, [])

    return (
        <div>
            <h1 className='font-bold text-[20px]'>Order</h1>

            <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                <thead className='bg-black text-white text-xl'>
                    <tr>
                        <th className='border border-gray-400 px-4 py-2'>Order</th>
                        <th className='border border-gray-400 px-4 py-2'>Date</th>
                        <th className='border border-gray-400 px-4 py-2'>Status</th>
                        <th className='border border-gray-400 px-4 py-2'>Total</th>
                        <th className='border border-gray-400 px-4 py-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderData.map((item, index) => {
                            return (
                                <tr>
                                    <td className='border border-gray-400 px-4 py-2'>{index + 1}</td>
                                    <td className='border border-gray-400 px-4 py-2'>May 10, 2025</td>
                                    <td className='border border-gray-400 px-4 py-2'>{item.orderStatus}</td>
                                    <td className='border border-gray-400 px-4 py-2'>Rs.{item.orderAmount}</td>
                                    <td className='border border-gray-400 px-4 py-2'>

                                        <button onClick={() => router.push(`/order-details/${item._id}`)}
                                            className='bg-blue-900 p-3 rounded text-white cursor-pointer'>
                                            <FaArrowUpRightFromSquare />

                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}