import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function AddSlider() {
   let { id } = useParams()
   let navigate = useNavigate()

  let [image, setimage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let [formSlider, setformSlider] = useState({
    sliderName: "",
    sliderImgae: "",
    sliderOrder: ""
  })

  let getSliderValue = (e) => {
    let obj = { ...formSlider }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setformSlider(obj)
  }

  let SaveSlider = (e) => {
    e.preventDefault()

    let formVal = new FormData(e.target)
      if (id) {
        //update
        axios.put(`${apibaseurl}/Slider/update/${id}`, formSlider)
         .then((res) => res.data)
         .then((finalres) => {
            if (finalres.status == 1) {
            console.log("final", finalres.data)
              toast.success(finalres.msg)
              setformSlider({
                SliderName: "",  //for  page reset
                SliderImgae: "",
                SliderOrder: "",
              })
              setTimeout(() => {
                navigate("/Slider/viewslider")
              }, 2000);
            }
            else {  
              toast.error(finalres.error)
            }
      })
      }
      else {
    axios.post(`${apibaseurl}/slider/create`, formVal)
      .then((res) => res.data)
      .then((finalres) => {
        // console.log(finalres)
                if (finalres.status == 1) {
                  // console.log("final", finalres.data)
                   toast.success(finalres.msg)
                  setformSlider({
                    sliderName: "",  //for  page reset
                    sliderImage: "",
                    sliderOrder: "",
                  })
                 setTimeout(() => {
                   navigate("/slider/viewslider")
                 }, 2000);
                }
                else {
                  toast.error(finalres.error)
                }
              
      })
  }

  }

  useEffect(() => {
    setformSlider(
      {
        SliderName: "",
        SliderOrder: "",
      }
    )
    if (id) {
      axios.get(`${apibaseurl}/slider/edit-slider/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          setformSlider({
            // Slidercode: finalRes.data,
            sliderName: finalRes.sliderData.sliderName,
            sliderOrder: finalRes.sliderData.sliderOrder,
          })

         })
     }
  }, [id])
  let funObj=id ? "Edit Slider": "Add Slider"
  return (
    <>
      <section className="border-1 shadow m-5">
        <ToastContainer />
        <div className="py-3">
          <h1 className="mx-3 justify-center font-bold text-2xl">Add Slider</h1>
          <hr />
          <form onSubmit={SaveSlider}>

            <h1 className="pt-2 mx-2 font-bold">Slider Image</h1>

            <div className="flex items-start">
              {/* Image upload box */}
              <div className="relative w-60 h-60 m-3 border rounded-md overflow-hidden flex items-center justify-center">
                {/* Image preview (optional placeholder) */}
                <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />

                {/* Centered icon  */}
                <button onClick={() => setimage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')} type='button' className=' z-50 absolute right-0 top-0 cursor-pointer'>&#10060;</button>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 relative ">
                  <BsFileArrowDownFill className="text-white text-4xl" />
                </div>

                {/* Hidden input file */}
                <input
                  onChange={(e) => {
                    setimage(URL.createObjectURL(e.target.files[0]))

                  }}
                  name='sliderImage'
                  id="dropzone"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Right side inputs */}
              
                    <div className="py-4 text-1xl m-4 w-full">
                      <label className="font-bold mx-4">Name</label>
                      <input
                        onChange={getSliderValue}
                          value={formSlider.sliderName}
                        name='sliderName'
                        className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                        type="text"
                        placeholder="Slider"
                      />

                      <label className="font-bold mx-4">Order</label>
                      <input
                        onChange={getSliderValue}
                          value={formSlider.sliderOrder}
                        name='sliderOrder'
                        className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                        type="number"
                        placeholder="Order"
                      />
                    </div>
              
              
          

            </div>

            <button className="bg-purple-600 p-3 mt-9 mx-3 rounded-md text-white" type='submit'>
             {id ? "Edit slider": "Add slider"}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
