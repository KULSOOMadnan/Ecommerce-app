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

interface MediaItem {
  _id: string;
  image: {
    url: string;
  };
}

// Props interface for ProductsImages component
interface ProductsImagesProps {
  items: MediaItem[] | undefined; // items is an array of MediaItem objects
}
function ProductsImages({ items } : ProductsImagesProps) {
  console.log("Items Data",items)
  const [index, setIndex] = useState(0);

   // Check if items are undefined or empty, return a message
   if (!items || items.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <>
      <div className="h-[500px] relative">
      {items[index].image ? (
          <Image
            src={items[index].image.url}
            alt=""
            fill
            sizes="30vw"
            className="object-cover rounded-md"
          />
        ) : (
          <div>No image available</div>
        )}
      </div>
      <div className="flex md:flex-row justify-between gap-4 mt-8 ">
        {items.map((item, i) => (
          <div
            className="w-1/4 h-32 relative mt-8 gap-4 cursor-pointer "
            key={item._id}
            onClick={() => setIndex(index)}
          >
               {items[i].image ? (
          <Image
            src={items[i].image.url}
            alt=""
            fill
            sizes="30vw"
            className="object-cover rounded-md"
          />
        ) : (
          <div>No image available</div>
        )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsImages;

