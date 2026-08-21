import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Addchoose() {
   let { id } = useParams() //ye main jsx se id le rha hai (id jo edit pe click krne pe url me aata hai)
   let navigate = useNavigate()

  let [image, setimage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let [formchoose, setformchoose] = useState({
       
        chooseNameNew: "",
    chooseImageNew: "",
    chooseOrderNew: ""
  })

  let getchooseValue = (e) => {
    let obj = { ...formchoose }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setformchoose(obj)
  }

  let Savechoose = (e) => {
    e.preventDefault()
  
    let formVal = new FormData(e.target)
    if (id) {
      //update
      axios.put(`${apibaseurl}/wchoose/update/${id}`, formchoose)
       .then((res) => res.data)
       .then((finalres) => {
          if (finalres.status == 1) {
          console.log("final", finalres.data)
            toast.success(finalres.msg)
            setformchoose({
              chooseNameNew: "",  //for  page reset
              chooseImageNew: "",
              chooseOrderNew: "",
            })
            setTimeout(() => {
              navigate("/choose/view")
            }, 2000);
          }
          else {  
            toast.error(finalres.error)
          }
    })

      // console.log(formchoose)
    }
  //   else {
       axios.post(`${apibaseurl}/wchoose/create`, formVal)
         .then((res) => res.data)
        .then((finalres) => {
           console.log(finalres)
          if (finalres.status == 1) {
          //   console.log("final", finalres.data)
            toast.success(finalres.msg)
            setformchoose({
              chooseNameNew: "",  //for  page reset
              chooseImageNew: "",
              chooseOrderNew: "",
          
            })
           setTimeout(() => {
             navigate("/wchoose/viewchoose")
          }, 2000);
          }
          else {
            toast.error(finalres.error)
          }
         })
    }
    // console.log(formchoose)


   
  useEffect(() => {
    setformchoose(
      {
        chooseNameNew: "",
        chooseOrderNew: "",
        chooseMessageNew: ""
      }
    )
    if (id) {
      axios.get(`${apibaseurl}/wchoose/edit-wchoose/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          setformchoose({
            chooseNameNew: finalRes.chooseData.chooseNameNew,
            chooseOrderNew: finalRes.chooseData.chooseOrderNew,
            chooseMessageNew: finalRes.chooseData.chooseMessageNew,
          })

         })
     }
  }, [id])
  let funObj =id ?  "Edit":"Add"
  return (
    <>
      <section className="border-1 shadow m-5">
        <ToastContainer />
        <div className="py-3">
          <h1 className="mx-3 justify-center font-bold text-2xl">Add why choose us</h1>
          <hr />
          <form onSubmit={Savechoose}>
            
            <h1 className="pt-2 mx-2 font-bold">choose Image</h1>

            <div className="flex items-start">
              {/* Image upload box */}
              <div className="relative w-60 h-60 m-3 border rounded-md overflow-hidden flex items-center justify-center">
                {/* Image preview (optional placeholder) */}
                <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover"/>

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
                  name='chooseImageNew'
                  id="dropzone"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Right side inputs */}
              <div className="py-2 text-1xl mx-3 w-full">
                <label className="font-bold mx-4">Title Name </label>
                <input
                onChange={getchooseValue}
                value={formchoose.chooseNameNew}
                  name='chooseNameNew'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="choose"
                />
                <label className="font-bold mx-4">Order</label>
                <input
                onChange={getchooseValue}
                value={formchoose.chooseOrderNew}
                  name='chooseOrderNew'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="number"
                  placeholder="Order"/>
                   <label className="font-bold mx-4">Descripiton</label>
                <input
                onChange={getchooseValue}
                value={formchoose.chooseMessageNew}
                   name='chooseMessageNew'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="choose"
                />
              </div> 

            </div>

            <button className="bg-purple-600 p-3 mt-9 mx-3 rounded-md text-white" type='submit'>
              {id ? "Edit Choose us":" Add Choose us"}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
