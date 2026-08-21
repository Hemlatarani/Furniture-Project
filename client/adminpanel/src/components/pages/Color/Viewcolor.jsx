import { FaFilter } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import axios from 'axios';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import ResponsivePagination from 'react-responsive-pagination';
import { FaSearchPlus } from "react-icons/fa";



export default function Viewcolor() {
  const [colorData, setcolorData] = useState([]);
  let [ids, setids] = useState([])
  let [allcheck, setallcheck] = useState(false)
  let [currentpage, setcurrentpage] = useState(1)
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [showBar,setShowBar]=useState(false)
  let [searchTitle,setsearchTitle]=useState("")
  const apibaseurl = import.meta.env.VITE_APIBASEURL;

  const getcolor = () => {
    axios.get(`${apibaseurl}/color/view`, {
      params: {
        page: currentpage,
        limit,
        searchTitle

      }
    })
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log("API Response:", finalRes);
        setcolorData(finalRes.colorCollection);
        settotalpages(finalRes.totalpages)

      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  };

  useEffect(() => {
    getcolor();
  }, [currentpage, limit]);

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
  let allchecked = (e) => {
    if (e.target.checked) {
      let finalAns = colorData.map((v) => v._id)
      setids(finalAns)
    }
    else {
      setids([])
    }
    setallcheck(!allcheck)
  }
  useEffect(() => {
    if (ids.length === colorData.length && colorData.length >= 1) {
      setallcheck(true)
    }
    else {
      setallcheck(false)
    }
  }, [ids])


  let multiDelete = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/color/multi-delete`, { ids })
        .then((res) => res.data)
        .then((finalres) => {
          getcolor()
          toast.success("delete successfully")
        })
    }
    else {
      toast.error("select any box")
    }
  }
  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/color/status-update`, { ids })
        .then((res) => res.data)
        .then((finalres) => {
          getcolor()
          setids([])
          toast.success("update successfully")
        })
    }
    else {
      toast.error("select one box")
    }
  }

  return (
    <section className='border-1 shadow m-5'>
      <ToastContainer position="top-right" autoClose="2000" />
    
    

     {showBar && (
            <div className='flex justify-start p-4 bg-gray-200 border m-5'>
                 <div className='flex justify-content-center gap-2'>
                    <input onChange={(e)=>setsearchTitle(e.target.value)}
                   type="text"
                   placeholder="Search here..."
                   className='border p-2 rounded w-[260px] cursor-pointer'
                 />
             <button onClick={()=>getcolor()} className='mt-[0.5] text-3xl p-2 border rounded-md text-white bg-blue-500 cursor-pointer hover:bg-blue-200 hover:text-black'><FaSearchPlus /></button>  
                 </div>
               
    
               </div>
          )}
    
      <div className='bg-gray-400 py-3 border-b'>
        <div className='flex justify-between'>
          <h1 className='mx-3 font-bold text-2xl'>View Color</h1>
          <select className="border-1" onChange={(e) => setlimit(e.target.value)}>
            <option>Select value</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <div className='flex gap-2 mx-3'>
            <button className='p-3 bg-blue-500 rounded-lg'> <FaFilter  onClick={()=>setShowBar(!showBar)} className='text-white cursor-pointer' /></button>
            <button onClick={statusUpdate} className='p-3 bg-green-500 rounded-lg text-white cursor-pointer'>Change</button>
            <button onClick={multiDelete} className='p-3 bg-red-500 rounded-lg text-white cursor-pointer'>Delete</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>

          <tr className='bg-blue-200 text-left'>
            <th className="pl-4">Sr.No</th>
            <th className='p-2'>
              <input onChange={allchecked}
                checked={allcheck}
                type="checkbox" className='h-4 w-4 mr-2' /> COLOR NAME
            </th>



            <th className='p-2'>CODE</th>
            <th className='p-2'>ORDER</th>
            <th className='p-2'>STATUS</th>
            <th className='p-2'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {
            colorData.length >= 1 ?

              colorData.map((colorObj, index) => (
                <tr key={index} className="border-b">
                  <td className=" pl-7">
                    {(currentpage - 1) * limit + index + 1}</td>
                  <td className='p-2'>
                    <input type="checkbox" onChange={getChecked}

                      checked={ids.includes(colorObj._id)}

                      value={colorObj._id} className='h-4 w-4 mr-2' /> {colorObj.colorName}
                  </td>
                  <td className='p-2'>{colorObj.colorCode}</td>
                  <td className='p-2'>{colorObj.colorOrder}</td>
                  <td className='p-2'>



                    {colorObj.colorStatus ?
                      <button className="p-[5px_10px] rounded-xl bg-green-500 text-white bg-gray-400 text-black">Active</button>
                      :
                      <button className="p-[5px_10px] rounded-xl bg-red-500 text-white bg-gray-400 text-black">Deactive</button>
                    }


                  </td>
                  <td className='p-2'>
                    <Link to={`/color/edit/${colorObj._id}`}>
                      <BsFillPencilFill className='bg-blue-500 text-2xl p-2 rounded-full text-white cursor-pointer' />
                    </Link>
                  </td>
                </tr>
              ))
              :
              <tr>
                <td colSpan="5" className="text-center p-4">No Data Found</td>
              </tr>
          }
        </tbody>
      </table>
      <ResponsivePagination
        current={currentpage}
        total={totalpages}
        onPageChange={setcurrentpage}
      />

    </section>
  );
}