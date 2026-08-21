import React, { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { BiPencil } from 'react-icons/bi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';


export default function Viewmaterial() {
  const [ids, setIds] = useState([]);
  const [material, setMaterial] = useState([]);
  let [currentpage, setcurrentpage] = useState(1)
  let [totalpages, settotalpages] = useState(0)
  let [limit, setlimit] = useState(5)
  const apibaseurl = import.meta.env.VITE_APIBASEURL;

  const getMaterial = () => {
    axios.get(`${apibaseurl}/material/view`,
      {
        params: {
          page: currentpage,
          limit
        }

      }
    )
      .then((res) => res.data)
      .then((finalRes) => {
        setMaterial(finalRes.materialCollection);
        settotalpages(finalRes.ttotalpage)
      })
      .catch((error) => {
        console.error("Error fetching materials:", error);
        toast.error("Failed to load materials.");
      });
  };

  const getChecked = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (!ids.includes(value))
        setIds([...ids, value]);
    } else {
      const filtered = ids.filter((v) => v !== value);
      setIds(filtered);
    }
  };

  const allChecked = (e) => {
    if (e.target.checked) {
      let allIds = material.map((v) => v._id);
      setIds(allIds);
    } else {
      setIds([]);
    }
  };

  useEffect(() => {
    getMaterial();
  }, [currentpage,limit]);

  const multidelete = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/material/multi-delete`, { ids })
        .then((res) => res.data)
        .then((finalRes) => {
          setMaterial(material.filter(item => !ids.includes(item._id)));
          setIds([]);
          toast.success("Materials deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting materials:", error);
          toast.error("Failed to delete materials.");
        });
    } else {
      toast.error("Please select at least one material.");
    }
  };
  let statusUpdate = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/faq/status-update`, { ids })
        .then((res) => res.data)
        .then((finalres) => {
          getMaterial()
          setIds([])

          toast.success("update successfully")
        })
    }
    else {
      toast.error("select one box")
    }
  }


  return (
    <section className='border-1 shadow m-5'>
      <div className='bg-gray-200 py-3 border-b flex justify-between items-center px-3'>
        <div style={{ display: "flex", gap: 100, padding: 20 }}>


          <h3 style={{ display: "flex" }}>View Material</h3>
          <select onChange={(e) => setlimit(e.target.value)} style={{
            backgroundColor: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "0.3s",
          }}>
            <option>select value</option>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>

        <div className='flex gap-2'>

          <button className='p-4 bg-blue-500 rounded-full border-none'>
            <FaFilter className='text-white' />
          </button>
          <button onClick={statusUpdate} className='p-3 bg-green-500 rounded-lg text-white'>Change</button>
          <button onClick={multidelete} className='p-3 bg-red-500 rounded-lg text-white'>Delete</button>
        </div>
      </div>

      <table className='w-full mt-5 border-collapse'>
        <thead className='bg-gray-200'>
          <tr>
            <th>Sr.No</th>
            <th className='px-5 py-2'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  checked={ids.length === material.length && material.length > 0}
                  onChange={allChecked}
                />


                <span>MATERIAL NAME</span>
              </div>
            </th>
            <th className='px-5 py-2'>ORDER</th>
            <th className='px-5 py-2'>STATUS</th>
            <th className='px-5 py-2'>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {material.length > 0 ? (
            material.map((item, index) => (
              <tr key={item._id} className='border-b'>
                <td className='pl-7'>
                  {(currentpage - 1) * limit + index + 1}
                </td>
                <td className='px-5 py-2 flex items-center gap-2'>
                  <input
                    type='checkbox'
                    value={item._id}
                    checked={ids.includes(item._id)}
                    onChange={getChecked}
                  />
                  <h3 className='text-[14px]'>{item.materialName}

                  </h3>
                </td>
                <td className='px-5 py-2 text-center'>{item.materialOrder}</td>
                <td className='px-5 py-2 text-center'>
                  {item.materialStatus ? (
                    <button className='p-2 rounded-md text-white bg-green-600'>
                      Active
                    </button>
                  ) : (
                    <button className='p-2 rounded-md text-white bg-red-600'>
                      Inactive
                    </button>
                  )}
                </td>
                <td className='px-5 py-2 text-center'>
                  <Link to={`/material/edit/${item._id}`}>
                    <button className='p-3 bg-blue-600 rounded-full text-white cursor-pointer'>
                      <BiPencil />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className='text-center py-5 text-gray-500'>
                No materials found
              </td>
            </tr>
          )}
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