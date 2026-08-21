"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {

    let apiBaseUrl =process.env.NEXT_PUBLIC_APIBASEURL

    let [form, setForm] = useState(true)
    let [otpForm, setOtpForm] = useState(false)
    let [btnLoading, setBtnLoading] = useState(false)
    let [showPopup, setShowPopup] = useState(false)
    let [showThankYou, setShowThankYou] = useState(false)

    let [regFormData, setRegFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        otp: ""
    })

    let getValOrSetVal = (e) => {
        setRegFormData({ ...regFormData, [e.target.name]: e.target.value })
    }

    // ===== SEND OTP =====
    let saveRegistartion = (e) => {
        e.preventDefault()
        setBtnLoading(true)
        // console.log('url',`${apiBaseUrl}web/user/send-otp`)
      axios.post(`${apiBaseUrl}user/send-otp`, regFormData)
            .then(res => res.data)
            .then(finalres => {
                setBtnLoading(false)

                if (finalres.status === 1) {
                    setShowPopup(true)
                } 
                
                // else {
                //     toast.error("OTP send failed")
                // }
            })
            .catch((error) => {
                console.log(error)
                setBtnLoading(false)
                toast.error("Server error")
            })
    }

    // ===== VERIFY OTP =====
    let userCreste = (e) => {
        e.preventDefault()

        axios.post(`${apiBaseUrl}user/create`, regFormData)
            .then(res => res.data)
            .then(finalData => {

                if (finalData.status === 1) {
                    toast.success("OTP verified ✅")
                    setOtpForm(false)
                    setShowThankYou(true)
                } else {
                    toast.error(finalData.msg || "Wrong OTP")
                }
            })
            .catch(() => {
                toast.error("Server error")
            })
    }

    return (
        <>
            <ToastContainer />

            {/* OTP POPUP */}
            {
                showPopup &&
                <PasswordPopup
                    onContinue={() => {
                        setShowPopup(false)
                        setForm(false)
                        setOtpForm(true)
                    }}
                />
            }

            {/* THANK YOU POPUP */}
            {
                showThankYou &&
                <ThankYouPopup />
            }

            <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center min-h-screen'>
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">

                    <h2 className="text-xl md:text-2xl font-bold text-center mb-6">Sign Up</h2>

                    <center>
                        <img className='w-[200px] py-2'
                            src="https://wscubetech.co/Assignments/furniture/storage/app/public/uploads/images/company-profile/logo/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png"
                            alt=""
                        />
                    </center>

                    {
                        form &&
                        <form onSubmit={saveRegistartion}>
                            <input name="userName" onChange={getValOrSetVal}
                                placeholder="Name" className="w-full mb-4 p-3 border rounded-lg" required />

                            <input name="userEmail" onChange={getValOrSetVal}
                                type="email" placeholder="Email"
                                className="w-full mb-4 p-3 border rounded-lg" required />

                            <input name="userPhone" onChange={getValOrSetVal}
                                type="number" placeholder="Phone"
                                className="w-full mb-4 p-3 border rounded-lg" required />

                            <input name="userPassword" onChange={getValOrSetVal}
                                type="password" placeholder="Password"
                                className="w-full mb-6 p-3 border rounded-lg" required />

                            <button className="w-full bg-purple-600 text-white py-3 rounded-lg">
                                {btnLoading ? "Please wait..." : "Sign Up"}
                            </button>

                            <div className='my-3 flex gap-2 justify-center'>
                                <FaGoogle />
                                <FaFacebook />
                                <FaGithub />
                            </div>

                            <p className="text-center mt-4">
                                Already have account?
                                <Link href="/login" className="text-purple-600"> Log In</Link>
                            </p>
                        </form>
                    }

                    {
                        otpForm &&
                        <form onSubmit={userCreste}>
                            <input name="otp" onChange={getValOrSetVal}
                                placeholder="Enter OTP"
                                className="w-full mb-4 p-3 border rounded-lg" required />

                            <button className="w-full bg-green-600 text-white py-3 rounded-lg">
                                Verify OTP
                            </button>
                        </form>
                    }

                </div>
            </div>
        </>
    )
}

/* OTP POPUP */
function PasswordPopup({ onContinue }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-[340px] p-6 rounded-xl text-center shadow-lg">
                <div className="text-4xl mb-3">⚠️</div>
                <h3 className="text-lg font-semibold mb-2">Change your password</h3>
                <p className="text-sm text-gray-600 mb-4">
                    The password you just used was found in a data breach.
                </p>
                <button onClick={onContinue}
                    className="bg-green-600 text-white px-6 py-2 rounded-md">
                    OK
                </button>
            </div>
        </div>
    )
}

/* THANK YOU POPUP */
function ThankYouPopup() {

    React.useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = "/login";
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-[340px] p-6 rounded-xl text-center shadow-lg">
                <div className="text-5xl mb-3">🎉</div>

                <h3 className="text-lg font-semibold mb-2">
                    Registration Successful!
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                    Redirecting to login...
                </p>

                <button
                    onClick={() => window.location.href = "/Login-us"}
                    className="bg-purple-600 text-white px-6 py-2 rounded-md"
                >
                    Go to Login
                </button>
            </div>
        </div>
    )
}