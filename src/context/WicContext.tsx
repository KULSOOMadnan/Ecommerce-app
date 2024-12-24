"use client";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { products, collections } from "@wix/stores";
import Cookies from "js-cookie";
import { createContext, ReactNode } from "react";
import { redirects } from "@wix/redirects";


const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");
const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken,
      accessToken: { value: "", expiresAt: 0 },
    },
  }),
});
export type WixClient = typeof wixClient
export const  WixClintContext = createContext<WixClient>(wixClient)
export const WixClientProvider = ({children}: {children : ReactNode}) => {
    return(
        <WixClintContext.Provider value={wixClient}>{children}</WixClintContext.Provider>
    )
} 