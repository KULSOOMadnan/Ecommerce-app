"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <Image
        src="/menu.png"
        alt="three bar"
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute w-full left-0 bg-white text-black top-20  h-[calc(100vh-80px)] flex items-center flex-col justify-center gap-8 text-xl z-10">
          <Link href="/" className="">Home</Link>
          <Link href="/list" className="">Shop</Link>
          <Link href="/about" className="">About</Link>
          <Link href="/contact" className="">Contact</Link>
          

        </div>
      )}
    </div>
  );
}

export default Menu;
