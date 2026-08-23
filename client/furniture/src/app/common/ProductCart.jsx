"use client"
import Link from 'next/link';
import React, { useContext, useRef, useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
// import { cartContext } from '../MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData } from '../redux/slice/cartslice';
import { addWishlist, removeWishlist } from '../redux/slice/wishlistslice';
import { gsap } from 'gsap';
import axios from 'axios';
import { redirect } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import { TotpSecret } from 'firebase/auth';

export default function ProductCart({ data,imagePath }) {

    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const overlayRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, { scale: 1.03, boxShadow: '0 20px 40px rgba(192,149,120,0.35)', duration: 0.35, ease: 'power2.out' });
        gsap.to(imgRef.current, { scale: 1.08, duration: 0.4, ease: 'power2.out' });
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { scale: 1, boxShadow: '0 4px 15px rgba(0,0,0,0.08)', duration: 0.35, ease: 'power2.inOut' });
        gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: 'power2.inOut' });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    };

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
    }, []);

    let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.user.token)

    // console.log(token);
    



    // let dispatch = useDispatch()

    let cart = useSelector((store) => store.myCart.cart)


    let dispatch = useDispatch();
    let wishlist = useSelector((store) => store.mywishlist.items);

    let liked = wishlist.find((item) => item._id === data._id);


    let chkItemInCart = cart.find((obj) => obj.productNameId == data._id)//Data single Object
    // let chkItemInCart=null

    let addToCart = () => {
        if (!token) {
            alert("Kindly Login First..!")
            return redirect("/login");
        }
        let cartObj = {
            pid: data._id,
            category: data.parentCategory._id,
            title: data.productName,
            img: imagePath + data.productImage,
            qty: 1,
            price: data.salePrice
        }
        axios.post(`${apiBaseurl}cart/add-to-cart`, cartObj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((apiRes) => apiRes.data)
            .then((finaldata) => {
                // console.log(finaldata);
                dispatch(fetchCartData(token))
            })
        // dispatch(addCart(cartObj))
        //setCart([cartObj,...cart])

    }


     let removeCart = () => {

        if (confirm("Are you sure you delete this ?")) {
            axios.post(`${apiBaseurl}cart/remove-cart`, { cartId: chkItemInCart._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
                .then((apiRes) => apiRes.data)
                .then((finaldata) => {
                    console.log(finaldata);
                    dispatch(fetchCartData(token))


                })
        }

    }

    let deleteData = () => { 
        dispatch(deleteCart({id:data.id})) 
    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative rounded-xl overflow-hidden bg-white'
            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}
        >
            {/* Gradient overlay on hover */}
            <div
                ref={overlayRef}
                className='absolute inset-0 z-0 pointer-events-none'
                style={{ opacity: 0, background: 'linear-gradient(135deg, rgba(192,149,120,0.12) 0%, rgba(255,255,255,0) 100%)' }}
            />

            <Link href={`/Product-us/${data.slug}`}>
                <div className='overflow-hidden bg-[#f9f5f2] h-[250px] flex items-center justify-center'>
                    <img ref={imgRef} src={imagePath + data.productImage} alt="" className='w-full h-[250px] object-contain' />
                </div>
                <div className='px-4 pt-3 pb-1 relative z-10'>
                    <h4 className='py-1 text-center text-sm font-medium text-gray-800 truncate'>{data.productName}</h4>
                    <h3 className='font-semibold text-center py-1 text-[#c09578] text-xs uppercase tracking-wide'>{data.parentCategory?.categoryName}</h3>
                    <hr className='my-2 border-0 h-[1px] bg-gradient-to-r from-transparent via-[#c09578] to-transparent' />
                    <div className='py-2 text-center'>
                        <span className='line-through text-gray-400 text-sm mr-2'>Rs. {data.actulPrice}</span>
                        <span className='text-[#c09578] font-bold'>Rs. {data.salePrice}</span>
                    </div>
                </div>
            </Link>

            <div className='pb-4 flex justify-center gap-2 relative z-10'>
                <button onClick={() => liked ? dispatch(removeWishlist(data._id)) : dispatch(addWishlist(data))} className='bg-[#f9f5f2] hover:bg-[#c09578] hover:text-white transition-colors px-3 py-2 rounded-lg cursor-pointer'>
                    <FaHeart className={liked ? 'text-red-500' : 'text-gray-400'} />
                </button>
                {
                    chkItemInCart ?
                        <button onClick={removeCart} className='bg-red-500 hover:bg-red-600 transition-colors px-4 py-2 rounded-lg cursor-pointer text-white text-sm'>Remove</button>
                        :
                        <button onClick={addToCart} className='bg-[#c09578] hover:bg-[#a07858] transition-colors px-4 py-2 rounded-lg cursor-pointer text-white text-sm'>Add To Cart</button>
                }
            </div>
        </div>
    )
}