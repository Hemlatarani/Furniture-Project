// "use client";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { fetchCartData } from "@/app/redux/slice/cartslice";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { useRazorpay } from "react-razorpay";
// import { toast } from "react-toastify";

// export default function Checkout() {

//   let { Razorpay } = useRazorpay()
//   let [paymenttype, setPaymentType] = useState(1);
//   let router = useRouter();

//   let dispatch = useDispatch()
//   let token = useSelector((store) => store.user.token);
//   let userId = useSelector((store) => store.user.user?.id);
//   let cartData = useSelector((store) => store.myCart.cart);
//   let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCartData(token))
//     }
//   }, [token])

//   let [ShippingAddres, setShippingAddres] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     city: "",
//     address: "",
//     postalCode: "",
//   });

//   let cart = cartData.map((obj) => {
//     return {
//       productImg: obj.productImage,
//       productPrice: obj.productPrice,
//       title: obj.productTitle,
//       category: obj.category?.categoryName,
//       productQty: obj.productQty,
//     };
//   });

//   let orderAmount = cartData.reduce(
//     (t, obj) => (t += (obj.productPrice || 0) * (obj.productQty || 0)),
//     0
//   );

//   let totQty = cartData.reduce((t, obj) => (t += obj.productQty || 0), 0);

//   let getValueSetvalue = (e) => {
//     let obj = { ...ShippingAddres };
//     obj[e.target.name] = e.target.value;
//     setShippingAddres(obj);
//   };

//   let saveOrder = (e) => {
//     e.preventDefault();

//     let orderObj = {
//       id: userId,
//       orderItem: cart,
//       shippingAddress: ShippingAddres,
//       paymentMethod: String(paymenttype),
//       orderAmount: orderAmount,
//       orderQty: totQty,
//     };

//     axios
//       .post(`${apiBaseurl}order/order-save`, orderObj, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((apiRes) => apiRes.data)
//       .then((finaldata) => {
//         if (finaldata.status) {
//           if (paymenttype == 1) {
//             toast.success("Order placed successfully!")
//             router.push("/order-success");
//           } else {
//             const RazorpayOrderOptions = {
//               key: "rzp_test_ShFRuqJ1TqbRgi",
//               amount: finaldata.orderRes.amount,
//               currency: "INR",
//               name: "HR company ",
//               description: "HR company Transaction",
//               order_id: finaldata.orderRes.id,
//               handler: async (response) => {
//                 axios.post(`${apiBaseurl}order/verify-order`, response, {
//                   headers: { Authorization: `Bearer ${token}` }
//                 })
//                   .then((res) => res.data)
//                   .then((finalRes) => {
//                     if (finalRes.status) {
//                       router.push("/order-success")
//                     }
//                   })
//               },
//               prefill: {
//                 name: "John Doe",
//                 email: "john.doe@example.com",
//                 contact: "9999999999",
//               },
//               theme: {
//                 color: "#4ace32",
//               },
//             }
//             const razorpayInstance = new Razorpay(RazorpayOrderOptions);
//             razorpayInstance.open();
//           }
//         }
//       })
//       .catch((err) => {
//         console.log("Order error:", err.response?.data || err.message);
//       });
//   };

//   return (
//     <div>
//       <form className="space-y-4" onSubmit={saveOrder}>
//         <div className=" max-w-[1320px] mx-auto px-4 py-8">
//           <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//               <div className="grid grid-cols-2 gap-4 my-2">
//                 <input type="text" name="firstName" placeholder="First Name" className="p-2 border rounded" onChange={getValueSetvalue} />
//                 <input type="text" name="lastName" placeholder="Last Name" className="p-2 border rounded" onChange={getValueSetvalue} />
//               </div>
//               <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded my-2" onChange={getValueSetvalue} />
//               <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded my-2" onChange={getValueSetvalue} />
//               <div className="grid grid-cols-2 gap-4">
//                 <input type="text" name="city" placeholder="City" className="p-2 border rounded" onChange={getValueSetvalue} />
//                 <input type="text" name="postalCode" placeholder="Postal Code" className="p-2 border rounded" onChange={getValueSetvalue} />
//               </div>
//               <div className="space-y-2 mt-4">
//                 <h3 className="font-semibold">Payment Method</h3>
//                 <div className="flex items-center space-x-4">
//                   <label className="flex items-center">
//                     <input type="radio" name="payment" className="mr-2" onChange={() => setPaymentType(1)} />
//                     COD
//                   </label>
//                   <label className="flex items-center">
//                     <input type="radio" name="payment" className="mr-2" onChange={() => setPaymentType(2)} />
//                     Online
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({totQty} items)</span>
//                   <span>₹{orderAmount}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>Free</span>
//                 </div>
//                 <div className="border-t pt-4 font-bold flex justify-between">
//                   <span>Total</span>
//                   <span>₹{orderAmount}</span>
//                 </div>
//                 <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//                   Place Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { fetchCartData } from "@/app/redux/slice/cartslice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";

export default function Checkout() {

  let { Razorpay } = useRazorpay();
  let [paymenttype, setPaymentType] = useState(1);
  let router = useRouter();

  let dispatch = useDispatch();
  let token = useSelector((store) => store.user.token);
  let userId = useSelector((store) => store.user.user?.id);
  let cartData = useSelector((store) => store.myCart.cart);
  let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL;

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData(token));
    }
  }, [token]);

  let [ShippingAddres, setShippingAddres] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
  });

  let cart = cartData.map((obj) => {
    return {
      productImg: obj.productImage,
      productPrice: obj.productPrice,
      title: obj.productTitle,
      category: obj.category?.categoryName,
      productQty: obj.productQty,
    };
  });

  let orderAmount = cartData.reduce(
    (t, obj) => (t += (obj.productPrice || 0) * (obj.productQty || 0)),
    0
  );

  let totQty = cartData.reduce((t, obj) => (t += obj.productQty || 0), 0);

  let getValueSetvalue = (e) => {
    let obj = { ...ShippingAddres };
    obj[e.target.name] = e.target.value;
    setShippingAddres(obj);
  };

  let saveOrder = (e) => {
    e.preventDefault();

    let orderObj = {
      id: userId,
      orderItem: cart,
      shippingAddress: ShippingAddres,
      paymentMethod: String(paymenttype),
      orderAmount: orderAmount,
      orderQty: totQty,
    };

    axios
      .post(`${apiBaseurl}order/order-save`, orderObj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((apiRes) => apiRes.data)
      .then((finaldata) => {

        if (finaldata.status) {

          // ================= COD =================
          if (paymenttype == 1) {
            toast.success("Order placed successfully!");
            router.push("/order-success");
            
          }
          
          // ================= ONLINE PAYMENT =================
          else {
            
            const RazorpayOrderOptions = {
              key: "rzp_test_ShFRuqJ1TqbRgi",
              amount: finaldata.orderRes.amount,
              currency: "INR",
              name: "HR Company",
              description: "Order Payment",
              order_id: finaldata.orderRes.id,
              
              handler: async (response) => {
                console.log("saveorder",apiBaseurl)
                
                // ✅ CHANGE: id add kiya (bahut important)
                axios.post(`${apiBaseurl}order/verify-order`, {
                  ...response,
                  id: userId
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => res.data)
                .then((finalRes) => {

                  if (finalRes.status) {

                    // ✅ CHANGE: user ko feedback
                    toast.success("Payment Successful & Email Sent ✅");

                    router.push("/order-success");
                  } else {
                    toast.error("Payment verification failed ❌");
                  }

                })
                .catch((err) => {
                  console.log("Verify error:", err);
                  toast.error("Something went wrong ❌");
                });
              },

              prefill: {
                name: ShippingAddres.firstName + " " + ShippingAddres.lastName,
                email: ShippingAddres.email,
                contact: "9999999999",
              },

              theme: {
                color: "#4ace32",
              },
            };

            const razorpayInstance = new Razorpay(RazorpayOrderOptions);
            razorpayInstance.open();
          }
        }

      })
      .catch((err) => {
        console.log("Order error:", err.response?.data || err.message);
        toast.error("Order failed ❌");
      });
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={saveOrder}>
        <div className="max-w-[1320px] mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ================= SHIPPING ================= */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

              <div className="grid grid-cols-2 gap-4 my-2">
                <input type="text" name="firstName" placeholder="First Name"
                  className="p-2 border rounded" onChange={getValueSetvalue} />

                <input type="text" name="lastName" placeholder="Last Name"
                  className="p-2 border rounded" onChange={getValueSetvalue} />
              </div>

              <input type="email" name="email" placeholder="Email"
                className="w-full p-2 border rounded my-2"
                onChange={getValueSetvalue} />

              <input type="text" name="address" placeholder="Address"
                className="w-full p-2 border rounded my-2"
                onChange={getValueSetvalue} />

              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" placeholder="City"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue} />

                <input type="text" name="postalCode" placeholder="Postal Code"
                  className="p-2 border rounded"
                  onChange={getValueSetvalue} />
              </div>

              <div className="space-y-2 mt-4">
                <h3 className="font-semibold">Payment Method</h3>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="payment"
                      className="mr-2"
                      defaultChecked
                      onChange={() => setPaymentType(1)} />
                    COD
                  </label>

                  <label className="flex items-center">
                    <input type="radio" name="payment"
                      className="mr-2"
                      onChange={() => setPaymentType(2)} />
                    Online
                  </label>
                </div>
              </div>
            </div>

            {/* ================= SUMMARY ================= */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totQty} items)</span>
                  <span>₹{orderAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-t pt-4 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₹{orderAmount}</span>
                </div>

                <button type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Place Order
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}