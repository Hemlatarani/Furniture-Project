import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addsubsubcategory() {
  let [Image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')

  let { id } = useParams()

  let navigate = useNavigate()
  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let [parentData, setparentData] = useState([])
  let [subcatedata, setsubcatedata] = useState([])
  
  let [formValues, setformValues] = useState({
    parentCategory: "",
    subCategoryData: "",
    subsubcategoryImage: "",
    subsubcategoryName: "",
    subsubcategoryOrder: "",
  })
  let getValueSetvalue = (e) => {
    let obj = { ...formValues }
    let inputname = e.target.name
    let inputValue = e.target.value
    obj[inputname] = inputValue
    setformValues(obj)
  }


  let getparentCategory = () => {
    axios.get(`${apibaseurl}/subsubcategory/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.categoryData)
        setparentData(finalRes.categoryData)
      })
  }
  let getsubCategoryData = (Pid) => {
    axios.get(`${apibaseurl}/subsubcategory/sub-category/${Pid}`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.subcategoryyData)
        setsubcatedata(finalRes.subcategoryyData)
      })
  }

  useEffect(() => {
    getparentCategory()
  }, [])

  // useEffect(() => {},
  let SavesubsubCategory = (e) => {
    e.preventDefault()

    let formValue = new FormData(e.target)
    if (id) {
      //update
      axios.put(`${apibaseurl}/subsubcategory/update/${id}`, formValues)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status == 1) {
            // console.log("final", finalres.data)
            toast.success(finalres.msg)
            formValues.subsubcategoryImage = e.target.subsubcategoryImage.value
            setformValues({
              subsubcategoryName: "",
              subsubcategoryOrder: "",
              subsubcategoryImage: "",
            })

            setTimeout(() => {
              navigate("/subsubcategory/viewsubsubcategory")
            }, 2000);
          }
          else {
            toast.error(finalres.error)
          }
        })

      // console.log(formcategory)
    }
    else {
      axios.post(`${apibaseurl}/subsubcategory/create`, formValue)
        .then((res) => res.data)
        .then((finalRes) => {
          if (finalRes.status == 1) {
            console.log("response",finalRes)
            toast.success(finalRes.msg)
            setformValues({
              subsubcategoryName: "",
              subsubcategoryOrder: "",
              subsubcategoryImage: "",

            })
            setTimeout(() => {
              navigate("/subsubcategory/viewsubsubcategory")
            }, 2000);
          }
          else {
            toast.error(finalRes.error)
          }// console.log(finalRes)
        })
    }
  }
  useEffect(() => {
    setformValues({

      parentCategory: "",
      subCategoryData: "",
      subsubcategoryImage: "",
      subsubcategoryName: "",
      subsubcategoryOrder: "",
    })

    if (id) {
      axios.get(`${apibaseurl}/subsubcategory/edit-subsubcategory/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          toast.success(finalRes.msg)
          // console.log("edit data", finalRes)

          getsubCategoryData(finalRes.subsubcategoryData.parentCategory)

          setformValues({
            parentCategory: finalRes.subsubcategoryData.parentCategory,
            subCategoryData: finalRes.subsubcategoryData.subCategoryData,
            subsubcategoryImage: finalRes.subsubcategoryData.subsubcategoryImage,
            subsubcategoryName: finalRes.subsubcategoryData.subsubcategoryName,
            subsubcategoryOrder: finalRes.subsubcategoryData.subsubcategoryOrder,
          })

          let apiimageurl = import.meta.env.VITE_APIIMAGEURL
          setImage(`${apiimageurl}/uploads/subsubcategory/${finalRes.subsubcategoryData.subsubcategoryImage}?v==${Date.now}`)
        })


    }

  }, [id])

  // console.log("formd=values",formValues.parentCategory,"sub cate data",)
  return (
    <>
      <section className=' border-2 shadow m-5 rounded-md '>
        <ToastContainer />

        <form onSubmit={SavesubsubCategory}>


          <div className='bg-blue-200 '>

            <h1 className=' p-5 justify-center font-bold text-2xl bg-blue-900 text-white'>Add SubsubCategory</h1>
            <hr />

            <h1 className='pt-2 mx-2 font-bold'>Category Image</h1>
            <div className=' flex w-[20%_auto] '>


              <div className="relative w-60 h-60 m-3 border rounded-md overflow-hidden flex items-center justify-center">
                {/* Image preview (optional placeholder) */}
                <img src={Image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />

                {/* Centered icon  */}
                <button onClick={() => setImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')} type='button' className=' z-50 absolute right-0 top-0 cursor-pointer'>&#10060;</button>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 relative ">
                  <BsFileArrowDownFill className="text-white text-4xl" />
                  <input
                    onChange={(e) => {
                      setImage(URL.createObjectURL(e.target.files[0]))


                    }}
                    name='subsubcategoryImage'
                    id="dropzone"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              <div className=' py-1  text-1xl m-1 w-[100%]  '>
                <label className='font-bold mx-4'> Perent Category Name</label>
                <select
                // value={formValues.parentCategory}
                  onChange={(e) => getsubCategoryData(e.target.value)}
                  name="parentCategory"
                  className="border-1 w-[95%] rounded-md relative z-50 bg-gray-200"
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }}>
                  <option>Select Category</option>
                  {
                    parentData.map((Obj, index) => {
                     
                      return (
                        <option
                        selected={formValues.parentCategory==Obj._id}
                         value={Obj._id}>{Obj.categoryName}</option>

                      )

                    })
                  }
                </select>

                <label className='font-bold mx-4'>Sub Parent Category</label>
                <select
                  name="subCategoryData"
                  // value={formValues.subCategoryData}
                  className="border-1 w-[95%] rounded-md bg-gray-200"
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }}
                >
                  <option>Select Sub Parent Category</option>

                  {subcatedata.map((Obj) => (
                    <option 
                    //  selected={formValues.parentCategory==Obj.parentCategory._id} 
                    key={Obj._id} value={Obj._id}>
                      {Obj.subcategoryName}
                    </option>
                  ))}
                </select>


                <label className='font-bold mx-4'>sub sub Category Name</label>
                <input
                  onChange={getValueSetvalue}
                  value={formValues.subsubcategoryName}
                  name="subsubcategoryName" className=" border-1 w-[95%] rounded-md bg-gray-100" type="text" placeholder='category'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />
                <label className='font-bold mx-4'>Order</label>
                <input
                  onChange={getValueSetvalue}
                  value={formValues.subsubcategoryOrder}

                  name="subsubcategoryOrder" className=" border-1 w-[95%] rounded-md bg-gray-100" type="number" placeholder='category'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />

              </div>
            </div>
            <button className='bg-purple-600 p-3 m-3 rounded-md text-white' type='submit'>Add Image</button>
          </div>



        </form>


      </section>
    </>
  )
}
