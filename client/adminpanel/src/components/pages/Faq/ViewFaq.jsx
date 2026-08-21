import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";

export default function ViewFaq() {
  const [search, setsearch] = useState(false);
  const [faqData, setfaqData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [pagess, setpagess] = useState(null);
  const [ids, setids] = useState([]);
  let [limit,setlimit]=useState(5)
  const [boxallchecked, setboxallchecked] = useState(false);

  const apibaseurl = import.meta.env.VITE_APIBASEURL;

  const getfaqData = () => {
    axios
      .get(`${apibaseurl}/faq/view`, {
        params: {
          pagess: currentpage,
          limit
        },
      })
      .then((res) => res.data)
      .then((finalRes) => {
        setfaqData(finalRes.faqCollection);
        setpagess(finalRes.tpages);
      });
  };

  useEffect(() => {
    getfaqData();
  }, [currentpage,limit]);

  // ✅ Handle single checkbox
  const getChecked = (e) => {
    if (e.target.checked) {
      if (!ids.includes(e.target.value)) {
        setids([...ids, e.target.value]);
      }
    } else {
      const filterRe = ids.filter((v) => v !== e.target.value);
      setids(filterRe);
    }
  };

  // ✅ Handle select all
  const allchecked = (e) => {
    if (e.target.checked) {
      const finalAns = faqData.map((v) => v._id);
      setids(finalAns);
    } else {
      setids([]);
    }
    setboxallchecked(e.target.checked);
  };

  useEffect(() => {
    if (ids.length === faqData.length && faqData.length >= 1) {
      setboxallchecked(true);
    } else {
      setboxallchecked(false);
    }
  }, [ids, faqData]);

  // ✅ Multi delete
  const multidelet = () => {
    if (ids.length >= 1) {
      axios
        .post(`${apibaseurl}/faq/multi-delete`, { ids })
        .then((res) => res.data)
        .then(() => {
          getfaqData();
          toast.success("Deleted successfully");
          setids([]);
        });
    } else {
      toast.error("Select at least one checkbox");
    }
  };

  // ✅ Status update
  const statusUpdate = () => {
    if (ids.length >= 1) {
      axios
        .post(`${apibaseurl}/faq/status-update`, { ids })
        .then((res) => res.data)
        .then(() => {
          getfaqData();
          setids([]);
          toast.success("Status updated successfully");
        });
    } else {
      toast.error("Select at least one checkbox");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        margin: 0,
        padding: 20,
      }}
    >
      {/* Main Container */}
      <div 
        style={{ 
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 20,
        }}
      >
       
  <div style={{display:"flex",gap:100,padding:20}}>


  <h3 style={{ display:"flex" }}>View Faq</h3>
<select  onChange={(e)=>setlimit(e.target.value)} style={{
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
          

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 8,
            borderTop: "2px solid #ccc",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <button
            onClick={statusUpdate}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Change Status
          </button>

          <button
            onClick={multidelet}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>

        {/* Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          {/* <thead>
            <tr>
            
                <th style={{ borderBottom: "2px solid #ccc" }}>Sr. No</th>
              <th style={{ borderBottom: "2px solid #ccc", width: "10%" }}>
                <input
                  onChange={allchecked}
                  checked={boxallchecked}
                  type="checkbox"
                />
              </th>
          
              <th style={{ borderBottom: "2px solid #ccc" }}>QUESTION</th>
              <th style={{ borderBottom: "2px solid #ccc" }}>ANSWER</th>
              <th style={{ borderBottom: "2px solid #ccc" }}>ORDER</th>
              <th style={{ borderBottom: "2px solid #ccc" }}>STATUS</th>
              <th style={{ borderBottom: "2px solid #ccc" }}>ACTION</th>
            </tr>
          </thead> */}
          <thead>
          
          <tr className='bg-blue-200 text-left'>
              <th className="pl-4">Sr.No</th>
            <th className='p-2'>
              <input onChange={allchecked}
                checked={boxallchecked}
                type="checkbox" className='h-4 w-4 mr-2' /> FAQ NAME
            </th>



            <th className='p-2'>CODE</th>
            <th className='p-2'>ORDER</th>
            <th className='p-2'>STATUS</th>
            <th className='p-2'>ACTION</th>
          </tr>
        </thead>

          <tbody>
            {faqData.length >= 1 ? (
              faqData.map((faqObject, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  {/* ✅ Checkbox + Number */}
                  <td className="pl-7" >

                  {(currentpage - 1) *limit + index + 1}
                  </td>
                  <td
                    style={{
                      padding: 10,
                     
                      
                    }}
                  >
                    <input
                      onChange={getChecked}
                      checked={ids.includes(faqObject._id)}
                      value={faqObject._id}
                      type="checkbox"
                      style={{ cursor: "pointer" }}
                    />
                  </td>

                  {/* Question */}
                  <td style={{ padding: 10, fontWeight: 500 }}>
                    {faqObject.faqName}
                  </td>

                  {/* Answer */}
                  <td style={{ padding: 10 }}>{faqObject.faqCode}</td>

                  {/* Order */}
                  <td style={{ padding: 10 }}>{faqObject.faqOrder}</td>

                  {/* Status */}
                  <td style={{ padding: 10 }}>
                    {faqObject.faqStatus ? (
                      <button
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: 20,
                          fontSize: 13,
                          border: "none",
                        }}
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          padding: "5px 12px",
                          borderRadius: 20,
                          fontSize: 13,
                          border: "none",
                        }}
                      >
                        Inactive
                      </button>
                    )}
                  </td>

                  {/* Action */}
                  <td style={{ padding: 10, textAlign: "center" }}>
                    <Link to={`/faq/edit/${faqObject._id}`}>
                      <button
                        style={{
                          backgroundColor: "#0d6efd",
                          border: "none",
                          borderRadius: "50%",
                          color: "white",
                          padding: "6px 8px",
                          cursor: "pointer",
                        }}
                      >
                        ✏️
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Pagination */}
        <div style={{ justifyContent: "center", marginTop: 20 }}>
          <ResponsivePagination
            current={currentpage}
            total={pagess}
            onPageChange={setcurrentpage}
          />
        </div>
      </div>
    </div>
  );
}