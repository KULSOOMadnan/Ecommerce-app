"use client";

import Image from "next/image";
import React, { useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/6786611/pexels-photo-6786611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/9558596/pexels-photo-9558596.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/28744672/pexels-photo-28744672/free-photo-of-fashionable-woman-in-sportswear-and-hijab.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/19461509/pexels-photo-19461509/free-photo-of-back-view-of-man-posing-in-white-shirt.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   },
// ];

function ProductsImages({items} : {items : any | undefined }) {
  const [index, setIndex] = useState(0);
  return (
    <>
   
      <div className="h-[500px] relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="30vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex md:flex-row justify-between gap-4 mt-8 ">
          {items.map((item : any, i : number) => (
            <div
              className="w-1/4 h-32 relative mt-8 gap-4 cursor-pointer "
              key={item._id}
              onClick={() => setIndex(i)}
            >
              <Image
                src={item.image?.url}
                alt=""
                fill
                sizes="30vw"
                className="object-cover rounded-md"
              />
            </div>
          ))}
        
      </div>
      </>
    
  );
};

export default ProductsImages;

      