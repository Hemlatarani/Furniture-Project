import React, { useEffect, useState } from 'react'
import { FaFilter, FaSquare } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { BiPencil } from 'react-icons/bi';
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';






export default function Viewcategory() {
  let [currentpage, setcurrentpage] = useState(1)
  let [categoryData, setcategoryData] = useState([])
  let [staticpath, setstaticpath] = useState([])
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [ids, setids] = useState([])
  let [allcheck,setallcheck]=useState(false)

  let apibaseurl = import.meta.env.VITE_APIBASEURL;


  let getcategory = () => {
    axios.get(`${apibaseurl}/category/view`, {
      params: {
        page: currentpage,
        limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log('Category Response:', finalRes)
        setcategoryData(finalRes.categoryCollection)
        setstaticpath(finalRes.staticPath)
        settotalpages(finalRes.totalpages)
      })
      .catch((err) => {
        console.error('Category fetch error:', err)
        toast.error('Failed to load categories')
      })
  }

  useEffect(() => {
    getcategory()
  }, [currentpage, limit])

  let getChecked = (e) => {
    // console.log(e.target.value)
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setids([...ids, e.target.value])
      }
    }
    else {
      let filterData = ids.filter((v) => v!= e.target.value)
      setids(filterData)
    }

  }
  let allchecked = (e) => {
    if (e.target.checked) {
      let finalAns = categoryData.map((v) => v._id)
      setids(finalAns)
    }
    else {
      setids([])
    }
    setallcheck(!allcheck)
  }
   useEffect(() => {
    // console.log(ids)
      if (ids.length === categoryData.length && categoryData.length >= 1) {
        setallcheck(true)
      }
      else {
        setallcheck(false)
      }
   }, [ids])


    let multiDelete = () => {
      if (ids.length >= 1) {
        axios.post(`${apibaseurl}/category/multi-delete`, { ids })
          .then((res) => res.data)
          .then((finalres) => {
            getcategory()
            toast.success("delete successfully")
          })
      }
      else {
        toast.error("select any box")
      }
    }
   let CstatusUpdate=()=>{
 if(ids.length>=1){
  axios.put(`${apibaseurl}/category/status-update`,{ids})
  .then((res)=>res.data)
  .then((finalRes)=>{
    getcategory()
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
        <ToastContainer/>
        <div className='bg-gray-200 py-3 border-b'>

          <div className='flex justify-between '>
            <h1 className='mx-3 justify-center font-bold text-2xl'>View category</h1>
            <hr />
            <div className='flex gap-2 mx-3 '>

              <button onClick={CstatusUpdate} className='border-1 p-[5px_15px] bg-green-500 rounded-lg text-white'> Change</button>
              <button onClick={multiDelete} className='border-1 p-[5px_15px] bg-red-500 rounded-lg  text-white'>Delete</button>
            </div>
          </div>
        </div>
        <table className="w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3 border border-gray-300">
                <input onChange={allchecked}
                checked={allcheck}
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
              categoryData.length > 0 ? (
              categoryData.map((categoryObj, index) => {
                return (

                  <tr className="hover:bg-gray-50" key={index} >
                    <td className="p-3 border border-gray-300" >
                      <input onChange={getChecked}
                        checked={ids.includes(categoryObj._id)}
                        value={categoryObj._id}
                        type="checkbox" />
                    </td>

                    <td className="p-3 border border-gray-300">{categoryObj.categoryName}</td>

                    <td className="p-3 border border-gray-300">
                      <img src={staticpath + categoryObj.categoryImage} className="w-12 h-12 rounded object-cover" alt="img" />
                    </td>

                    <td className="p-3 border border-gray-300">{categoryObj.categoryOrder}</td>

                    <td className="p-3 border border-gray-300">
                      {
                        categoryObj.categoryStatus ?
                        <span className="px-3 py-1 text-sm bg-green-500 text-white rounded"> Active</span>
                        :
                        <span className="px-3 py-1 text-sm bg-red-500 text-white rounded"> Deactive</span>

                      }
                      </td>

                    <td className="p-3 border border-gray-300">
                      <Link to={`/category/edit/${categoryObj._id}`} >
                      <button className=" bg-blue-600 text-white rounded-full p-3 ml-3"><BiPencil className='text-white' /></button>
                      </Link>
                    </td>
                  </tr>
                )
              })
              ) : (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">No categories found</td>
                </tr>
              )
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

