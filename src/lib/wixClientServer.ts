import { currentCart } from "@wix/ecom";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { orders } from "@wix/ecom";
import { collections, products } from "@wix/stores";
import { cookies } from "next/headers";
import { members } from "@wix/members";

export const wixClientServer = async () => {
  let refreshToken;
  try {
    const cookiesStore = cookies();
    refreshToken = JSON.parse(cookiesStore.get("refreshToken")?.value || "{}");
  } catch (e) {
    console.log(e);
  }
  const wixClient = createClient({
    modules: {
      products,
      collections,
      currentCart,
      orders,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
        // accessToken: {
        //   value: "<ACCESS_TOKEN_VALUE>",
        //   expiresAt: "<ACCESS_TOKEN_EXPIRY_DATE>",
        // },
        // refreshToken: {
        //   value: "<REFRESH_TOKEN_VALUE>",
        // },
      },
    }),
  });

  return wixClient;
};
