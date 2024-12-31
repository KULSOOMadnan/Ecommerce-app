
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import React, { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) => {
  const wixClient = await wixClientServer()
  const categorySlug = Array.isArray(searchParams.cat) ? searchParams.cat[0] : searchParams.cat || 'all-products';

  const cat = await wixClient?.collections.getCollectionBySlug(categorySlug );
  console.log(cat)
  return (
    <div className="mt-24 relative px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* campaign */}
      <div className= " hidden bg-pink-50 px-4 sm:flex justify-between h-64 ">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1  className=" text-4xl font-semibold leading-[43px] text-gray-700">Grab Up to 50% on <br/> selected Products</h1>
          <button className="rounded-3xl text-white bg-adfok py-3 px-5 text-sm">Buy Now</button>
        </div>
        <div className="relative w-1/3">
          <Image
            src="/woman.png"
            alt=""
            fill
            className="object-contain"
          ></Image>
        </div>
      </div>
      {/* filter */}
      <Filter/>
      {/*Products  */}
      <h1 className="mt-12 text-xl font-semibold">{cat?.collection?.name} For You!</h1>
      <Suspense fallback={'loading'}>
        <ProductList categoryId={cat?.collection?._id || '00000000-000000-000000-000000000001'} searchParams={searchParams}/>
      </Suspense>
    </div>
  );
};


export default ListPage;
