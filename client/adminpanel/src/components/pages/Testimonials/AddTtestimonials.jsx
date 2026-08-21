import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsFileArrowDownFill } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function AddTestimonials() {
   let { id } = useParams()
   let navigate = useNavigate()

  let [image, setimage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png')

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let [formtesti, setformtesti] = useState({
    testiName: "",
    testiImage: "",
    testiOrder: ""
  })

  let gettestiValue = (e) => {
    let obj = { ...formtesti }
    let inputName = e.target.name
    let inputValue = e.target.value
    obj[inputName] = inputValue
    setformtesti(obj)
  }

  let Savetesti = (e) => {
    e.preventDefault()
  
    let formVal = new FormData(e.target)
    if (id) {
      //update
      axios.put(`${apibaseurl}/testi/update/${id}`, formtesti)
       .then((res) => res.data)
       .then((finalres) => {
          if (finalres.status == 1) {
          console.log("final", finalres.data)
             toast.success(finalres.msg)
            setformtesti({
              testiName: "",  //for  page reset
              testiImgae: "",
              testiOrder: "",
            })
            setTimeout(() => {
              navigate("/testi/viewtesti")
            }, 2000);
          }
          else {  
            toast.error(finalres.error)
          }
    })

      // console.log(formtesti)
    }
  //   else {
      axios.post(`${apibaseurl}/testimonials/create`, formVal)
         .then((res) => res.data)
        .then((finalres) => {
           console.log(finalres)
          // if (finalres.status == 1) {
          //   console.log("final", finalres.data)
            toast.success(finalres.msg)
          //   setformtesti({
          //     testiName: "",  //for  page reset
          //     testicode: "",
          //     testiOrder: "",
          //   })
             setTimeout(() => {
               navigate("/testimonials/viewtestimonials")
             }, 2000);
          // }
          // else {
          //   toast.error(finalres.error)
          // }
         })
    }
    // console.log(formtesti)


   
  useEffect(() => {
    setformtesti(
      {
        testiName: "",
        testiOrder: "",
        testiDesignation: "",
        testiRating: "",
        testiMessage: ""
      }
    )
    if (id) {
      axios.get(`${apibaseurl}/testimonials/edit-testimonial/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          setformtesti({
            // testicode: finalRes.data,
            testiName: finalRes.testiData.testiName,
            testiOrder: finalRes.testiData.testiOrder,
            testiDesignation:finalRes.testiData.testiDesignation,
            testiRating:finalRes.testiData.testiRating,
            testiMessage:finalRes.testiData.testiMessage,
          })

         })
     }
  }, [id])
  let funObj=id? "Edit testimonials":"Add testimonials"
  return (
    <>
      <section className="border-1 shadow m-5">
        <ToastContainer />
        <div className="py-3">
          <h1 className="mx-3 justify-center font-bold text-2xl">Add testi</h1>
          <hr />
          <form onSubmit={Savetesti}>
            
            <h1 className="pt-2 mx-2 font-bold">testi Image</h1>

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
                  name='testiImage'
                  id="dropzone"
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Right side inputs */}
              <div className="py-2 text-1xl mx-3 w-full">
                <label className="font-bold mx-4"> Name</label>
                <input
                onChange={gettestiValue}
                value={formtesti.testiName}
                  name='testiName'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="testi"
                />

                <label className="font-bold mx-4">Designation</label>
                <input
                onChange={gettestiValue}
                value={formtesti.testiDesignation}
                  name='testiDesignation'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="Order"
                />
                 <label className="font-bold mx-4">Rating</label>
                <input
                onChange={gettestiValue}
                value={formtesti.testiRating}
                  name='testiRating'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="number"
                  placeholder="testi"
                />

                <label className="font-bold mx-4">Order</label>
                <input
                onChange={gettestiValue}
                value={formtesti.testiOrder}
                  name='testiOrder'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="number"
                  placeholder="Order"/>
                   <label className="font-bold mx-4">Message</label>
                <input
                onChange={gettestiValue}
                value={formtesti.testiMessage}
                   name='testiMessage'
                  className="border-1 w-[95%] rounded-md block my-2 mx-5 p-2"
                  type="text"
                  placeholder="testi"
                />

                
                 {/* <div className=' py-4  text-1xl m-4 w-[100%] '>
                <label className='font-bold mx-4'>testi Name</label>
                <input className=" border-1 w-[95%] rounded-md" name='testiName' 
               
              //  value={formData.testiName} 
               
              //   onChange={getValueSetvalue} 
                
                type="text" placeholder='testi'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />
                <label className='font-bold mx-4'>Designation</label>
                <input className=" border-1 w-[95%] rounded-md" name='testiDesignation' 
                // value={formData.testiDesignation} 
                // onChange={getValueSetvalue}
                type="text" placeholder='testi'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />
                <label className='font-bold mx-4'>Rating</label>
                <input className=" border-1 w-[95%] rounded-md" 
                // value={formData.testiRating} 
                // onChange={getValueSetvalue}
                name='testiRating' type="text" placeholder='testi'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />
                <label className='font-bold mx-4'>Order</label>
                <input className=" border-1 w-[95%] rounded-md" name='testiOrder'
                // value={formData.testiOrder}
                // onChange={getValueSetvalue}
                type="text" placeholder='testi'
                  style={{ display: "block", margin: "10px 20px", padding: "5px" }} />
                <label className='mx-4 pt-3 font-bold'>Message</label>
                <textarea className="border-1 w-[95%]" name="testiMessage" 
                // value={formData.testiMessage}
                // onChange={getValueSetvalue} 
                id=""
                  style={{ display: "block", margin: '0px 20px', padding: '20px' }} placeholder='Message'> </textarea>

              </div> */}
              </div> 

            </div>

            <button className="bg-purple-600 p-3 mt-9 mx-3 rounded-md text-white" type='submit'>
              {
                id ? "Edit Image":"Add Image"}
                
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
