// import React, { useState } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFileArrowDownFill } from "react-icons/bs";





export default function AddProduct() {
  // let NO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
  // let [Image, setImage] = useState(null);



  let previewImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

  const [productImage, setProductImage] = useState(previewImage);
  const [backImage, setBackImage] = useState(previewImage);
  const [galleryImages, setGalleryImages] = useState([]);




  let apibaseurl = import.meta.env.VITE_APIBASEURL
  let [parentData, setparentData] = useState([])
  let [subcateData, setsubcateData] = useState([])
  let [subsubcateData, setsubsubcateData] = useState([])
  let [colors, setcolors] = useState([])
  let [materData, setmaterData] = useState([])
  // let [productImage, setproductImage] = useState([])
  let [backtImage, setbackImage] = useState([])
  let [galleryImage, setgalleryImage] = useState([])
  const [productDesc, setproductDesc] = useState('');


  let productSave = (e) => {
    e.preventDefault()
    let formValue = new FormData(e.target)
    if (productImage) {
      formValue.append("productImage", productImage)
    }

    if (backtImage) {
      formValue.append("backImage", backtImage)
    }

    galleryImage.forEach((file) => {
      formValue.append("productGallery", file)
    })

    axios.post(`${apibaseurl}/product/create`, formValue)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log("product adding",finalRes)
      })

  }

  let getparentcateData = () => {
    axios.get(`${apibaseurl}/product/parent-category`)
      .then((res) => res.data)
      .then((finalRes) => {
        setparentData(finalRes.categoryData)
        // console.log("PARENT API:", finalRes.categoryData);

      })
  }
  let getsubcategoryData = (sid) => {
    axios.get(`${apibaseurl}/subsubcategory/sub-category/${sid}`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log("sub cate data=>", finalRes.subcategoryyData)
        setsubcateData(finalRes.subcategoryyData)
        // console.log("helloooo",finalRes.subcateData)

      })
  }
  let getsubsubCategoryData = (sId) => {
    axios.get(`${apibaseurl}/product/sub-subcategory/${sId}`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.subsubcategoryData)
        setsubsubcateData(finalRes.subsubcategoryData)
      })
  }
  let getColorsData = () => {
    axios.get(`${apibaseurl}/product/colors`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.ColorData)
        setcolors(finalRes.ColorData)
      })
  }
  let materialsData = () => {
    axios.get(`${apibaseurl}/product/material`)
      .then((res) => res.data)
      .then((finalREs) => {
        // console.log(finalREs.mateData)
        setmaterData(finalREs.mateData)
      })
  }

  useEffect(() => {
    getparentcateData()
    getColorsData()
    // console.log("heloo")
    materialsData()
  }, [])
  return (
    <section className="border   rounded-md bg-white shadow m-5 p-5 bg-gradient-to-tr from-red-100 via-green-200 to-yellow-100 from-red-100 via-green-50 to-yellow-50 ">
      {/* <h1 className="font-bold text-2xl mb-4 bg-green-200 text-center text-green-800 text-5xl underline-dashed">ADD PRODUCT</h1> */}
      <h1 className="font-bold text-5xl mb-4 text-center  font-serif
            bg-gradient-to-r from-red-500 via-green-500 to-blue-500
             bg-clip-text text-transparent
            border-b-4 border-dashed border-pink-500 inline-block">
        ADD PRODUCT
      </h1>


      <hr />

      <form onSubmit={productSave}>
        {/* FULL GRID */}
        <div className="grid grid-cols-[30%_70%] gap-3 mt-6">
          {/* LEFT COLUMN – IMAGE BOXES */}

          <div className="mx-2">

            {/* Product Image */}

            <h2 className="font-semibold text-2xl">Product Image</h2>


            <div className="border relative h-[200px] w-full  mb-5">

              <span onClick={(e) => setProductImage(previewImage)} className='text-[30px] cursor-pointer text-[purple] absolute right-5'>&times;</span>


              {/* CLICKABLE IMAGE AREA */}
              <label htmlFor="productImage" className="block h-full w-full cursor-pointer">

                {/* HIDDEN FILE INPUT */}

                <input type="file" id="productImage" name='productImage' hidden onChange={(e) => setProductImage(URL.createObjectURL(e.target.files[0]))} />



                <img src={productImage} alt="No Image" className="h-full w-full " />



              </label>

            </div>

            {/* Back Image */}
            <h2 className="font-semibold text-2xl mt-4">Back Image</h2>


            <div className="border relative h-[200px] w-full  mb-5">

              <span onClick={(e) => setBackImage(previewImage)} className='text-[30px] cursor-pointer text-[purple] absolute right-5'>&times;</span>


              {/* CLICKABLE IMAGE AREA */}
              <label htmlFor="backImage" className="block h-full w-full cursor-pointer">

                {/* HIDDEN FILE INPUT */}

                <input type="file" id="backImage" name='backImage' hidden onChange={(e) => setBackImage(URL.createObjectURL(e.target.files[0]))} />



                <img src={backImage} alt="No Image" className="h-full w-full " />



              </label>

            </div>

            {/* Gallery Image */}
            <h2 className="font-semibold text-2xl mt-4">Gallery Image</h2>
            <div className="border relative h-[200px] w-full overflow-hidden mb-5">

              <span
                onClick={() => setGalleryImages([])}
                className="text-[30px] cursor-pointer text-[purple] absolute right-5 z-10"
              >
                &times;
              </span>

              <label className="block h-full w-full cursor-pointer">

                <input
                  type="file"
                  multiple
                  name="galleryImage"
                  hidden
                  onChange={(e) => {
                    const files = [...e.target.files];
                    setGalleryImages(files); // real files
                    setGalleryImages(files.map(file => URL.createObjectURL(file))); // previews
                  }}
                />


                {galleryImages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Click to upload images
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 p-2">
                  {galleryImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="h-20 w-full object-cover rounded"
                    />
                  ))}
                </div>

              </label>
            </div>



          </div>
          {/* CENTER COLUMN – MAIN INPUTS */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-0">
            <div className="space-y-0">
              <label className="font-semibold">Product Name</label>
              <input
                name="productName"
                className="border p-2 w-full  rounded-md bg-white bg-white"
                type="text"
                placeholder="product"
              />
            </div>

            <div className="space-y-0">
              <label className="font-semibold block">Sub Parent Category</label>
              <select
                onChange={(e) => getsubcategoryData(e.target.value)}

                className="border-1 py-2 w-full  rounded-md bg-white bg-white" name="parentCategory" id="">

                <option value={true}>Nothing Select</option>
                {parentData.map((Obj, index) => {
                  return (
                    <option value={Obj._id}>{Obj.categoryName}</option>
                  )

                })}
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Select Sub Category</label>
              <select
                onChange={(e) => getsubsubCategoryData(e.target.value)}

                className="border-1 py-2 w-full  rounded-md bg-white bg-white" name="subCategoryData" id="">
                <option value="">Nothing Select </option>

                {subcateData.map((Obj) => {
                  return (
                    <option value={Obj._id}>
                      {Obj.subcategoryName}
                    </option>
                  )

                })}
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Select Sub Sub Category</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white " name="subsubCategoryData" id="">
                <option value={true}>Nothing Select</option>
                {
                  subsubcateData.map((Obj, index) => {
                    return (
                      <option value={Obj._id}>{Obj?.subsubcategoryName}</option>

                    )
                  })
                }

              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Select Material</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white" name="productMaterial" id="">
                <option>Nothing Select</option>
                {
                  materData.map((mateObj, index) => {
                    return (

                      <option value={mateObj._id}>{mateObj.materialName}</option>
                    )
                  })
                }

              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Select Color</label>
              <select
                // multiple
                size="1"

                className="border-1 py-2 w-full  rounded-md bg-white" name="productColor" id="">

                <option>Nothing Select</option>
                {
                  colors.map((Cobj, index) => {
                    return (
                      <option value={Cobj._id} >{Cobj.colorName}</option>

                    )
                  })
                }

              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Select Product Type</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white" name="productType" id="">
                <option value="">Nothing Select</option>
                <option value="Featured">Featured</option>
                <option value="New Arrivals">New Arrivals</option>
                <option value="Onsale">Onsale</option>
                <option value="Best Selling">Best Selling</option>
                <option value="Premium">Premium</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Hot Deal">Hot Deal</option>
                <option value="Flash Sale">Flash Sale</option>
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Is Best Selling</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white" name="isSelling" id="">
                <option value="">Nothing Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Is Top Rated</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white" name="topRated" id="">
                <option value="">Nothing Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Is Upsell</label>
              <select className="border-1 py-2 w-full  rounded-md bg-white" name="isUpsell" id="">
                <option value="">Nothing Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Actual Price</label>
              <input
                className="border p-2 w-full  rounded-md bg-white"
                name="actulPrice"
                type="text"
                placeholder="Product Name"
              />
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Sale Price</label>
              <input
                className="border p-2 w-full  rounded-md bg-white"
                name="salePrice"
                type="text"
                placeholder="Product Name"
              />
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Total in Stocks</label>
              <input
                className="border p-2 w-full  rounded-md bg-white"
                name="isStock"
                type="text"
                placeholder="Product Name"
              />
            </div>

            <div className="space-y-0">
              <label className="font-semibold">Order</label>
              <input
                className="border p-2 w-full  rounded-md bg-white"
                name="productOrder"
                type="text"
                placeholder="Product Name"
              />
            </div>
          </div>
        </div>


        <div className="mt-6">
          <label className="font-semibold text-lg" name="productDesc" >Description</label>

          {/* Toolbar */}
          <div className="border p-2 flex items-center gap-2 mt-2">

            {/* NORMAL DROPDOWN */}
            <select className="border px-2 py-1  rounded-md bg-white">
              <option>Normal</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>

            {/* DIVIDER */}
            <span className="mx-2">|</span>

            {/* Buttons */}
            <button className="border px-2 py-1 rounded">B</button>
            <button className="border px-2 py-1 rounded italic">I</button>
            <button className="border px-2 py-1 rounded underline">U</button>

            {/* Link */}
            <button className="border px-2 py-1 rounded">🔗</button>

            {/* Unordered List */}
            <div>
              <button className="border px-2 py-1 rounded dropdown-content">list</button>
              <ul name="" id="">

                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
              </ul>

            </div>


            {/* Ordered List */}
            <button className="border px-2 py-1 rounded">1.</button>

            {/* Text Color */}
            <button className="border px-2 py-1 rounded">Tx</button>

          </div>

          {/* TEXT AREA BOX */}
          <textarea
            className="w-full border p-3  rounded-md bg-white min-h-[200px] mt-1"
            name="productDesc"
            placeholder="Write description here..."
          ></textarea>
        </div>


        <button className="mt-6 bg-purple-600 text-black px-5 py-2  rounded-md bg-white cursor-pointer">
          Add Product
        </button>
      </form>
    </section>
  );
}
