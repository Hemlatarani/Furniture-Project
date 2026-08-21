import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ResponsivePagination from 'react-responsive-pagination';

export default function ViewCountry() {
  let [search, setsearch] = useState(false)

  let [countryData, setcountryData] = useState([])
  let [currentpage, setcurrentpage] = useState(1)
  let [ids, setids] = useState([])
  let [totlpages, settotlpages] = useState(0)
  let [limit, setlimit] = useState(5)
  let [allcheck, setallcheck] = useState(false)

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let getcountryData = () => {
    axios.get(`${apibaseurl}/country/view`,
      {
        params: {
          pages: currentpage,
          limit
        }

      }
    )
      .then((res) => res.data)
      .then((finalRes) => {
        setcountryData(finalRes.countryCollection)
        settotlpages(finalRes.totalpages)
      })
  }
  useEffect(() => {
    getcountryData()
  }, [currentpage, limit])
  // 
  let getChecked = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (!ids.includes(value)) {
        setids([...ids, value]);
      }
    } else {
      let filterData = ids.filter((v) => v !== value);
      setids(filterData);
    }
  };
  let getallchecked = ((e) => {
    if (e.target.checked) {
      let finalAns = countryData.map((v) => v._id)
      setids(finalAns)
    }
    else {
      setids([])
    }
    setallcheck(!allcheck)
  })
  useEffect(() => {
    if (ids.length === countryData.length && countryData.length >= 1) {
      setallcheck(true)
    }
    else {
      setallcheck(false)
    }
  }, [ids])

  let multidelet = () => {
    if (ids.length >= 1) {
      axios.post(`${apibaseurl}/country/multi-delete`, { ids })
        .then((res) => res.data)
        .then((finalRes) => {
          getcountryData()

        })

    }
    else {
      toast.error("select one box")
    }
  }

  let statusUpdate = () => {
    if (ids.length >= 1) {
      // console.log("update api responsevie")
      axios.post(`${apibaseurl}/country/status-update`, { ids })
        .then((res) => res.data)
        .then((finalRes) => {
          getcountryData()
          setids([])
          // console.log(finalRes.data)
          toast.success("update successfully")
        })
    }
    else {
      toast.error("select one box")
    }
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f8f9fa", margin: 0, padding: 20, }}>
      {/* Header Navigation */}
      <ToastContainer />

      <div style={{ backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: 10, overflow: "hidden", }}>
        {/* Top Section (Grey Header) */}
        <div style={{ backgroundColor: "#6c757d", color: "white", padding: "10px 15px", display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <h3 style={{ margin: 0, fontWeight: "bold" }}>View Country</h3>
          <select className="border-1 text-black bg-white" onChange={(e) => setlimit(e.target.value)}>
            <option> Select Value</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ backgroundColor: "#0d6efd", color: "white", border: "none", borderRadius: 5, padding: "6px 10px", cursor: "pointer", }}>🔍</button>
            <button onClick={statusUpdate} style={{ backgroundColor: "#28a745", color: "white", border: "none", borderRadius: 5, padding: "6px 12px", cursor: "pointer", }}>Update</button>
            <button onClick={multidelet} style={{ backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: 5, padding: "6px 12px", cursor: "pointer", }}>Delete</button>
          </div>
        </div>

        {/* Table Section (Light Blue Area) */}
        <div style={{ backgroundColor: "#dbeafe", padding: "10px 15px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", }}>
            <thead>
              <tr>
                <th style={{ padding: 8 }}>Sr.No</th>
                <th style={{ padding: 8 }}>
                  <input
                    type="checkbox"

                    checked={ids.length === countryData.length && countryData.length > 1}
                    onChange={getallchecked}
                  />

                </th>
                <span style={{ padding: 10 }}>Country Name</span>
                <th style={{ padding: 10 }}>ORDER</th>
                <th style={{ padding: 10 }}>STATUS</th>
                <th style={{ padding: 10 }}>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {
                countryData.length >= 1 ?
                  countryData.map((countryObj, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ padding: 8, display: "flex", justifyContent: "left" }}>
                          {(currentpage - 1) * limit + index + 1}

                        </td>
                        <td style={{ padding: 8, gap: 20 }}>
                          <input
                            checked={ids.includes(countryObj._id)}
                            onChange={getChecked}

                            value={countryObj._id} type="checkbox" />



                        </td>
                        <td style={{ padding: 15 }}>
                          {countryObj.countryName}
                        </td>
                        <td style={{ padding: 15 }}>{countryObj.countryOrder}</td>
                        <td style={{ padding: 15 }}>
                          {
                            countryObj.countryStatus ? (
                              <button style={{ backgroundColor: "#198754", color: "white", padding: "5px 12px", borderRadius: 20, fontSize: 13, }}>
                                Active</button>
                            )
                              : (
                                <span style={{ backgroundColor: "#17e585ff", color: "white", padding: "5px 12px", borderRadius: 20, fontSize: 13, }}>
                                  Deactive</span>
                              )
                          }

                        </td>
                        <td style={{ padding: 10 }}>
                          <Link to={`/country/edit/${countryObj._id}`}>
                            <button style={{ backgroundColor: "#0d6efd", border: "none", borderRadius: "50%", color: "white", padding: "6px 8px", cursor: "pointer", }}> ✏️</button>
                          </Link>
                        </td>
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
          <ResponsivePagination
            current={currentpage}
            total={totlpages}
            onPageChange={setcurrentpage}
          />
        </div>
      </div>
    </div>
  );
}
