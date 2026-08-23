// "use client"
// import { fetchCartData } from '@/app/redux/slice/cartslice';
// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react'
// import { MdDelete } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';

// export default function CartList() {

//     return (
//         <CartLIstView />
//     )
// }

// function CartLIstView() {
//         let token = useSelector((store) => store.user.token)

//         let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
//       let dispatch = useDispatch()
//     let { cart } = useSelector((store) => store.myCart)

//     useEffect(() => {
//         if (token) {
//             dispatch(fetchCartData(token))
//         }
//     }, [token])

//     // let changeQty = (pid, qty) => {
//     //     let changeMyQty = cart.filter((oldData) => {
//     //         if (oldData.id == pid) {
//     //             oldData['qty'] = qty
//     //         }
//     //         return oldData
//     //     })

//     //     setCart(changeMyQty)
//     // }

//     let deleteFromCart = (cartid) => {
//         if (confirm("Are?")) {
//             axios.post(`${apiBaseurl}cart/remove-cart`, { cartId:cartid }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             })
//             .then((apiRes) => apiRes.data)
//                 .then((finaldata) => {
//                     console.log(finaldata);
//                     dispatch(fetchCartData(token))


//                 })
//         }
//     }

//     return (
//         <div className='max-w-[1320px] mx-auto py-5'>
//             <table className="table-auto border-collapse border border-gray-400 w-full text-left">
//                 <thead className='bg-gray-100'>
//                     <tr>
//                         <th className='border border-gray-400 px-4 py-2'>Delete</th>
//                         <th className='border border-gray-400 px-4 py-2'>Image</th>
//                         <th className='border border-gray-400 px-4 py-2'>Product</th>
//                         <th className='border border-gray-400 px-4 py-2'>Price</th>
//                         <th className='border border-gray-400 px-4 py-2'>Quantity</th>
//                         <th className='border border-gray-400 px-4 py-2'>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         cart.map((data, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td className='border border-gray-400 px-4 py-2'><MdDelete className='text-red-700 text-2xl  cursor-pointer' onClick={(e) => deleteFromCart(data._id)} /></td>
//                                     <td className='border border-gray-400 px-4 py-2'><img className='w-[80px]' src={data.productImage} alt={data.prodcutTitle} /></td>
//                                     <td className='border border-gray-400 px-4 py-2'>{data.prodcutTitle}</td>
//                                     <td className='border border-gray-400 px-4 py-2'>Rs. {data.prodcutPrice}</td>
//                                     <td className='border border-gray-400 px-4 py-2 text-center'>{data.prodcutQty}</td>
//                                     <td className='border border-gray-400 px-4 py-2'>Rs. {data.prodcutPrice * data.prodcutQty}</td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//                 <tfoot>
//                     <tr>
//                         <td colSpan={5}></td>
//                         <td><button className='bg-amber-500 p-2 my-5 rounded cursor-pointer text-white'>Update Cart</button></td>
//                     </tr>
//                 </tfoot>

//             </table>
//         </div>
//     )
// }
"use client"

import { fetchCartData } from '@/app/redux/slice/cartslice';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

export default function CartList() {
    return (
        <CartLIstView />
    )
}

function CartLIstView() {

    let token = useSelector((store) => store.user.token)
    let { cart } = useSelector((store) => store.myCart)

    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    let dispatch = useDispatch()

    // ✅ coupon state
    let [couponCode, setCouponCode] = useState("")
    let [discount, setDiscount] = useState(0)

    useEffect(() => {
        if (token) {
            dispatch(fetchCartData(token))
        }
    }, [token])

    // ✅ subtotal calculation
    let subtotal = cart.reduce((total, item) => {
        return total + (item.productPrice * item.productQty)
    }, 0)

    // ✅ apply coupon
    let applyCoupon = () => {
        if (couponCode === "SAVE10") {
            setDiscount(subtotal * 0.1)
        } else {
            alert("Invalid Coupon")
            setDiscount(0)
        }
    }

    // ✅ delete cart item
    let deleteFromCart = (cartid) => {
        if (confirm("Are you sure?")) {
            axios.post(`${apiBaseurl}cart/remove-cart`,
                { cartId: cartid },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then((res) => {
                    dispatch(fetchCartData(token))
                })
        }
    }

    return (
        <div className='max-w-[1320px] mx-auto py-5 px-3'>

            {/* ================= TABLE ================= */}
            <div className='overflow-x-auto'>
            <table className="table-auto border-collapse border border-gray-400 w-full text-left min-w-[600px]">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='border px-4 py-2'>Delete</th>
                        <th className='border px-4 py-2'>Image</th>
                        <th className='border px-4 py-2'>Product</th>
                        <th className='border px-4 py-2'>Price</th>
                        <th className='border px-4 py-2'>Quantity</th>
                        <th className='border px-4 py-2'>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cart.length > 0 ? (
                            cart.map((data, index) => (
                                <tr key={index}>
                                    <td className='border px-4 py-2'>
                                        <MdDelete
                                            className='text-red-700 text-2xl cursor-pointer'
                                            onClick={() => deleteFromCart(data._id)}
                                        />
                                    </td>

                                    <td className='border px-4 py-2'>
                                        <img
                                            className='w-[80px]'
                                            src={data.productImage}
                                            alt={data.productTitle}
                                        />
                                    </td>

                                    <td className='border px-4 py-2'>
                                        {data.productTitle}
                                    </td>

                                    <td className='border px-4 py-2'>
                                        Rs. {}
                                    </td>

                                    <td className='border px-4 py-2 text-center'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <button
                                                onClick={() => {
                                                    if (data.productQty > 1) {
                                                        axios.post(`${apiBaseurl}cart/update-qty`, { cartId: data._id, qty: data.productQty - 1 }, { headers: { Authorization: `Bearer ${token}` } })
                                                            .then(() => dispatch(fetchCartData(token)))
                                                    }
                                                }}
                                                className='bg-gray-200 px-2 py-1 font-bold cursor-pointer'>-</button>
                                            <span>{data.productQty}</span>
                                            <button
                                                onClick={() => {
                                                    axios.post(`${apiBaseurl}cart/update-qty`, { cartId: data._id, qty: data.productQty + 1 }, { headers: { Authorization: `Bearer ${token}` } })
                                                        .then(() => dispatch(fetchCartData(token)))
                                                }}
                                                className='bg-gray-200 px-2 py-1 font-bold cursor-pointer'>+</button>
                                        </div>
                                    </td>

                                    <td className='border px-4 py-2'>
                                        Rs. {data.productPrice * data.productQty}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className='text-center py-5'>
                                    Cart is Empty
                                </td>
                            </tr>
                        )
                    }
                </tbody>

                <tfoot>
                    <tr>
                        <td colSpan={5}></td>
                        <td>
                            <button className='bg-amber-500 p-2 my-5 rounded text-white'>
                                Update Cart
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </div>


            {/* ================= COUPON + TOTAL ================= */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>

                {/* COUPON */}
                <div className='border p-5'>
                    <h2 className='bg-black text-white p-2 mb-3'>COUPON</h2>

                    <p className='mb-3'>
                        Enter your coupon code if you have one.
                    </p>

                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder='Coupon Code'
                        className='border p-2 w-full mb-3'
                    />

                    <button
                        onClick={applyCoupon}
                        className='bg-black text-white px-4 py-2'>
                        APPLY COUPON
                    </button>
                </div>


                {/* CART TOTAL */}
                <div className='border p-5'>
                    <h2 className='bg-black text-white p-2 mb-3'>CART TOTALS</h2>

                    <div className='flex justify-between mb-2'>
                        <span>Subtotal</span>
                        <span>Rs. {subtotal}</span>
                    </div>

                    <div className='flex justify-between mb-2'>
                        <span>Discount (-)</span>
                        <span>Rs. {discount}</span>
                    </div>

                    <hr />

                    <div className='flex justify-between mt-2 font-bold'>
                        <span>Total</span>
                        <span>Rs. {subtotal - discount}</span>
                    </div>
                </div>

            </div>

        </div>
    )
}