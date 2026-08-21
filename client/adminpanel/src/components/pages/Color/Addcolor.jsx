import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


export default function AddColor() {
  let { id } = useParams()// return obj

  let navigate = useNavigate()

  let apibaseurl = import.meta.env.VITE_APIBASEURL
  // console.log(apibaseurl);
  let [formcolor, setformcolor] = useState({
    colorName: "",
    colorCode: "",
    colorOrder: "",
  })


  let getValueSetvalue = (e) => {
    let obj = { ...formcolor }
    let inputName = e.target.name
    let inputvalue = e.target.value
    obj[inputName] = inputvalue
    setformcolor(obj)
  }

  let colorSave = (e) => {
    e.preventDefault()
    if (id) {
      axios.put(`${apibaseurl}/color/update/${id}`, formcolor)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status == 1) {
            // console.log("final", finalres.data)
            toast.success(finalres.msg)
            setformcolor({
              colorName: "",  //for  page reset
              colorCode: "#000000",
              colorOrder: "",
            })
            setTimeout(() => {
              navigate("/color/view")
            }, 2000);
          }
          else {
            toast.error(finalres.errorMessage)
          }
        })

      // console.log(formcolor)
    }
    else {
      axios.post(`${apibaseurl}/color/create`, formcolor)
        .then((res) => res.data)
        .then((finalres) => {
          if (finalres.status == 1) {
            // console.log("final", finalres.data)
            toast.success(finalres.msg)
            setformcolor({
              colorName: "",  //for  page reset
              colorCode: "#000000",
              colorOrder: "",
            })
            setTimeout(() => {
              navigate("/color/view")
            }, 2000);
          }
          else {
            toast.error(finalres.errorMessage)
          }
        })
    }
    // console.log(formcolor)
  }


  useEffect(() => {
    setformcolor(
      {
        colorName: "",
        colorCode: "",
        colorOrder: "",
      }
    )
    if (id) {
      axios.get(`${apibaseurl}/color/edit-color/${id}`)
        .then((res) => res.data)
        .then((finalRes) => {
          // console.log(finalRes)
          setformcolor({
            // colorcode: finalRes.data,
            colorName: finalRes.colorData.colorName,
            colorCode: finalRes.colorData.colorCode,
            colorOrder: finalRes.colorData.colorOrder,
          })

        })
    }
  }, [id])
  let funObj = id ? "Edit color" : "Add color";
  return (
    <form onSubmit={colorSave} className="border-1 m-5 rounded-lg">
      <ToastContainer />


      <h2 className="border-b py-2 mx-2 font-bold">{funObj}</h2>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>

        <label className="font-bold ">Color Name</label>
        <input
          onChange={getValueSetvalue}
          value={formcolor.colorName}


          // onChange={(e)=>{
          //   let obj={...formcolor}
          //   obj['colorName']=e.target.value
          //   setformcolor(obj)
          // }} name="colorName" 

          //double methed se kr skte h
          name="colorName"
          className="border-1 w-[100%]"
          type="text"
          placeholder="Enter Color Name"
          style={{ display: "block", margin: "10px 0", padding: "5px" }}
        />

        <label name="colorCode">Color Picker</label>
        <input type="color" name="colorCode"

          onChange={getValueSetvalue}
          value={formcolor.colorCode}

          className="border  w-[100%]"
        />




        {/* let obj={...formcolor}
            obj['colorcode']=e.target.value
            setformcolor(obj)
          }}
          
         value={formcolor.colorcode}
          
            color={formcolor.colorcode}
           onChange={(updatedColor) => {
            //   setColor(updatedColor.hex); */}
        {/* setformcolor({ ...formcolor, colorcode: updatedColor.hex }); */}
        {/* }} */}

        {/* <label>Color Picker</label>
        <div className="flex">
          <ChromePicker
            color={formcolor.colorcode}
            onChange={(updatedColor) => {
              setColor(updatedColor.hex);
              setformcolor({ ...formcolor, colorcode: updatedColor.hex });
            }}
          />
          <div
            className="mx-3 mt-10"
            style={{
              marginTop: "20px",
              width: "80px",
              height: "80px",
              backgroundColor: color,
              border: "1px solid #ccc",
            }}
          ></div>
        </div> */}

        <label>Order</label>
        <input

          onChange={getValueSetvalue}
          value={formcolor.colorOrder}



          // onChange={(e)=>{
          //   let obj={...formcolor}
          //   obj['colorOrder']=e.target.value
          //   setformcolor(obj)
          // }}
          name="colorOrder"


          className="border-1 w-[100%]"
          type="number"
          placeholder="Enter Order"
          style={{ display: "block", margin: "10px 0", padding: "5px" }}
        />


      </div>

      <button className="p-2 m-3 border-1 rounded-lg bg-purple-600">{id ?
        "Edit color " : "Add color"

      }</button>
    </form>
  );
}

