import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { FaFilter, FaRegSquare } from 'react-icons/fa'
import ResponsivePagination from 'react-responsive-pagination';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


export default function Viewchoose() {

  // let [page,setpage]=useState([0])
  // let [currentpage,setcurrentpage]=([])
  let [currentpage, setcurrentpage] = useState(1)
  let [chooseData, setchooseData] = useState([])
  let [staticpath, setstaticpath] = useState([])
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [ids,setids]=useState([])
  let [checkbox,setcheckbox]=useState(false)

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let getchoose = () => {
    axios.get(`${apibaseurl}/wchoose/view`, {
      params: {
        page: currentpage,
        limit
      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes)
        setchooseData(finalRes.wchooseCollection)
        setstaticpath(finalRes.staticPath)
        settotalpages(finalRes.totalpages)

      })
  }
   useEffect(() => {
    getchoose()
  }, [currentpage, limit])
  let getchecked = (e) => {
    // console.log(e.target.value)
    if (e.target.checked) {
      if (! ids.includes(e.target.value))
        setids([...ids, e.target.value])
    }
    else {
      let fillterData = ids.filter((v) => v != e.target.value)
      setids(fillterData)

    }
  }
  let allchecked = (e) => {
    if (e.target.checked) {
      let finalAns = chooseData.map((v) => v._id)
      // let finalAns = subcategoryData.map((v) => v._id)

      setids(finalAns)
    }
    else {
      setids([])
    }
    setcheckbox(!checkbox)

  }
   useEffect(() => {
    if(ids.length==chooseData.length && chooseData.length>=1){
      setcheckbox(true)
    }
    else{
      setcheckbox(false)
    }
  }, [ids])

  let multiDelete=()=>{
    if(ids.length>=1){
      axios.post(`${apibaseurl}/wchoose/multi-delete`,{ids})
      .then((res)=>res.data)
      .then((finalRes)=>{
        getchoose()
        setids([])
        toast.success("delete successfully")
        
      })
    }
    else{
        toast.error("select box")

    }
  }
  let statusUpdate=()=>{
 if(ids.length>=1){
  axios.put(`${apibaseurl}/wchoose/status-update`,{ids})
  .then((res)=>res.data)
  .then((finalRes)=>{
    getchoose()
    toast.success("status update successfully")
  })
 }
  else{
    toast.error("select box")
  }
  }

 
  return (
    <>
      <section className=' border-1 shadow m-5 '>
        <ToastContainer/>
        <div className='bg-gray-200 py-3 border-b'>

          <div className='flex justify-between '>
            <h1 className='mx-3 justify-center font-bold text-2xl'>View Why choose us</h1>
            <hr />
            <div className='flex gap-2 mx-3 '>

              <button className='border-1 p-[5px_15px] bg-blue-500 rounded-md border-none'></button>
              <button  onClick={statusUpdate} type='button' className='border-1 p-[5px_15px] bg-green-500 rounded-lg text-white'>Update</button>
              <button onClick={multiDelete} type='button' className='border-1 p-[5px_15px] bg-red-500 rounded-lg  text-white'>Delete</button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-[40%_60%] m-5'>
          <div className='flex mx-5 gap-10'>
            <input onChange={allchecked}
            checked={checkbox}
            type="checkbox" />
            <h5>TITLE</h5></div>
          <div className='flex justify-end gap-16 font-bold font-light text-sm'>
            <div>IMAGE</div>
            <div>DISCRIPTION</div>
            <div>ORDER</div>
            <div>SATUTS</div>
            <div>ACTION</div>
          </div>
        </div>
        {
          chooseData.map((chooseObj, index) => {
            return (
              <div className='grid grid-cols-[40%_60%] m-6 ' key={index}>
                <div className='flex mx-5 gap-10'> 
                  <input onChange={getchecked}
                  checked={ids.includes(chooseObj._id)} 
                  value={chooseObj._id}
                  type="checkbox" />
                  {chooseObj.chooseNameNew}</div>
                <div className='flex justify-end text-center gap-11'>
                  <div className='flex items-center justify-center '>
                    <img src={staticpath + chooseObj.chooseImageNew} width={50} height={50} className="w-10 h-10 object-cover rounded"
                      alt="" /></div>
                  <div className='truncate w-40'>{chooseObj.chooseMessageNew}</div>
                  <div className='item-center mx-1 text-[12px]'>{chooseObj.chooseOrderNew}</div>

                  <div> 
                    {
                      chooseObj.wchooseStatusNew ?
                      <button className='border-1 p-2 bg-green-600 rounded-md '>Active</button>
                      :
                      <button className='border-1 p-2 bg-red-600 rounded-md '>Deactive</button>

                    }
                    </div>
                <Link to={`/wchoose/edit/${chooseObj._id}`}>
                  <div className='border-1  p-3 bg-blue-600 rounded-full mx-1 border-none'><BiPencil className='text-white' /> </div>
                </Link>
              
                </div>
              </div>
            )
          })
}
    <ResponsivePagination
      current={currentpage}
      total={totalpages}
      onPageChange={setcurrentpage}
    />


      </section>
    </>
  )
}
