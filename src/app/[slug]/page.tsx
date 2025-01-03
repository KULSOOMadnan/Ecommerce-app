import Add from "@/components/Add";
import ProductInfo from "@/components/ProductInfo";
// import ProductList from "@/components/ProductList";
import ProductsImages from "@/components/ProductsImages";
// import Products from "@/components/ProductsImages";
// import Reviews from "@/components/Reviews";
import { wixClientServer } from "@/lib/wixClientServer";
import DOMPurify from "isomorphic-dompurify";
// import { products } from "@wix/stores";
import { notFound } from "next/navigation";
interface Section {
  _id?: string;
  title?: string;
  description?: string;
}

interface MediaItem {
  _id: string;
  image: {
    url: string;
  };
}

async function SinglePage({ params }: { params: { slug: string } }) {
  const wixClient = await wixClientServer();

  const products = await wixClient?.products
    .queryProducts()
    .eq("slug", params.slug)
    // .limit(limit || Product_limit)
    .find();

  if (!products?.items[0]) {
    return notFound();
  }
  const product = products.items[0];

  return (
    <div className=" px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        {/* <ProductsImages items={product.media?.items } /> */}
        <ProductsImages items={(product.media?.items as MediaItem[]) || []} />
      </div>
      {/* Text */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6  ">
        <h1 className="text-4xl font-medium ">{product.name}</h1>
        {/* <p className="text-gray-500"  >{product.description}</p> */}
        <p
          className="text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(product.description || ""),
          }}
        />
        <div className="bg-gray-100 h-[2px]" />
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="text-2xl font-medium">${product.price?.price}</h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              {product.price?.price}
            </h3>
            <h2 className="text-2xl font-medium">
              ${product.price?.discountedPrice}
            </h2>
          </div>
        )}

        <div className="bg-gray-100 h-[2px]" />
        {product.variants && product.productOptions ? (
          <ProductInfo
            productId={product._id!}
            variants={product.variants}
            productOptions={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId={'"00000000-0000-0000-0000-000000000000'}
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="bg-gray-100 h-[2px]" />
        {product.additionalInfoSections?.map((section: Section) => (
          <div className="text-sm" key={section._id}>
            <h4 className="font-medium mb-4">{section.title}</h4>
            <p className="">{section.description} </p>
          </div>
        ))}
        <div className="h-[2px] bg-gray-100" />
        {/* REVIEWS
        // <h1 className="text-2xl">User Reviews</h1>
        // <Suspense fallback="Loading...">
        //   <Reviews productId={product._id!} />
        // </Suspense> */}
      </div>
    </div>
  );
}

export default SinglePage;
