import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaFilter, FaRegSquare } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router-dom'


export default function Viewsubsubcategory() {
  let [currentpage, setcurrentpage] = useState(1)
  let [subcategoryData, setsubcategoryData] = useState([])
  let [staticpath, setstaticpath] = useState([])
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [ids, setids] = useState([])
  let [eallchecked, seteallchecked] = useState(false)

  let apibaseurl = import.meta.env.VITE_APIBASEURL
 
  let getsubcategory = () => {
    axios.get(`${apibaseurl}/subcategory/view`,{
        params:{
          page:currentpage,
          limit
        }
      }
    )
      .then((res) => res.data)
      .then((finalRes) => {
        console.log("finalRes",finalRes)
        // toast.success(finalRes.msg)
        setsubcategoryData(finalRes.subcategoryCollection)
        setstaticpath(finalRes.staticPath)
        settotalpages(finalRes.totalpages)

      })
  }
  useEffect(() => {
    getsubcategory()
  }, [currentpage,limit])

  // single checkbox
  
 
  let getchecked = (e) => {
    // console.log(e.target.value)
    if (e.target.checked) {
      if (!ids.includes(e.target.value))
        setids([...ids, e.target.value])
    }
    else {
      let fillterData = ids.filter((v) => v != e.target.value)
      setids(fillterData)

    }
  }
  //allcheck box

  let allchecked = (e) => {
    if (e.target.checked) {
      let finalAns = subcategoryData.map((v) => v._id)
      // let finalAns = subcategoryData.map((v) => v._id)

      setids(finalAns)
    }
    else {
      setids([])
    }
    seteallchecked(!eallchecked)

  }

  useEffect(() => {
    if (ids.length == subcategoryData.length && subcategoryData.length >= 1) {

      seteallchecked(true)
    }
    else {
      seteallchecked(false)
    }
  }, [ids])

  //multidelete//

  let multiDelete = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/subcategory/multi-delete`, {ids})
        .then((res) => res.data)
        .then((finalRes) => {
            getsubcategory()

          toast.success("delete successfully")
        })
    }
    else{
      toast.error("select one box")
    }
}
let changeStatus=()=>{
  if(ids.length>=1){
    axios.put(`${apibaseurl}/subcategory/status-update`,{ids})
    .then((res)=>res.data)
    .then((finalRes)=>{
      
   getsubcategory()
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
      <section className=' border-1 shadow m-5 '>
        <ToastContainer/>
        <div className='bg-gray-200 py-3 border-b'>

          <div className='flex justify-between '>
            <h1 className='mx-3 justify-center font-bold text-2xl'>View Subcategory</h1>
            <hr />
            <div className='flex gap-2 mx-3 '>

              <button className='border-1 p-[5px_15px] bg-blue-500 rounded-md border-none' type='checkbox'></button>
              <button  onClick={changeStatus} className='border-1 p-[5px_15px] bg-green-500 rounded-lg text-white'> Change Status</button>
              <button onClick={multiDelete} className='border-1 p-[5px_15px] bg-red-500 rounded-lg  text-white'>Delete</button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-[40%_60%] m-5'>
          <div className='flex mx-5 gap-10'>
            <input onChange={allchecked}
              checked={eallchecked} type="checkbox" className='border-2xl py-1.5' />
            <h5>PERENT Category NAME</h5> </div>
          <div className='flex justify-end gap-16 font-bold font-light text-sm'>
            <div>SUB subcategory NAME</div>
            <div>IMAGE</div>
            <div>ORDER</div>
            <div>SATUTS</div>
            <div>ACTION</div>
          </div>
        </div>
        {
          subcategoryData?.map((Obj, index) => {   //  api se aaya data is state variable me store hua hai..
            return (
              <div className='grid grid-cols-[40%_60%] m-5 ' key={index}>
                <div className=' flex mx-5 gap-10'>
                  <input
                    onChange={getchecked}
                    checked={ids.includes(Obj._id)}
                    value={Obj._id}
                    type="checkbox" />
                  <div className='flex mx-5 gap-10'> {Obj?.subcategoryName}</div>
                </div>
                <div className='flex justify-end gap-14 '>
                  <div className='item-center mx-4'>{Obj?.parentCategory?.categoryName}</div>
                  <div className='item-center mx-4'><img src={staticpath + Obj?.subcategoryImage} className="h-10 w-10" alt="" /></div>
                  <div className='item-center mx-4'>{Obj?.subcategoryOrder}</div>

                  <div>
                    {
                      Obj.subcategoryStatus ?
                        <button className='border-1 p-2 bg-green-600 rounded-md '>Active</button>
                        :
                        <button className='border-1 p-2 bg-red-600 rounded-md '>Deactive</button>

                    }
                  </div>
                  <Link to={`/subcategory/edit/${Obj._id}`}>
                  <div className='border-1  p-3 bg-blue-600 rounded-full mx-1 border-none'><BiPencil className='text-white' /></div>
                  </Link>
                </div>
              </div>
            )
          })
        }

        <ResponsivePagination
          current={currentpage}
          total={totalpages}
          onPageChange={setcurrentpage}/>

      </section>
    </>
  )
}
