"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function OrderDetails({ id }) {
  let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
  let token = useSelector((store) => store.user.token)
  let router = useRouter()
  let [order, setOrder] = useState(null)

  useEffect(() => {
    axios.get(`${apiBaseurl}order/get-orderDetails`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.data)
      .then((finalData) => {
        let found = finalData.orderData.find((o) => o._id == id)
        setOrder(found)
      })
  }, [id])

  if (!order) return <p>Loading...</p>

  return (
    <>
      <section className='mx-10 mt-10 bg-blue-900 border-1 p-2 rounded-lg'>
        <button onClick={() => router.back()} className='mb-4 px-4 py-2 bg-gray-300 rounded-md border-1 bg-green-500'>← Back</button>
        <div className='border rounded-md p-6 bg-blue-100 m-3'>
          <h1 className='text-2xl font-bold mb-4 border-b pb-2 text-center '>Order Detail</h1>
          <div className='grid grid-cols-2 gap-4'>
            <div><span className='font-semibold'>Order ID:</span> <span className='text-xs break-all'>{order._id}</span></div>
            <div><span className='font-semibold'>User ID:</span> <span className='text-xs break-all'>{order.userId}</span></div>
            <div><span className='font-semibold'>Order Amount:</span> ₹{order.orderAmount}</div>
            <div><span className='font-semibold'>Order Qty:</span> {order.orderQty}</div>
            <div><span className='font-semibold'>Order Status:</span> {order.orderStatus}</div>
            <div><span className='font-semibold'>Payment Method:</span> {order.paymentMethod == 1 ? 'COD' : 'Online'}</div>
            <div><span className='font-semibold'>Payment Status:</span> {order.paymentStatus == 1 ? 'Pending' : 'Paid'}</div>
            <div><span className='font-semibold'>Date:</span> {order.createdAt}</div>
            <div className='col-span-2'><span className='font-semibold'>Shipping Address:</span> {JSON.stringify(order.shippingAddress)}</div>
          </div>
          <h2 className='font-bold mt-6 mb-2 border-b pb-1'>Order Items</h2>
          {order.orderItem && order.orderItem.length > 0 ? order.orderItem.map((item, index) => (
            <div key={index} className='border p-3 rounded mb-2 text-sm grid grid-cols-2 gap-2'>
              <div><span className='font-semibold'>Product:</span> {item.productName || item.name || '-'}</div>
              <div><span className='font-semibold'>Qty:</span> {item.qty || item.quantity || '-'}</div>
              <div><span className='font-semibold'>Price:</span> ₹{item.price || '-'}</div>
              <div><span className='font-semibold'>Product ID:</span> <span className='text-xs break-all'>{item.productId || item._id || '-'}</span></div>
            </div>
          )) : <p className='text-sm text-gray-500'>No items found</p>}
        </div>
      </section>
    </>
  )
}
