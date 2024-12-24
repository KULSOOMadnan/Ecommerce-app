import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";

import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
const NavIcons = dynamic(() => import('./NavIcons') , {ssr : false})

const Navbar = () => {
  return (
    <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative  ">

      <div className=" h-full flex items-center justify-between md:hidden">
        {/*mobile  */}
        <Link href="/">
          <div className="text-2xl tracking-wide">ADFOK</div>
        </Link>
        <NavIcons/>
        <Menu />
      </div>


      {/* Bigger Screen */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">

        {/* left */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12 ">
          <Link href="/" className="flex items-center gap-3">
           <Image  src='/logo.png' alt='' height={24} width={24}/>
          <div className="text-2xl tracking-wide">ADFOK</div>
          </Link>
          <div className="hidden xl:flex gap-4">
          <Link href="/" className="">Home</Link>
          <Link href="/" className="">Shop</Link>
          <Link href="/" className="">Deals</Link>
          <Link href="/" className="">About</Link>
          <Link href="/" className="">Contact</Link>
          </div>
        </div>

        {/* right */}
        <div className="w-2/3  xl:1/2 flex items-center justify-between gap-8 ">
          <SearchBar/>
          <NavIcons/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
