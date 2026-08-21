import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addcategory() {

  let { id } = useParams()
  let navigate = useNavigate()

  let apibaseurl = import.meta.env.VITE_APIBASEURL

  // image preview state
  let [image, setimage] = useState(
    `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png`
  );

  // form state
  let [formcategory, setformcategory] = useState({
    categoryName: "",
    categoryImage: "",
    categoryOrder: ""
  });

  // input change handler
  let getCategoryValue = (e) => {
    let obj = { ...formcategory }
    obj[e.target.name] = e.target.value
    setformcategory(obj)
  }

  // save / update function
  let SaveCategory = (e) => {
    e.preventDefault()
    let formVal = new FormData(e.target)
    
    console.log('FormData contents:');
    for (let pair of formVal.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // ------------------------
    // UPDATE LOGIC
    // ------------------------
    if (id) {
      axios.put(`${apibaseurl}/category/update/${id}`, formVal)
        .then((res) => res.data)
        .then((finalres) => {

          if (finalres.status == 1) {
            toast.success(finalres.msg)
            setformcategory({
              SliderName: "",  //for  page reset
              SliderImgae: "",
              SliderOrder: "",
            })

            setTimeout(() => {
              navigate("/category/viewcategory")
            }, 1000)
          } else {
            toast.error(finalres.error)
          }
        })
      return; // STOP create API
    }

    // ------------------------
    // CREATE LOGIC
    // ------------------------
    axios.post(`${apibaseurl}/category/create`, formVal)
      .then((res) => res.data)
      .then((finalres) => {

        console.log(finalres);

        if (finalres.status == 1) {
          toast.success(finalres.msg)
          setformcategory({
            categoryName: "",
            categoryImage: "",
            categoryOrder: "",
          })

          setTimeout(() => {
            navigate("/category/viewcategory")
          }, 1000);
        } else {
          toast.error(finalres.msg || "Category creation failed")
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.msg || "Server error occurred")
      })
  };

  // ------------------------------------
  // FETCH OLD DATA WHEN EDIT MODE (id)
  // ------------------------------------
  useEffect(() => {

    // reset form when switching from edit → add
    setformcategory({
      categoryName: "",
      categoryImage: "",
      categoryOrder: "",
    });

    if (id) {
      axios.get(`${apibaseurl}/category/edit-category/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {

          setformcategory({
            categoryName: finalRes.cateData.categoryName,
            categoryImage: finalRes.cateData.categoryImage,
            categoryOrder: finalRes.cateData.categoryOrder
          });

          // set image preview
          if (finalRes.cateData.categoryImage) {
            setimage(`${apibaseurl}/uploads/category/${finalRes.cateData.categoryImage}`)
          }
        })
    }

  }, [id]);

  return (
    <>
      <section className="border-1 shadow m-5">
        <ToastContainer />

        <div className="py-3">
          <h1 className="mx-3 justify-center font-bold text-2xl">
            {id ? "Edit Category" : "Add Category"}
          </h1>

          <hr />

          <form onSubmit={SaveCategory}>

            <h1 className="pt-2 mx-2 font-bold">Category Image</h1>

            <div className="flex items-start">

              {/* Image Preview Box */}
              <div className="relative w-60 h-60 m-3 border rounded-md overflow-hidden flex items-center justify-center">

                <img src={image} alt="Preview"
                  className="absolute inset-0 w-full h-full object-cover" />

                {/* Clear Image Button */}
                <button
                  onClick={() => setimage("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png")}
                  type='button'
                  className="z-50 absolute right-0 top-0 cursor-pointer text-xl"
                >
                  ❌
                </button>

                {/* Background Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <BsFileArrowDownFill className="text-white text-4xl" />
                </div>

;                {/* Hidden File Input */}
                <input
                  name='categoryImage'
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    setimage(URL.createObjectURL(e.target.files[0]));
                    let obj = {
                      ...formcategory
                    }
                    obj.categoryImage = e.target.files[0]
                    setformcategory(obj)
                  }
                  }
                />
              </div>

              {/* Form Inputs */}
              <div className="py-4 text-1xl m-4 w-full">

                <label className="font-bold mx-4">Category Name</label>
                <input
                  value={formcategory.categoryName}
                  onChange={getCategoryValue}
                  name='categoryName'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="Category"
                />

                <label className="font-bold mx-4">Order</label>
                <input
                  value={formcategory.categoryOrder}
                  onChange={getCategoryValue}
                  name='categoryOrder'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="number"
                  placeholder="Order"
                />

              </div>

            </div>

            <button className="bg-purple-600 p-3 mt-9 mx-3 rounded-md text-white" type='submit'>
              {id ? "Update Category" : "Add Category"}
            </button>

          </form>
        </div>
      </section>
    </>
  )
}
