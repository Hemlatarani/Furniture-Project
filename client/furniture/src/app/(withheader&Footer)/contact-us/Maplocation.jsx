// 
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoHomeSharp, IoCallSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

export default function MapLocation() {

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL

    let [AcompanyData,setAcompanytData]=useState({})
    let [btnLoading, setBtnLoading] = useState(false)
    let [isSubmitted, setIsSubmitted] = useState(false)   // ✅ NEW

    let [formVal, setFormVal] = useState({
        name: "",
        email: "",
        shipping_mobile_no: "",
        phone: "",   // ✅ FIXED
        subject: "",
        message: ""
    })

    // ✅ SUBMIT FUNCTION
    let saveContact = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        axios.post(`${apiBaseUrl}enquiry/save-enquiry`, formVal)   // ✅ FIXED ROUTE
            .then((apiRes) => apiRes.data)
            .then((finalData) => {
                console.log("finalRes", finalData);

                if (finalData.success) {   // ✅ FIXED
                    toast.success(finalData.message)

                    setFormVal({
                        name: "",
                        email: "",
                        shipping_mobile_no: "",
                        phone: "",
                        subject: "",
                        message: ""
                    })

                    setIsSubmitted(true)   // ✅ SUCCESS SHOW
                }

                setBtnLoading(false)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something went wrong")
                setBtnLoading(false)
            })
    }

    // INPUT HANDLE
    let getValSetVal = (e) => {
        let obj = { ...formVal }
        obj[e.target.name] = e.target.value
        setFormVal(obj)
    }

//     let getcontactData=()=>{
//         a.get(`${apiBaseUrl}company/details`)
//         .then((res)=>res.data)
//         .then((finalData)=>{
//             console.log("contactdata",finalData);
//             if(finalData.success){
// toast.success("Data add successfully")
//                 setcontactData(finalData.data)
//             }
//         })
//     }
    let getcompanyData=()=>{
        axios.get(`${apiBaseUrl}company-profile/details`)
        .then((res)=>res.data)
        .then((finalData)=>{
            if(finalData.success){
                console.log("data=>" ,finalData )
                setAcompanytData(finalData.data)
            }
        
        })
        .catch((err)=>{
            toast.error("Something went wrong",(err));

        })
        // console.log("companydata", finalData);
    }
    useEffect(() => {
getcompanyData()
    }, [])

    // let getcompanyData=()=>{
    //     axios.get(`${apiBaseUrl}company/details`)
    //     .then((res)=>res.data)
    //     .then((finalData)=>{
    //         console.log("companydata", finalData);
    //     })

    // }
    return (
        <>
            <div className='max-w-[1320px] mx-auto py-5 px-3 h-[300px] sm:h-[500px] md:h-[700px]'>
                <ToastContainer />
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d29306.380920588854!2d85.2393984!3d23.341229849999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d23.3604178!2d85.2343344!4m3!3m2!1d23.362151299999997!2d85.2242922!5e0!3m2!1sen!2sin!4v1756116974682!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className="border-2 border-gray-300"
                ></iframe>
            </div>

            <div className='max-w-[1320px] mx-auto py-5 px-3 grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                    <h1 className='font-bold text-2xl'>Contact Us</h1>
                    <hr className='border-1 border-[#eee]' />

                    <h3 className='text-[13px] py-3 flex gap-2'>
                        <IoHomeSharp className='text-[16px]' />
                        <b>{AcompanyData.Address}</b>
                    </h3>

                    <hr className='border-1 border-[#eee]' />

                    <h3 className='text-[13px] py-3 flex gap-2'>
                        <IoCallSharp className='text-[16px]' /> :
                        <b>{AcompanyData.Mobilenumber}</b>
                    </h3>

                    <hr className='border-1 border-[#eee]' />

                    <h3 className='text-[13px] py-3 flex gap-2'>
                        <MdEmail className='text-[16px]' /> :
                        <b>{AcompanyData.Email}</b>
                    </h3>
                </div>

                <div>
                    <h1 className='font-bold text-2xl mb-3'>Tell us your question</h1>

                    <form onSubmit={saveContact}>

                        <div className="mb-5">
                            <label>Your Name *</label>
                            <input type="text" name="name" value={formVal.name} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        <div className="mb-5">
                            <label>Your Email *</label>
                            <input type="text" name="email" value={formVal.email} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        <div className="mb-5">
                            <label>Shipping Mobile Number *</label>
                            <input type="text" name="shipping_mobile_no" value={formVal.shipping_mobile_no} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        <div className="mb-5">
                            <label>Your Mobile Number *</label>
                            <input type="text" name="phone" value={formVal.phone} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        <div className="mb-5">
                            <label>Subject *</label>
                            <input type="text" name="subject" value={formVal.subject} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        <div className="mb-5">
                            <label>Your Message *</label>
                            <input type="text" name="message" value={formVal.message} onChange={getValSetVal} className="w-full p-2 border" required />
                        </div>

                        {/* ✅ BUTTON LOGIC */}
                        <div className="mb-5">
                            {
                                isSubmitted ? (
                                    <div className='flex gap-2 text-green-600 font-semibold'>
                                        ✔️ Submitted Successfully
                                    </div>
                                ) : (
                                    <button className='bg-amber-500 p-2 rounded text-white cursor-pointer w-full'>
                                        <div className='flex gap-3 justify-center'>
                                            {btnLoading ? "Sending..." : "SEND"}
                                        </div>
                                    </button>
                                )
                            }
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}