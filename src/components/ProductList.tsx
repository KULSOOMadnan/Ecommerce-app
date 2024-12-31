import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";


import Pagination from "./Pagination";

const Product_limit = 20;

interface SearchParams {
  name?: string;
  type?: string;
  min?: number;
  max?: number;
  page?: string;
  sort? : string
  cat?: string;
}

async function ProductList({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: SearchParams;
}) {
  const wixClient = await wixClientServer();
  const productQuery = wixClient?.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      searchParams?.type ? [searchParams.type] : ["physical", "digital"]
    )
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || Product_limit)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || Product_limit)
        : 0
    );

  let res;
  if (searchParams?.sort) {
    // const [sortType, sortBy] = searchParams.sort.split(" ") 
    const [sortType, sortBy] = searchParams.sort.split(" ") as [string, "_id" | "name" | "slug" | "sku" | "productType" | "price" | "priceData.price" | "numericId" | "lastUpdated"];
    ;

    if (sortType === "asc") {
      res = await productQuery?.ascending(sortBy).find();
    } else if (sortType === "desc") {
      res = await productQuery?.descending(sortBy).find();
    } else {
      res = await productQuery?.find();
    }
  } else {
    res = await productQuery?.find();
  }

  return (
    <div className="flex mt-12 gap-x-8 gap-y-16 justify-between flex-wrap">
      {res?.items.map((product: products.Product) => (
        <Link
          href={"/" + product.slug}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80 ">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              fill
              alt="Products Image"
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items?.[1]?.image?.url || "/product.png"}
                fill
                alt="Products Image"
                sizes="25vw"
                className="absolute object-cover rounded-md "
              />
            )}
          </div>
          <div className="flex justify-between ">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">
              PKR {product.priceData?.price}
            </span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section:  { title?: string; description?: string }) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          {/* <div className="text-sm text-gray-500"> {product.description}</div> */}
          <button className="rounded-2xl ring-1 ring-adfok text-adfok text-xs w-max px-4 py-2 hover:bg-adfok hover:text-white">
            Add to Cart{" "}
          </button>
        </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res?.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  );
}

export default ProductList;
