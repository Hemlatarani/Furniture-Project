import React, { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { GrView } from 'react-icons/gr'
import { RiDashboardFill } from "react-icons/ri"
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoChatboxSharp } from "react-icons/io5";
import { FaRegDotCircle } from "react-icons/fa";
import { BsFillDropletFill } from "react-icons/bs";
import { GiGothicCross } from "react-icons/gi"
import { FiAlignRight } from "react-icons/fi";
import { GiBackwardTime } from "react-icons/gi";
import { FaSliders } from "react-icons/fa6";
import { MdOutlineBorderColor } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoIosChatboxes } from "react-icons/io";














export default function Sidebar() {
  
  let [dMenu,setdMenu] =useState(0)


  return (
    <div className=" overflow-y-scroll h-screen border-2  ">
      <figure className=' border-b-2'>
        <img src="https://www.wscubetech.com/images/wscube-tech-logo-2.svg" alt="" className='' />
      </figure>
      <ul className='mx-4'>
        <li>
          <Link to={"/dashboard"} className='flex items-center gap-2 p-2'>
          <RiDashboardFill />Dashboard
          </Link>
        </li>
      </ul>
      {/* <ul className='mx-4'>
        <li>
          <Link to={"/profile"} className='flex items-center gap-2 p-2'>
          <RiDashboardFill />Profile
          </Link>
        </li>
      </ul> */}
      <ul className='mx-5 pt-2 pb-2'>
        <li >
          <Link onClick={()=>setdMenu(dMenu==1 ? 0 : 1 )} className='flex items-center  '>
           < BiUser/>User { dMenu==1 ?  <IoIosArrowUp/> : <IoIosArrowDown />} </Link>
           <ul className={`${dMenu==1 ? '' : "hidden"}`}>
            <li>
              <Link to={'/user'} className='flex items-center gap-2'>
              <GrView/>View</Link>
            </li> 
           </ul>
        </li>
      </ul>
      <ul className='mx-5'> 
        <li>
          <Link onClick={()=>setdMenu(dMenu==2 ? 0: 2)} className='flex items-center gap-2 ' >
         <IoChatboxSharp />Enqyiry { dMenu==2 ? <IoIosArrowUp/> : <IoIosArrowDown />} </Link>
         <ul className={`${dMenu==2 ? '': "hidden"}`}>
          <li>
            <Link to={'/Enquiry/contact'} className='flex items-center gap-2'> <FaRegDotCircle /> Contact Enquiry </Link>
          </li>
          <li>
            <Link to={'/Enquiry/newsletter'}className='flex items-center gap-2'> <FaRegDotCircle /> Newsletter</Link> 
            </li>
         </ul>
        </li>
      </ul> 
       <ul className='mx-5 py-3'> 
        <li>
          <Link onClick={()=>setdMenu(dMenu===3 ? 0: 3)} className='flex items-center gap-2 ' >
         <BsFillDropletFill /> Colors { dMenu===3 ? <IoIosArrowUp/> : <IoIosArrowDown />} </Link>
         <ul className={`${dMenu==3 ? '': "hidden"}`}>
          <li>
            <Link to={'/color/add'} className='flex items-center gap-2'> <FaRegDotCircle /> Addcolors </Link>
          </li>
          <li>
            <Link to={'/color/view'}className='flex items-center gap-2'> <FaRegDotCircle />Viewcolors</Link> 
            </li>
         </ul>
        </li>
      </ul> 
      <ul className='mx-5'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==4 ? 0:4)} className='flex items-center gap-2'>
      <GiGothicCross />Material{ dMenu===4 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==4 ? '' :"hidden"}`}>
        <li>
          <Link to={'/material/addmaterial'} className='flex items-center gap-2'> <FaRegDotCircle />Addmaterial</Link>
        </li>
        <li>
          <Link to={'/material/viewmaterial'}  className='flex items-center gap-2'> <FaRegDotCircle /> Viewmaterial</Link>

        </li>
      </ul>
        </li>
      </ul>
      
        <ul className='mx-5 py-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==5 ? 0:5)} className='flex items-center gap-2'>
      <FiAlignRight />Category{ dMenu===5 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==5 ? '' :"hidden"}`}>
        <li>
          <Link to={'/category/addcategory'} className='flex items-center gap-2'> <FaRegDotCircle />Addcategory</Link>
        </li>
        <li>
          <Link to={'/category/viewcategory'}  className='flex items-center gap-2'> <FaRegDotCircle />Viewcategory </Link>

        </li>
      </ul>
        </li>
      </ul>
      <ul className='mx-5 '>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==6 ? 0:6)} className='flex items-center gap-2'>
      <FiAlignRight />SubCategory{ dMenu===6 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==6 ? '' :"hidden"}`}>
        <li>
          <Link to={'/subcategory/addsubcategory'} className='flex items-center gap-2'> <FaRegDotCircle />Addsubcategory</Link>
        </li>
        <li>
          <Link to={'/subcategory/viewsubcategory'}  className='flex items-center gap-2'> <FaRegDotCircle />Viewsubcategory </Link>

        </li>
      </ul>
        </li>
      </ul>
       <ul className='mx-5 pt-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==7 ? 0:7)} className='flex items-center gap-2'>
      <FiAlignRight />SubSubCategory{ dMenu===7 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==7 ? '' :"hidden"}`}>
        <li>
          <Link to={'/subsubcategory/addsubsubcategory'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>Add sub sub category</Link>
        </li>
        <li>
          <Link to={'/subsubcategory/viewsubsubcategory'}  className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>View sub sub category </Link>

        </li>
      </ul>
        </li>
      </ul>
      <ul className='mx-5 pt-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==8 ? 0:8)} className='flex items-center gap-2'>
      <FiAlignRight />Product{ dMenu===8 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==8 ? '' :"hidden"}`}>
        <li>
          <Link to={'/product/addproduct'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>Add Product</Link>
        </li>
        <li>
          <Link to={'/product/viewproduct'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>View Product</Link>

        </li>
      </ul>
        </li>
      </ul>
       <ul className='mx-5 pt-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==9 ? 0:9)} className='flex items-center gap-2'>
      <GiBackwardTime/>Why choose us{ dMenu===9 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==9 ? '' :"hidden"}`}>
        <li>
          <Link to={'/wchoose/addchoose'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>Add choose</Link>
        </li>
        <li>
          <Link to={'/wchoose/viewchoose'}  className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>View choose</Link>

        </li>
      </ul>
        </li>
      </ul>
      <ul className='mx-5 pt-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==10 ? 0:10)} className='flex items-center gap-2'>
       <MdOutlineBorderColor />Order{ dMenu===10 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==10 ? '' :"hidden"}`}>
        <li>
          <Link to={'/Order/orderlist'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>Orderlist</Link>
        </li>
       
      </ul>
        </li>
      </ul>
      <ul className='mx-5 pt-3'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==11 ? 0:11)} className='flex items-center gap-2'>
    <FaSliders />Slider{ dMenu===11 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
      <ul className={`${dMenu==11 ? '' :"hidden"}`}>
        <li>
          <Link to={'/slider/addslider'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>Add slider</Link>
        </li>
         <li>
          <Link to={'/slider/viewslider'} className='flex items-center gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/>View slider</Link>
        </li>
       
      </ul>
        </li>
      </ul>
      <ul className='mx-5 pt-4'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==12 ? 0:12)} className='flex items-center gap-2'>
         <FaLocationArrow /> Country {dMenu==12 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
         <ul className={`${dMenu==12 ? '':'hidden'}`}>
          <li>
            <Link to={'/Country/addcountry'} className='flex items-cneter gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/> Add country</Link>
          </li>
          <li>
            <Link to={'/Country/viewcountry'} className='flex items-cneter gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/> View country</Link>
          </li>
         </ul>
         
        </li>
      </ul>
        <ul className='mx-5 pt-4'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==13 ? 0:13)} className='flex items-center gap-2'>
         <MdManageAccounts /> Testimonials {dMenu==13 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
         <ul className={`${dMenu==13 ? '':'hidden'}`}>
          <li>
            <Link to={'/testimonials/addtestimonials'} className='flex items-cneter gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/> Add Testimonials</Link>
          </li>
          <li>
            <Link to={'/testimonials/viewtestimonials'} className='flex items-cneter gap-2 text-[13px] pt-3'><FaRegDotCircle  className='font-bold text-[12px]'/> View Testimonials</Link>
          </li>
         </ul>
         
        </li>
      </ul>
       <ul className='mx-5 pt-4'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==14 ? 0:14)} className='flex items-center gap-2'>
         <IoIosChatboxes />Faq {dMenu==14 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
         <ul className={`${dMenu==14 ? '':'hidden'}`}>
          <li>
            <Link to={'/faq/addfaq'} className='flex items-cneter gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/> Add faqs</Link>
          </li>
          <li>
            <Link to={'/faq/viewfaq'} className='flex items-cneter gap-2 text-[13px] pt-3'><FaRegDotCircle  className='font-bold text-[12px]'/> View faqs</Link>
          </li>
         </ul>
         
        </li>
      </ul>
       <ul className='mx-5 pt-4'>
        <li>
          <Link  onClick={()=>setdMenu(dMenu==15 ? 0:15)} className='flex items-center gap-2'>
         <IoIosChatboxes />Tream & Conditions {dMenu==15 ? <IoIosArrowUp/> : <IoIosArrowDown />}</Link>
         <ul className={`${dMenu==15 ? '':'hidden'}`}>
          {/* <li>
            <Link to={''} className='flex items-cneter gap-2 text-[13px] pt-3'> <FaRegDotCircle  className='font-bold text-[12px]'/> Add faqs</Link>
          </li>
          <li>
            <Link to={''} className='flex items-cneter gap-2 text-[13px] pt-3'><FaRegDotCircle  className='font-bold text-[12px]'/> View faqs</Link>
          </li> */}
         </ul>
         
      
        </li>
      </ul>
    
    </div>
  )
}
