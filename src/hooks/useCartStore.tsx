import { create } from "zustand";
import {  currentCart } from "@wix/ecom";
import { WixClient } from "@/context/WicContext";

type cartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  subtotal: number; // Derived property
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    varaintId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};


export const useCartStore = create<cartState>((set) => ({
  cart :{
    lineItems: [],
  } as currentCart.Cart,
  subtotal: 0,
  isLoading: false,
  counter: 0,
  getCart: async (wixClient) => {
    
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      const subtotal = cart?.lineItems.reduce(
        (total, item) => total +  ((item.price?.amount as unknown as number || 0) * (item.quantity as number || 0)),
        0
      );
      
      set({
        cart: cart || [],
        subtotal: subtotal || 0,
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
      console.log(err)
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_ID!,
            catalogItemId: productId,
            ...(variantId && { options: { variantId } }),
          },
          quantity: quantity,
        },
      ],
    });
    const subtotal = response.cart?.lineItems.reduce(
      (total, item) => total +  ((item.price?.amount as unknown as number || 0) * (item.quantity as number || 0)),
      0
    );

    set({
      cart: response.cart,
      subtotal: subtotal || 0,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
  },
removeItem: async (wixClient, itemId) => {
set((state) => ({ ...state, isLoading: true }));
const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
  [itemId]
);
const subtotal = response.cart?.lineItems.reduce(
  (total, item) => total + ((item.price?.amount as unknown as number || 0) * (item.quantity as number || 0)),
  0
);
set({
  cart: response.cart,
  subtotal: subtotal || 0,
  counter: response.cart?.lineItems.length,
  isLoading: false,
});
},
}));


