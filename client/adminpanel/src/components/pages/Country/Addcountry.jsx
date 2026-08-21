import { meta } from '@eslint/js'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function Addcountry() {

    let { id } = useParams();
    let navigate = useNavigate()

    let [formvalue, setformvalue] = useState({
        countryName: "",
        countryOrder: ""

    })
    let apibaseurl = import.meta.env.VITE_APIBASEURL
    // console.log(apibaseurl)

    let getValueSetvalue = (e) => {
        let obj = { ...formvalue }
        let inputName = e.target.name
        let inputvalue = e.target.value
        obj[inputName] = inputvalue
        setformvalue(obj)
    }

    let countrySave = ((e) => {
        e.preventDefault()

        if (id) {

            axios.put(`${apibaseurl}/country/update/${id}`, formvalue)
                .then((res) => res.data)
                .then((finalRes) => {


                    if (finalRes.status == 1) {
                        toast.success(finalRes.msg)

                        setformvalue({
                            countryName: "",
                            countryOrder: ""

                        })
                        setTimeout(() => {
                            navigate("/Country/viewcountry")
                        }, 2000);
                    }
                    else {
                        toast.error(finalRes.errorMessage)
                    }
                })
            console.log(formvalue)

        }
        else {
            axios.post(`${apibaseurl}/country/create`, formvalue)
                .then((res) => res.data)
                .then((finalRes) => {


                    if (finalRes.status == 1) {
                        toast.success(finalRes.msg)

                        setformvalue({
                            countryName: "",
                            countryOrder: ""

                        })
                        setTimeout(() => {
                            navigate("/Country/viewcountry")
                        }, 2000);
                    }
                    else {
                        toast.error(finalRes.errorMessage)
                    }
                })
            // console.log(formvalue)

        }
    });



    useEffect(() => {
        setformvalue({
            countryName: "",
            countryOrder: ""

        })
        if (id) {
            axios.get(`${apibaseurl}/country/edit-country/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log(finalRes)
                    setformvalue({
                        countryName: finalRes.countryData.countryName,
                        countryOrder: finalRes.countryData.countryOrder,


                    })
                })
        }

    }, [id])

    let funObj = id ? "Edit" : "View";

    return (

        <section>
            <form onSubmit={countrySave} >
                <ToastContainer />
                <div className='m-[20px_100px] border-1 rounded-md '>
                    <div className=' border-b rounded-md bg-red-100 text-2xl'>

                        <h1 className='mx-5 py-3 font-bold'>Add Country</h1>
                    </div>
                    <div className='mt-3'>

                        <label className='mx-5 pt-3 font-bold '>Category Name</label>
                        <input
                            value={formvalue.countryName}
                            onChange={getValueSetvalue}


                            // onChange={(e)=>{
                            //     let obj={...formvalue}
                            //  obj['countryName']=e.target.name
                            //  setformvalue(obj)

                            // }} 

                            name='countryName' type="text" placeholder='Conuntry name'
                            style={{ display: 'block', margin: '5px 20px', padding: '10px 0px' }}
                            className='border-1 w-[95%] rounded-md' />
                        <label className='mb-2 mx-5 pt-3 font-bold'>Order</label>
                        <input value={formvalue.countryOrder} onChange={getValueSetvalue}

                            // onChange={(e)=>{
                            //     let obj={...formvalue}
                            //     obj['countryOrder']=e.target.value
                            //     setformvalue(obj)
                            // }}

                            type="number" name='countryOrder' placeholder='order' style={{ display: 'block', margin: '5px 20px', padding: '10px 0px' }}
                            className='border-1 w-[95%] rounded-md' />

                        <button className='bg-purple-600 p-[8px_20px] m-4 text-white rounded-md'>
                            {id ?
                                "Edit Country" : "Add Country"}</button>
                    </div>



                </div>
            </form>
        </section>

    )
}
