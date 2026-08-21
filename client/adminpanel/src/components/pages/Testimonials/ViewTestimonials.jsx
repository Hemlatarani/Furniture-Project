import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaFilter, FaRegSquare } from 'react-icons/fa'
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function ViewTestimonials() {
  let [currentpage, setcurrentpage] = useState(1)
  let [testiData, settestiData] = useState([])
  let [staticpath, setstaticpath] = useState([])
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [ids,setids]=useState([])
  let [allchecked,setallchecked]=useState(false)

  let apibaseurl = import.meta.env.VITE_APIBASEURL;



  let gettesti = () => {
    axios.get(`${apibaseurl}/testimonials/view`, {
      params: {
        page: currentpage,
        limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        settestiData(finalRes.testiCollection)
        setstaticpath(finalRes.staticPath)
        settotalpages(finalRes.totalpages)
      })
  }
   useEffect(() => {
    gettesti()
  }, [currentpage, limit])

  let getChecked = (e) => {
    // console.log(e.target.value)
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setids([...ids, e.target.value])
      }
    }
    else {
      let fillterData = ids.filter((v) => v != e.target.value)
      setids(fillterData)
    }

  }
  let allcheck = (e) => {
    if (e.target.checked) {
      let finalAns = testiData.map((v) => v._id)
      setids(finalAns)
    }
    else {
      setids([])
    }
    setallchecked(!allchecked)
  }
  useEffect(() => {
    if(ids.length=== testiData.length && testiData.length>=1){

      setallchecked(true)
    }
    else{
      setallchecked(false)
    }
  }, [ids])

  let multiDelete=()=>{
    if(ids.length>=1){
      axios.post(`${apibaseurl}/testimonials/multi-delete`,{ids})
      .then((res)=>res.data)
      .then((finalRes)=>{
        gettesti()
        toast.success("delete successfully")
        
      })

    }
    else{
      toast.error("select box")
    }
  }
  let statusUpdate=()=>{
    if(ids.length>=1){
      axios.put(`${apibaseurl}/testimonials/status-update`,{ids})
      .then((res)=>res.data)
      .then((finalRes)=>{
        gettesti()
        setids([])
        toast.success("status updated successfully")
      })
    }
    else{
      toast.error("select box to update status")
    
    }
  }
  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen">
        <ToastContainer/>
        <div className="bg-white shadow-md rounded-2xl p-5">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">
            View Testimonial
          </h2>
          <div className="mt-4 flex justify-end gap-5 py-2">
            <button onClick={statusUpdate} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"> Update Status</button>
            <button onClick={multiDelete} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"> Delete</button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700 border">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                <tr>
                  <th className="p-3 border border-gray-300">
                <input onChange={allcheck} 
                checked={allchecked}
                type="checkbox" />
              </th>
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Image</th>
                  <th className="py-3 px-4 border">Designation</th>
                  <th className="py-3 px-4 border">Rating</th>
                  <th className="py-3 px-4 border">Order</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Action</th>
                </tr>
              </thead>

<tbody>
              {Array.isArray(testiData) && testiData.length > 0 ?

                testiData.map((testiObj, index) => {
                  return (
                    
                      <tr className="text-center border-b hover:bg-gray-50" key={index} >
                      <td>   <input onChange={getChecked}
                        checked={ids.includes(testiObj._id)}
                        value={testiObj._id}
                        type="checkbox" />
                    </td>
                        <td className="py-3 px-4 border" >{testiObj.testiName}</td>
                        <td className="py-3 px-4 border">
                          <img
                            src={staticpath + testiObj.testiImage}
                            alt="User"
                            className="w-10 h-10 rounded-full mx-auto"
                          />
                        </td>
                        <td className="py-3 px-4 border">{testiObj.testiDesignation}</td>
                        <td className="py-3 px-4 border">{testiObj.testiRating}</td>
                        <td className="py-3 px-4 border">{testiObj.testiOrder}</td>
                        <td className="py-3 px-4 border">
                          {
                            testiObj.testiStatus ?
                              <button className="bg-green-500 text-white px-3 py-1 rounded-md text-xs">
                                Active
                              </button>
                              :

                              <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"> Deactive</button>
                          }
                        </td>
                        <Link to={`/testimonials/edit/${testiObj._id}`}>
                         <td class="bg-blue-500 text-white w-10 h-10 flex m-[10px_35%] items-center justify-center rounded-full text-sm">
                          <BiPencil className="text-white" />
                        </td>
                        </Link>
                       
                      </tr>
                  )
                })
                :
                <tr>
                  <td colSpan={6}></td>
                </tr>
              }
              </tbody>

            </table>
          </div>

          <ResponsivePagination
            current={currentpage}
            total={totalpages}
            onPageChange={setcurrentpage}
          />
        </div>
      </div>
    </>
  )
}

