import React, { useContext, useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { LoginContext } from '../../context/Maincontext'
import axios from 'axios'




export default function Layout() {
  let navigate = useNavigate();
  let { id, setid } = useContext(LoginContext)

  console.log(id)

  useEffect(() => {
    if (id == "" || id == null || id == undefined) {
      navigate("/")
    }
    else {
      verifyadmin()
    }
  }, [id])

  
  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let verifyadmin = () => {

    axios.put(`${apibaseurl}/auth/verify-admin/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status === false) {
          setid("")
          navigate("/login")
        }
      })
      .catch((error) => {
        navigate("/login")
      })
  }

  return (
    <>
      <section className="grid grid-cols-[20%_auto] min-h-screen">
        <aside className="bg-gray-200 h-full">
          <Sidebar />

        </aside>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-1">
            <Outlet />

          </main>
          <Footer />
        </div>
      </section>
    </>
  )
}