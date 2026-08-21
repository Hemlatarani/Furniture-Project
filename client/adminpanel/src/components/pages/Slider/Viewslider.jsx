import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaFilter, FaRegSquare } from 'react-icons/fa'
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export default function Viewslider() {

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let [currentpage, setcurrentpage] = useState(1)
  let [sliderData, setsliderData] = useState([])
  let [staticpath, setstaticpath] = useState([])
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [ids, setids] = useState([])
  let [allchecked, setallchecked] = useState(false)

  let getslider = () => {
    axios.get(`${apibaseurl}/slider/view`, {
      params: {
        page: currentpage,
        limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes)
        setsliderData(finalRes.sliderCollection)
        setstaticpath(finalRes.staticPath)
        settotalpages(finalRes.totalpages)
      })

  }
  useEffect(() => {
    getslider()
  }, [currentpage, limit, ids])

  let getchecked = (e) => {
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
      let finalAns = sliderData.map((v) => v._id)
      setids(finalAns)
    }
    else {
      setids([])
    }
    setallchecked(!allchecked)
  }
  useEffect(() => {
    if (ids.length === sliderData.length && sliderData.length >= 1) {
      setallchecked(true)
      // console.log(setallchecked)
    }
    else {
      setallchecked(false)
    }
  }, [ids])
  let multidelete = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/slider/multi-delete`,
        {
          ids
        }
      )
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          getslider()
          toast.success("delete successfully")
        })
    }
    else {
      toast.error("plese select one box")
    }
  }
  let statusUpdate=()=>{
 if(ids.length>=1){
  axios.put(`${apibaseurl}/slider/status-update`,{ids})
  .then((res)=>res.data)
  .then((finalRes)=>{
    getslider()
    setids([])
    toast.success("status update successfully")
  })
 }
  else{
    toast.error("select box")
  }
  }
  return (
    <>
      <div className="p-4 bg-white rounded-xl shadow-md">
        <ToastContainer />
        <div className='bg-gray-200 py-3 border-b'>

          <div className='flex justify-between '>
            <h1 className='mx-3 justify-center font-bold text-2xl'>View Slider</h1>
            <hr />
            <div className='flex gap-2 mx-3 '>

              <button onClick={statusUpdate} className='border-1 p-[5px_15px] bg-green-500 rounded-lg text-white'> Change</button>
              <button
                onClick={multidelete} className='border-1 p-[5px_15px] bg-red-500 rounded-lg  text-white'>Delete</button>
            </div>
          </div>
        </div>
        <table className="w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3 border border-gray-300">
                <input onChange={allcheck}
                  checked={allchecked}
                  type="checkbox" />
              </th>
              <th className="p-3 border border-gray-300">Title</th>
              <th className="p-3 border border-gray-300">Image</th>
              <th className="p-3 border border-gray-300">Order</th>
              <th className="p-3 border border-gray-300">Status</th>
              <th className="p-3 border border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
          {
            sliderData.map((sliderObj, index) => {
              return (

                  <tr className="hover:bg-gray-50" key={index}>
                    <td className="p-3 border border-gray-300">
                      <input onChange={getchecked}
                        checked={ids.includes(sliderObj._id)}
                        value={sliderObj._id}

                        type="checkbox" />
                    </td>

                    <td className="p-3 border border-gray-300">{sliderObj.sliderName}</td>

                    <td className="p-3 border border-gray-300">
                      <img src={staticpath + sliderObj.sliderImage} className="w-12 h-12 rounded object-cover" alt="img" />
                    </td>

                    <td className="p-3 border border-gray-300">{sliderObj.sliderOrder}</td>

                    <td className="p-3 border border-gray-300">
                      {
                        sliderObj.sliderStatus ?
                          <button className="px-3 py-1 text-sm bg-green-500 text-white rounded"> Active</button>
                          :
                          <button className="px-3 py-1 text-sm bg-red-500 text-white rounded"> Deactive</button>

                      }

                    </td>
                    <td className="p-3 border border-gray-300">
                      <Link to={`/slider/edit/${sliderObj._id}`} >
                      <button className=" bg-blue-600 text-white rounded-full p-3 ml-3"><BiPencil className='text-white' /></button>
                      </Link>
                    </td>
                  </tr>
              )
            })
          }
          </tbody>
        </table>
        <ResponsivePagination
          current={currentpage}
          total={totalpages}
          onPageChange={setcurrentpage}
        />
      </div>
    </>
  )
}
