import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import ResponsivePagination from 'react-responsive-pagination'
import { toast, ToastContainer } from 'react-toastify'

export default function Viewsubsubcategory() {
  const [subsubcategoryData, setsubsubcategoryData] = useState([])
  const [staticpath, setstaticpath] = useState("")
  const [ids, setids] = useState([])
  const [eallchecked, seteallchecked] = useState(false)
  let [currentpage, setcurrentpage] = useState(1)
    let [totalpages, settotalpages] = useState(0)
    let [limit,setlimit]=useState(5)
  

  const apibaseurl = import.meta.env.VITE_APIBASEURL

  // Fetch data
  const getsubsubcategory = () => {
    axios.get(`${apibaseurl}/subsubcategory/view`,{
      params:{
        page:currentpage,
        limit
      }
    })
      .then(res => res.data)
      .then(finalRes => {
        setsubsubcategoryData(finalRes.subsubcategoryCollection || [])
        setstaticpath(finalRes.staticPath || "")
        settotalpages(finalRes.totalpages)
      })
      .catch(err => {
        toast.error("Error fetching subsubcategories")
        console.error(err)
      })
  }

  useEffect(() => {
    getsubsubcategory()
  }, [currentpage,limit])

  // Select all checkboxes
  const allchecked = (e) => {
    if (e.target.checked) {
      setids(subsubcategoryData.map(v => v._id))
    } else {
      setids([])
    }
    seteallchecked(e.target.checked)
  }

  // Select individual checkbox
  const getchecked = (e) => {
    if (e.target.checked) {
      setids([...ids, e.target.value])
    } else {
      setids(ids.filter(v => v !== e.target.value))
    }
  }
  let multiDelete = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/subsubcategory/multi-delete`, {ids})
        .then((res) => res.data)
        .then((finalRes) => {
            getsubsubcategory()

          toast.success("delete successfully")
        })
    }
    else{
      toast.error("select one box")
    }
}
let changeStatus=()=>{
  if(ids.length>=1){
    axios.put(`${apibaseurl}/subsubcategory/status-update`,{ids})
    .then((res)=>res.data)
    .then((finalRes)=>{
   getsubsubcategory()
    setids([])
   toast.success("status changed successfully")

  })
  }
  else{
    toast.error("select box to update status")
  }
}

  return (
    <>
      <section className='border shadow m-5'>

        <ToastContainer />

        {/* HEADER */}
        <div className='bg-gray-200 py-3 border-b'>
          <div className='flex justify-between items-center px-4'>
            <h1 className='font-bold text-2xl'>View Sub Sub Category</h1>

            <div className='flex gap-3'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-md'>All</button>
              <button 
              onClick={changeStatus}
              className='px-4 py-2 bg-green-600 text-white rounded-md'>Change</button>
              <button 
              onClick={multiDelete}
              className='px-4 py-2 bg-red-600 text-white rounded-md'>Delete</button>
            </div>
          </div>
        </div>

        {/* GRID HEADING ROW */}
        <div className="grid grid-cols-[20%_13%_20%_15%_13%_10%_10%] px-5 py-4 bg-gray-100 border-b text-sm font-semibold">
          <div className="flex gap-2 items-center">
            <input type="checkbox" checked={eallchecked} onChange={allchecked} />
            <span>PARENT CATEGORY</span>
          </div>
          <div>SUB CATEGORY</div>
          <div>SUB SUB CATEGORY</div>
          <div>IMAGE</div>
          <div>ORDER</div>
          <div>STATUS</div>
          <div>ACTION</div>
        </div>

        {/* GRID DATA ROWS */}
        {subsubcategoryData.map((Obj, index) => (
          <div
            key={index}
            className="grid grid-cols-[20%_15%_20%_13%_12%_10%_10%] px-5 py-4 border-b items-center text-sm"
          >
            {/* Checkbox + Parent */}
            <div className="flex gap-2 items-center">
              <input type="checkbox"
                value={Obj._id}
                checked={ids.includes(Obj._id)}
                onChange={getchecked}
              />
              <span>{Obj.parentCategory?.categoryName || "-"}</span>
            </div>

            {/* Subcategory */}
            <div>{Obj.subCategoryData?.subcategoryName || "-"}</div>

            {/* Subsubcategory */}
            <div>{Obj.subsubcategoryName || "-"}</div>

            {/* Image */}
            <div>
              {Obj.subsubcategoryImage ? (
                <img
                  src={staticpath + Obj.subsubcategoryImage}
                  className="h-10 w-10 rounded"
                  alt={Obj.subsubcategoryName}
                />
              ) : (
                <span>-</span>
              )}
            </div>

            {/* Order */}
            <div>{Obj.subsubcategoryOrder || "-"}</div>

            {/* Status */}
            <div>
              {Obj.subsubcategoryStatus ? (
                <span className="px-3 py-1 bg-green-600 text-white rounded-md">Active</span>
              ) : (
                <span className="px-3 py-1 bg-red-600 text-white rounded-md">Inactive</span>
              )}
            </div>

            {/* Action */}
            <div>
              <Link to={`/subsubcategory/edit/${Obj._id}`}>
                <div className="p-2 bg-blue-600 rounded-full w-fit cursor-pointer">
                  <BiPencil className="text-white" />
                </div>
              </Link>
            </div>
          </div>
        ))}
        <ResponsivePagination
                  current={currentpage}
                  total={totalpages}
                  onPageChange={setcurrentpage}/>
      </section>
    </>
  )
}
