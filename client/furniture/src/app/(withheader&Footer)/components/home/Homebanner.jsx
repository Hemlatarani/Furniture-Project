// "use client"
// import React, { useState } from 'react'
// import Slider from "react-slick"

// export default function Homebanner({bannerdata}) {
//     var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1
//   };
//   const img=[
//     {
//       src:"https://media.istockphoto.com/id/1309042044/photo/interior-design-of-stylish-dining-room-interior-with-family-wooden-table-modern-chairs-plate.jpg?s=1024x1024&w=is&k=20&c=sJOw4jkC4fapjfMjc5f6klVgV-qe3kkHN9yaG0itAxM="
// },
// {
//   src:"https://media.istockphoto.com/id/1350859272/photo/luxury-furniture-goods.jpg?s=1024x1024&w=is&k=20&c=ADZLZvCD34jz0E7QKEDyrHje8cb7l7Ghhr3obZ8xgEk="
// },
// {
//   src:"https://media.istockphoto.com/id/1007240024/photo/book-on-a-black-and-white-pouf-in-the-middle-of-a-bright-terrace-with-a-rattan-corner-sofa.jpg?s=1024x1024&w=is&k=20&c=eLDSB0rLbxapSiRC8vFfPobzLslPuKWvIW8fY7-zF1M="
// }
//   ]

//   return (
  
//     <section className='overflow-hidden  '>
//     <Slider {...settings}>
//       {bannerdata.map((item,index)=>{
//  return(
//  <div  >
//         <img src={item.src} alt="" 
//         className='h-[70vh] w-full object-cover' />
//         <p>{item.ranting}</p>
//       </div>
//  )
//       })}
     
     
      
//     </Slider>

//     </section>
  
//   )
// }
"use client";

import React from "react";
import Slider from "react-slick";

export default function Homebanner({ bannerdata }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay:true,
    slidesToScroll: 1,
  };

  const img = [
    {
      src: "https://media.istockphoto.com/id/1309042044/photo/interior-design-of-stylish-dining-room-interior-with-family-wooden-table-modern-chairs-plate.jpg?s=1024x1024&w=is&k=20&c=sJOw4jkC4fapjfMjc5f6klVgV-qe3kkHN9yaG0itAxM=",
    },
    {
      src: "https://media.istockphoto.com/id/1350859272/photo/luxury-furniture-goods.jpg?s=1024x1024&w=is&k=20&c=ADZLZvCD34jz0E7QKEDyrHje8cb7l7Ghhr3obZ8xgEk=",
    },
    {
      src: "https://media.istockphoto.com/id/1007240024/photo/book-on-a-black-and-white-pouf-in-the-middle-of-a-bright-terrace-with-a-rattan-corner-sofa.jpg?s=1024x1024&w=is&k=20&c=eLDSB0rLbxapSiRC8vFfPobzLslPuKWvIW8fY7-zF1M=",
    },
  ];

  return (
    <section className="overflow-hidden">
      <Slider {...settings}>
        {img.map((item, index) => (
          <div key={index}>
            <img
              src={item.src}
              alt={`Banner ${index + 1}`}
              className="w-full h-[250px] sm:h-[400px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}