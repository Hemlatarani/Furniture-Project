
'use client';

import dynamic from "next/dynamic";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function AboutCustomer() {
  const settings = {
    dots: true,
    infinite: true,
    // speed: 300,
    // autoplay: true,
    // autoplaySpeed: 1000,
   
  };

  let testimonials = [
    {
      id: 1,
      name: "Kathy Young",
      role: "CEO of SunPark",
      image: "/image/ceogirl.jpg", // apni image ka path use karo
      rating: 5,
    },
    {
      id: 2,
      name: "John Smith",
      role: "Manager at SkyTech",
      image: "/image/ceoboy.png",
      rating: 4,
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Marketing Lead",
      image: "/image/ceo1girl.jpg",
      rating: 3,
    },
  ];

  return (
    <section className="max-w-[700px] mx-auto py-12 text-center ">
     
        
      <Slider  {...settings}>
        {testimonials.map((item) => (
          <div key={item.id}>
            <h1 className="font-bold text-3xl mb-4">What Our Coustumor Say ?</h1>
        <p className="text-[18px]">These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose! Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
            <div className="flex flex-col items-center justify-center mb-25 text-[20px] mt-10">
              <Image
                src={item.image}
                alt={item.name}
                width={120}
                height={120}
                className="rounded-full  mb-4 shadow-md "
              />
              <h1 className="font-bold text-2xl my-3">{item.name}</h1>
                           <p className="text-red-500  mb-3">{item.role}</p>

              {/* Stars */}
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < item.rating ? "text-[#c09578]" : "text-[#c09578]"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}