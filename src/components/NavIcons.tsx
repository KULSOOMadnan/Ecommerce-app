"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModel from "./CartModel";

import Cookies from "js-cookie";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

function NavIcons() {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isCartOpen, setcartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClient();
  const router = useRouter();
  // const pathname = usePathname()

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }
 
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }else{

      setProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true)
    Cookies.remove('refreshToken');
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    router.push(logoutUrl)
    setIsLoading(false)
    setProfileOpen(false)

  }

  
  // const cartItems = true;
  const {  counter , getCart } = useCartStore()

  useEffect(() => {
    getCart(wixClient)

  },[wixClient , getCart])
  
  // // AUTH WITH NEXT MANANGED AUTH
  // const wixClient = useWixClient()
  // const login = async () => {
  //   const loginRequestData  = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000",
  //   );
  //   console.log(loginRequestData);
  //   localStorage.setItem('oAuthRedirecrData' , JSON.stringify(loginRequestData))
  //   const {authUrl} = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl
    
  // }
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative ">
      <Link href='/login'>
      <Image
        src="/profile.png"
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
        // onClick={login}
      />
      </Link>
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md bg-white top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/profile">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>{ isLoading ? "Logging out"  : "Logout"}</div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="profile"
        width={22}
        height={22}
        className="cursor-pointer"
      />

      <div
        className="relative cursor-pointer "
        onClick={() => setcartOpen((prev) => !prev)}
      >
        <Image
          src="/cart.png"
          alt="profile"
          width={22}
          height={22}
          className="relative cursor-pointer"
        />
        <div className="absolute -top-3 -right-3 w-5 h-5 bg-adfok rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModel />}
    </div>
  );
}

export default NavIcons;
