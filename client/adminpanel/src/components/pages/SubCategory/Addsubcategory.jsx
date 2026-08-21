import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addsubcategory() {

  let [Image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
  )

  let { id } = useParams()
  let navigate = useNavigate()
  let [parentData, setparentData] = useState([])
  let apibaseurl = import.meta.env.VITE_APIBASEURL

  let [formValues, setformValues] = useState({
    parentCategory: "",
    subcategoryName: "",
    subcategoryImage: null,
    subcategoryOrder: ""
  })

  // handle text/select inputs
  let getValueSetvalue = (e) => {
    setformValues(prev => ({...prev,
      [e.target.name]: e.target.value
    }))
  }

  // load parent category
  let getparentCategory = () => {
    axios.get(`${apibaseurl}/subcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setparentData(finalRes.categoryData)
        console.log("parent=>",finalRes.categoryData)
      })
  }

  // submit form
  let SavesbuCategory = (e) => {
    e.preventDefault()
// console.log("form submit")
  // console.log("Form Values:", formValues)   // 👈 ye lagao

    let formData = new FormData()
    formData.append("parentCategory", formValues.parentCategory)
    formData.append("subcategoryName", formValues.subcategoryName)
    formData.append("subcategoryOrder", formValues.subcategoryOrder)

    // image append only if selected
    if (formValues.subcategoryImage) {
      formData.append("subcategoryImage", formValues.subcategoryImage)
    }
      // console.log("API URL:", `${apibaseurl}/subcategory/create`) // 👈 ye bhi lagao

    if (id) {
      // UPDATE
      axios.put(`${apibaseurl}/subcategory/update/${id}`, formData)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status == 1) {
            toast.success(finalres.msg)

            setTimeout(() => {
              navigate("/subcategory/viewsubcategory")
            }, 1500)
          }
          else {
            toast.error(finalres.error)
          }
        })
    }
    else {
      // CREATE
      axios.post(`${apibaseurl}/subcategory/create`, formData)
        .then((res) => res.data)
        .then((finalres) => {
          console.log("api response",finalres)
          if (finalres.status == 1) {
            toast.success(finalres.msg)

            setformValues({
              parentCategory: "",
              subcategoryName: "",
              subcategoryImage: null,
              subcategoryOrder: ""
            })

            setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')

            setTimeout(() => {
              navigate("/subcategory/viewsubcategory")
            }, 1500)
          }
          else {
            toast.error(finalres.error)
          }
        })
    }
  }

  // fetch edit data
  useEffect(() => {
    getparentCategory()

    if (id) {
      axios.get(`${apibaseurl}/subcategory/edit-subcategory/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
console.log(finalRes.subcategoryData)
          setformValues({
            parentCategory: finalRes.subcategoryData.parentCategory,
            subcategoryName: finalRes.subcategoryData.subcategoryName,
            subcategoryOrder: finalRes.subcategoryData.subcategoryOrder,
            subcategoryImage: null // file input empty hi rahegi
          })

          let apiimageurl = import.meta.env.VITE_APIIMAGEURL
          setImage(`${apiimageurl}/uploads/subcategory/${finalRes.subcategoryData.subcategoryImage}?v=${Date.now()}`)
        })
    }

  }, [id])


  return (
    <>
      <section className='border-1 shadow m-5'>

        <div className='bg-gray-200 py-3'>
          <ToastContainer />

          <h1 className='mx-3 font-bold text-2xl'>Add SubCategory</h1>
          <hr />

          <form onSubmit={SavesbuCategory}>
            <h1 className='pt-2 mx-2 font-bold'>Category Image</h1>

            <div className='flex'>

              {/* IMAGE UPLOAD BOX */}
              <div className="relative w-60 h-60 m-3 border rounded-md overflow-hidden flex items-center justify-center">
                <img src={Image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />

                <button
                  onClick={() => setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')}
                  type='button'
                  className='z-50 absolute right-0 top-0 cursor-pointer'
                >
                  &#10060;
                </button>

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <BsFileArrowDownFill className="text-white text-4xl" />

                  <input
                    type="file"
                    name='subcategoryImage'
                    onChange={(e) => {
                      let file = e.target.files[0]
                      if (file) {
                        setImage(URL.createObjectURL(file))
                        setformValues({ ...formValues, subcategoryImage: file })
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* TEXT FIELDS */}
              <div className='py-4 m-4 w-[100%]'>

                <label className='font-bold mx-4'>Parent Category</label>
                <select
                  name="parentCategory"
                  // value={}
                  onChange={getValueSetvalue}
                  className="border-1 w-[95%] rounded-md bg-gray-200"
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }}
                >
                  <option value="">Select Category</option>

                  {parentData.map((Obj, index) => (
                    <option key={index}
                     selected={formValues.parentCategory==Obj._id}
                      value={Obj._id}>
                      {Obj.categoryName}
                    </option>
                  ))}
                </select>

                <label className='font-bold mx-4'>Category Name</label>
                <input
                  type="text"
                  name='subcategoryName'
                  value={formValues.subcategoryName}
                  onChange={getValueSetvalue}
                  className="border-1 w-[95%] rounded-md"
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }}
                />

                <label className='font-bold mx-4'>Order</label>
                <input
                  type="number"
                  name='subcategoryOrder'
                  value={formValues.subcategoryOrder}
                  onChange={getValueSetvalue}
                  className="border-1 w-[95%] rounded-md"
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }}
                />

              </div>
            </div>

            <button className='bg-purple-600 p-3 m-3 rounded-md text-white'>
              {id ? "Update" : "submit"}
            </button>
          </form>

        </div>
      </section>
    </>
  )
}
