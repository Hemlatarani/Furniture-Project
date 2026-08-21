"use client"

import Link from 'next/link'
import React from 'react'
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa'

export default function ThankYou() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <FaCheckCircle className="text-green-500 text-4xl animate-bounce" />
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Thank You Message */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Thank You!
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Your registration has been completed successfully. Welcome to our furniture family!
                </p>

                {/* Decorative Elements */}
                <div className="flex justify-center space-x-2 mb-8">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link href="/login" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                        <div className="flex items-center justify-center space-x-2">
                            <FaHome className="text-sm" />
                            <span>Go to Login</span>
                        </div>
                    </Link>
                    
                    <Link href="/" className="block w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-purple-500 hover:text-purple-500 transition-all duration-300">
                        <div className="flex items-center justify-center space-x-2">
                            <FaShoppingBag className="text-sm" />
                            <span>Browse Products</span>
                        </div>
                    </Link>
                </div>

                {/* Footer Message */}
                <p className="text-sm text-gray-500 mt-6">
                    Check your email for confirmation details
                </p>
            </div>
        </div>
    )
}