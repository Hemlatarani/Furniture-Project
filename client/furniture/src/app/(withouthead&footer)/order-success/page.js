"use client"
import Link from 'next/link'
import React from 'react'
import { FaCheckCircle, FaHome, FaShoppingBag, FaTruck, FaBox } from 'react-icons/fa'

export default function OrderSuccess() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background decorative circles */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-green-200 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-teal-200 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-emerald-300 rounded-full opacity-20 blur-xl"></div>

            <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center relative z-10">

                {/* Top badge */}
                <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
                    Payment Successful
                </div>

                {/* Icon */}
                <div className="relative mx-auto w-28 h-28 mb-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaCheckCircle className="text-white text-5xl" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full"></span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Thank You! 🎉</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Your order has been placed successfully.<br />
                    We&apos;ll deliver it to you soon!
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="h-px w-16 bg-gray-200"></div>
                    {/* <span className="text-gray-400 text-xs">What's next?</span> */}
                    <span className="text-gray-400 text-xs">What&apos;s next?</span>
                    <div className="h-px w-16 bg-gray-200"></div>
                </div>

                {/* Steps */}
                <div className="flex justify-around mb-8 text-center">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FaBox className="text-green-500 text-sm" />
                        </div>
                        <span className="text-xs text-gray-500">Order<br />Confirmed</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-px bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaTruck className="text-blue-500 text-sm" />
                        </div>
                        <span className="text-xs text-gray-500">Out for<br />Delivery</span>
                    </div>
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-px bg-gray-300"></div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaHome className="text-purple-500 text-sm" />
                        </div>
                        <span className="text-xs text-gray-500">Delivered<br />to You</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <Link href="/my-dashboard" className="block w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg">
                        <div className="flex items-center justify-center space-x-2">
                            <FaBox className="text-sm" />
                            <span>Track My Order</span>
                        </div>
                    </Link>
                    <Link href="/" className="block w-full border-2 border-gray-200 text-gray-600 py-3 px-6 rounded-xl font-semibold hover:border-teal-400 hover:text-teal-500 transition-all duration-300">
                        <div className="flex items-center justify-center space-x-2">
                            <FaShoppingBag className="text-sm" />
                            <span>Continue Shopping</span>
                        </div>
                    </Link>
                </div>

                <p className="text-xs text-gray-400 mt-6">Order confirmation has been sent to your email 📧</p>
            </div>
        </div>
    )
}
