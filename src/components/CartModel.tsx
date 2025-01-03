"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import Image from "next/image";
// import { useEffect } from "react";
import { media as wix } from "@wix/sdk";
import { currentCart } from "@wix/ecom";

function CartModel() {
  const wixClient = useWixClient();
  // const cartItems = true;
  const { cart, isLoading, removeItem , subtotal} = useCartStore();
  

  const handleCheckOut = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });
      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };


  // useEffect(() => {
  //   const getcard = async () => {
  //     const response = await wixClient.currentCart.getCurrentCart();
  //     console.log(response)
  //   };
  //   getcard();
  // }, [wixClient]);

  console.log("card itesm",cart)

  return (
    <div className="w-max  absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12   md:right-0 flex flex-col gap-6 z-20 ">
      {isLoading ? (
        "Loading..."
      ) : !cart.lineItems ? (
        <div className="">Card is Empty </div>
      ) : (
        // list
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8 p-4 sm:p-6 lg:p-8">
  {/* items */}
  {cart.lineItems.map((item) => (
    <div
      className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm"
      key={item._id}
    >
      {item.image && (
        <Image
          src={wix.getScaledToFillImageUrl(item.image, 72, 96, {})}
          width={72}
          height={96}
          alt="cart image"
          className="object-cover rounded-md"
        />
      )}
      <div className="flex flex-col w-full justify-between">
        {/* Top */}
        <div>
          {/* Title */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-base sm:text-lg">
              {item.productName?.original}
            </h3>
            <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2 text-sm">
              {item.quantity && item.quantity > 1 && (
                <div className="text-green-500">{item.quantity} x</div>
              )}
              ${item.price?.amount}
            </div>
          </div>
          {/* Description */}
          <div className="text-gray-500 text-sm mt-2">
            {item.availability?.status}
          </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-between items-center text-sm mt-4">
          <span className="text-gray-500">Qty: {item.quantity}</span>
          <span
            className={`text-blue-500 cursor-pointer ${
              isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            onClick={() => removeItem(wixClient, item._id!)}
          >
            Remove
          </span>
        </div>
      </div>
    </div>
  ))}
  {/* bottom */}
  <div className="bg-gray-50 p-4 rounded-lg shadow-md">
    <div className="flex items-center justify-between font-semibold text-lg">
      <span>Subtotal</span>
      <span>${subtotal}</span>
    </div>
    <p className="text-gray-500 text-sm mt-2 mb-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    </p>
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <button className="w-full sm:w-auto rounded-md py-3 px-4 ring-1 ring-gray-300">
        View Cart
      </button>
      <button
        className="w-full sm:w-auto rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
        disabled={isLoading}
        onClick={handleCheckOut}
      >
        Checkout
      </button>
    </div>
  </div>
</div>

        </>
      )}
    </div>
  );
}

export default CartModel;


// {/* <div className="flex flex-col gap-8">
// {/* items */}
// {cart.lineItems.map((item) => (
//   <div className="md:flex  flex-col gap-4" key={item._id}>
//     {item.image && (
//       <Image
//         src={wix.getScaledToFillImageUrl(item.image, 72, 96, {})}
//         width={72}
//         height={96}
//         alt="cart imag"
//         className="object-cover rounded-md"
//       />
//     )}
//     <div className="flex flex-col w-full justify-between">
//       {/* top */}
//       <div className="">
//         {/* title */}
//         <div className="flex items-center justify-between gap-8 ">
//           <h3 className="font-semibold ">
//             {item.productName?.original}
//           </h3>
//           <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
//             {item.quantity && item.quantity > 1 && (
//               <div className="text-xs text-green-500 ">
//                 {item.quantity} x{" "}
//               </div>
//             )}
//             ${item.price?.amount}
//           </div>
//         </div>
//         {/* Description */}
//         <div className="text-sm text-gray-500">
//           {item.availability?.status}
//         </div>
//       </div>
//       {/* Bottom*/}
//       <div className="flex justify-between text-sm">
//         <span className="text-gray-500">Qty. {item.quantity} </span>
//         <span
//           className="text-blue-500 cursor-pointer"
//           onClick={() => removeItem(wixClient, item._id!)}
//           style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
//         >
//           Remove
//         </span>
//       </div>
//     </div>
//   </div>
// ))}
// </div> */}
{/* bottom */}
<div className="">
<div className="flex items-center justify-between font-semibold">
  <span className=""> SubTotal</span>
  {/* <span className=""> ${subtotal}</span> */}
</div>
<p className="text-gray-500 text-s mt-2 mb-4">
  Lorem ipsum dolor sit, amet consectetur adipisicing el
</p>
<div className="flex justify-between \text-sm">
  <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
    View Cart{" "}
  </button>
  <button
    className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75 "
    // disabled={isLoading}
    // onClick={handleCheckOut}
  >
    Checkout{" "}
  </button>
</div>
</div>