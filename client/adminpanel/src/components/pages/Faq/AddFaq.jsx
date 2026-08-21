import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'


export default function AddFaq() {
    let {id}=useParams() //return as object
    let navigate = useNavigate()
    let apibaseurl = import.meta.env.VITE_APIBASEURL
    // console.log(apibaseurl)
    let [formvalue, setformvalue] = useState({
        faqName: "",
        faqCode: "",
        faqOrder: ""

    })
    let getValueSetvalue = ((e) => {
        let obj = { ...formvalue }
        let inputName = e.target.name
        let inputValue = e.target.value
        obj[inputName] = inputValue
        setformvalue(obj)
    })


    let faqSave = ((e) => {
        e.preventDefault()
        if(id){
             axios.put(`${apibaseurl}/faq/update/${id}`, formvalue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    toast.success(finalRes.msg)

                    setformvalue({
                        faqName: "",
                        faqCode: "",
                        faqOrder: ""
                    })
                    setTimeout(() => {
                        navigate("/faq/viewFaq")
                    }, 2000);
                }
                else {
                    toast.error(finalRes.errorMessage)
                }
            })


        console.log(formvalue)
        }

       else{
         axios.post(`${apibaseurl}/faq/create`, formvalue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status == 1) {
                    toast.success(finalRes.msg)

                    setformvalue({
                        faqName: "",
                        faqCode: "",
                        faqOrder: ""
                    })
                    setTimeout(() => {
                        navigate("/faq/viewFaq")
                    }, 2000);
                }
                else {
                    toast.error(finalRes.errorMessage)
                }
            })


        console.log(formvalue)
       }
    })
    useEffect(() => {
        setformvalue({
                        faqName: "",
                        faqCode: "",
                        faqOrder: ""
                    })
        if (id) {
            axios.get(`${apibaseurl}/faq/edit-faq/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes)
                    setformvalue({
                        faqName: finalRes.faqData.faqName,
                        faqCode: finalRes.faqData.faqCode,
                        faqOrder: finalRes.faqData.faqOrder,
                    })
                })
        }
    }, [])
    let funObj = id ? "Edit" : "View"
    return (

        <section>
            <form onSubmit={faqSave}>
                <ToastContainer />
                <div className=' mx-25 mt-10  rounded-md shadow-2xl px-5 pt-2'>
                    <div className='bg-sky-200 border-b rounded-md '>
                        <h1 className='mx-5 py-4 font-bold text-3xl'>Add Faqs</h1>
                    </div>
                    <div className='my-3'>
                        <label className='mx-5 font-bold font-sans hover:text-blue-200 text-2xl'>Question</label>
                        <input
                            value={formvalue.faqName}
                            onChange={getValueSetvalue}

                            type="text" name='faqName' className='w-[95%] border-1 mx-5 rounded-md' />

                        <label className='mt-3 mx-5 font-bold font-sans hover:text-blue-200 text-2xl'>Answer</label>
                        <input

                            value={formvalue.faqCode}
                            onChange={getValueSetvalue}

                            name="faqCode" id="" className='w-[95%] border-1 mx-5 rounded-md py-5 ' />

                        <label className='mx-5 font-bold font-sans hover:text-blue-200 '>Order</label>
                        <input

                            value={formvalue.faqOrder}
                            onChange={getValueSetvalue}

                            name='faqOrder' type="number" className='w-[95%] border-1 mx-5 rounded-md' />

                    </div>

                    <button className='m-5 p-[10px_20px] bg-blue-500 rounded-md text-white '>{id ?
                        "Edit" : "View"}</button>
                </div>
            </form>
            <hr className=' mx-25 mt-5' />
            <div className='flex justify-between mx-25 py-5'>
                <p>© 2025 WsCube Tech™. All Rights Reserved.</p>
                <p>Design by Hemlata</p>
            </div>
        </section>

    )
}

