import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import ResponsivePaginationComponent from "react-responsive-pagination";

export default function ViewProduct() {
  const [productData, setproductData] = useState([]);
  const [staticpath, setstaticpath] = useState("");
  const [ids, setids] = useState([])
  const [eallchecked, seteallchecked] = useState(false)
  let [currentPage, setcurrentPage] = useState(1)
  let [totalPages, settotalPages] = useState(0)
  let [limit, setlimit] = useState(5)


  // modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const apibaseurl = import.meta.env.VITE_APIBASEURL;

  const getproductData = () => {
    axios
      .get(`${apibaseurl}/product/view`, {
        params: {
          page: currentPage,
          limit
        }
      }
      )
      .then((res) => res.data)
      .then((finalRes) => {
        setproductData(finalRes.productCollection || []);
        setstaticpath(finalRes.staticPath || "");
        settotalPages(finalRes.totalpages)

      })
      .catch(() => toast.error("Error fetching products"));
  };


  useEffect(() => {
    getproductData();
  }, [currentPage, limit]);
  const allchecked = (e) => {
    if (e.target.checked) {
      setids(productData.map(v => v._id))
    } else {
      setids([])
    }
    seteallchecked(e.target.checked)
  }

  // Select individual checkbox
  const getchecked = (e) => {
    if (e.target.checked) {
      setids([...ids, e.target.value])
    } else {
      setids(ids.filter(v => v !== e.target.value))
    }
  }

  const handleReadMore = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  let multidelete = () => {
    if (ids.length >= 1)
      axios.post(`${apibaseurl}/product/multi-delete`, { ids })
        .then((res) => res.data)
        .then((finalRes) => {
          getproductData()
          setids([])
          console.log("success", finalRes.delRes)
          toast.success("delete successfully")
        })
  }

  return (
    <section className="m-4 rounded-md border bg-white">
      <ToastContainer />

      {/* HEADER */}
      <h1 className="border-b px-5 py-3 text-xl font-semibold text-gray-700 leading-tight">
        Product Items
      </h1>

      {/* TABLE WRAPPER (NO TOP GAP) */}
      <div className="px-5 pb-4 overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm text-gray-700 m-0 p-0">
          <thead>
            <tr className="border-b text-xs font-2xl text-gray-600">

              <th className=" flex px-2 py-2 text-left gap-2">
                <input 
                onChange={allchecked}
                checked={eallchecked}
                type="checkbox" />
                <h6>Select Box</h6>
              </th>
              <th className="px-2 py-2 text-left">S.NO.</th>
              <th className="px-2 py-2 text-left">PRODUCT NAME</th>
              <th className="px-2 py-2 text-left">DESCRIPTION</th>
              <th className="px-2 py-2 text-left">SHORT DESCRIPTION</th>
              <th className="px-2 py-2 text-left">THUMBNAILS</th>
              <th className="px-2 py-2 text-left">ACTION</th>
              <th className="px-2 py-2 text-left">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {productData.map((obj, index) => (
              <tr key={index} className="border-b align-top">
                <td className="px-2 py-2">

                  <input value={obj._id}
                    checked={ids.includes(obj._id)}
                  
                    onChange={getchecked}
                    type="checkbox" />
                </td>

                <td className="px-2 py-2">{index + 1}</td>

                <td className="px-2 py-2 font-medium">
                  {obj.productName}
                </td>

                <td className="px-2 py-2">
                  {obj.productDesc}...
                  <button
                    onClick={() => handleReadMore(obj)}
                    className="text-blue-600 text-xs ml-1"
                  >
                    Read More
                  </button>
                </td>

                <td className="px-2 py-2">
                  {obj.productDesc?.slice(0, 40)}...
                  <button
                    onClick={() => handleReadMore(obj)}
                    className="text-blue-600 text-xs ml-1"
                  >
                    Read More
                  </button>
                </td>

                <td className="px-2 py-2">
                  <img
                    src={
                      obj.productImage
                        ? `${staticpath}/${obj.productImage}`
                        : "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQMf4I3zDjYLpNnTyF4n33ejFP3YYb_4SOHD839ZynFNG0asAS-yOGYNMisGCrRlfL6fr7HCJbtck60PnaMGhWsYloryqTfTp2Hq3NvoF4Ir41ELL_Syn_yY4Q&usqp=CAc"
                    }
                    className="h-12 w-12   rounded-md object-cover over"
                    alt=""
                  />
                </td>

                <td className="px-2 py-2">
                  <div className="flex gap-3 text-lg">
                    <span>
                      <button
                        onClick={multidelete}><RiDeleteBin6Fill className="text-red-500 cursor-pointer" />
                      </button>
                    </span>
                    <span>
                      <Link to={`/product/edit/${obj._id}`} >
                        <button className="">< HiOutlinePencilSquare className='' /></button>
                      </Link>
                    </span>

                  </div>
                </td>

                <td className="px-2 py-2">
                  {
                    obj.productStatus ? (

                      <button className="bg-green-600 px-3 py-1 rounded-md text-white text-xs">Active
                      </button>
                    ) : (
                      <button className="bg-red-600 px-3 py-1 rounded-md text-white text-xs">Deactive
                      </button>

                    )
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          {/* MODAL BOX */}
          <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-lg">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl font-bold text-red-600"
            >
              ✕
            </button>

            {/* TWO COLUMN LAYOUT */}
            <div className="grid grid-cols-2 gap-6 p-6">

              {/* LEFT → IMAGES */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((_, i) => (
                  <img
                    key={i}
                    src={
                      selectedProduct.productImage
                        ? `${staticpath}/${selectedProduct.productImage}`
                        : "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQMf4I3zDjYLpNnTyF4n33ejFP3YYb_4SOHD839ZynFNG0asAS-yOGYNMisGCrRlfL6fr7HCJbtck60PnaMGhWsYloryqTfTp2Hq3NvoF4Ir41ELL_Syn_yY4Q&usqp=CAc"
                    }
                    className="w-full h-40 object-cover rounded-md"
                    alt=""
                  />
                ))}
              </div>

              {/* RIGHT → PRODUCT DETAILS */}
              <div className="flex flex-col justify-between">

                <div>
                  <h2 className="text-2xl font-semibold mb-3">
                    {selectedProduct.productName}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {selectedProduct.productDesc}
                  </p>
                </div>

                {/* EXTRA DETAILS BOX */}
                <div className="mt-6 p-4 border rounded-md bg-gray-50">
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Status: Active</li>
                    <li>• Category: shirt</li>
                    <li>{selectedProduct.actulPrice}</li>
                    <li>{selectedProduct.salePrice}</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
      <ResponsivePaginationComponent
        current={currentPage}
        total={totalPages}
        onPageChange={setcurrentPage}
      />

    </section>
  );
}
