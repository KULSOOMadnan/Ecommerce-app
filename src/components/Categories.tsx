// import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";
import React from "react";

async function CategoryList() {
  const wixclient = await wixClientServer();
  const cats = await wixclient.collections.queryCollections().find();

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <Carousel
        opts={{
          align: "start",
        }}
        className="relative w-full"
      >
        {/* Heading and Buttons */}
        <div className="   flex justify-between items-center mb-6">
        <h1 className="text-2xl  px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categories</h1>

          {/* Previous and Next Buttons */}
          <div className="flex gap-2 ">
            <CarouselPrevious className="bg-gray-300 p-2 rounded-full" />
            <CarouselNext className="bg-gray-300 p-2 rounded-full" />
          </div>
        </div>

        {/* Carousel Content */}
        <CarouselContent className="flex gap-4">
          {cats?.items?.map((item) => (
            <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0   w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 space-x-4"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-96 ">
              <Image
                src={item.media?.mainMedia?.image?.url || "cat.png"}
                alt=""
                fill
                sizes="20vw"
                className="object-cover "
              />{" "}
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default CategoryList;