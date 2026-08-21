import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function Addmaterial() {
  let { id } = useParams() //return object
  let navigate = useNavigate()

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  console.log(apibaseurl)
  let [materialsform, setmaterialsform] = useState({
    materialName: "",
    materialOrder: ""
  })
  let getValueSetvalue = (e) => {
    let obj = { ...materialsform }
    let inputname = e.target.name
    let inputvalue = e.target.value
    obj[inputname] = inputvalue
    setmaterialsform(obj)

  }
  let materialSave = (e) => {
    e.preventDefault()
    if(id){
axios.put(`${apibaseurl}/material/update/${id}`, materialsform)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)

          setmaterialsform({
            materialName: "",
            materialOrder: "",
          })
          setTimeout(() => {
            navigate("/material/viewmaterial")
          }, 2000);

        }
        else {
          toast.error(finalRes.errorMessage)
        }
      })

    console.log(materialsform)

    }
    else{
      axios.post(`${apibaseurl}/material/create`, materialsform)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status == 1) {
          toast.success(finalRes.msg)

          setmaterialsform({
            materialName: "",
            materialOrder: "",
          })
          setTimeout(() => {
            navigate("/material/viewmaterial")
          }, 2000);

        }
        else {
          toast.error(finalRes.errorMessage)
        }
      })

    console.log(materialsform)

    }

    
  }
  useEffect(() => {
setmaterialsform({
            materialName: "",
            materialOrder: "",
          })

    if (id) {
      axios.get(`${apibaseurl}/material/edit-material/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          console.log(finalRes)
          setmaterialsform({
            materialName: finalRes.materialData.materialName,
            materialOrder: finalRes.materialData.materialOrder
          })

        })
    }
  }, [])
  let funObj = id ? "Edit color" : "viewd color";



  return (
    <>
      <section className='border-1 rounded-md m-5'>
        <ToastContainer />
        <form onSubmit={materialSave} >
          <div className='border-b bg-gray-200'>

            <h1 className='font-bold text-2xl mx-5 py-5'>Add Material</h1>
          </div>
          <div className=' py-4'>

            <label className=' font-bold text-1xl mx-3'>Category Name</label>
            <input

              value={materialsform.materialName}
              onChange={getValueSetvalue}

              name="materialName" className="border-1 w-[95%] rounded-md text-gray-400"
              type="text"
              placeholder="Enter Color Name"
              style={{ display: "block", margin: "10px 20px ", padding: "5px" }} />
            <label className=' font-bold text-1xl mx-3'>Order</label>
            <input

              value={materialsform.materialOrder}
              onChange={getValueSetvalue}

              name='materialOrder' className="border-1 w-[95%] rounded-md text-gray-400"
              type="text"
              placeholder="Order"
              style={{ display: "block", margin: "10px 20px ", padding: "5px" }}
            />
            <button className='bg-purple-600 p-3 m-4 rounded-md'>
              {id ?
                "Edit" : "view"}
              Material</button>
          </div>
        </form>
      </section>
    </>
  )
}
//   axios.post(`${apibaseurl}/material/create`, materialsform)
//     .then((res) => res.data)
//     .then((finalRes) => {

//       if (finalRes.status == 1) {
//         toast.success(finalRes.msg)
//         setmaterialsform({
//           materialName: "",
//           materialOrder: "",
//         })
//         setTimeout(() => {
//           navigate("/material/viewmaterial")
//         }, 2000);

//       }
//       else {
//         toast.error(finalRes.errorMessage)
//       }
//     })


// }