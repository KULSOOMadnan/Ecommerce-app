'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

function Filter() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {replace} = useRouter()

  const handleFilterChgange = (e :React.ChangeEvent<HTMLSelectElement | HTMLInputElement >) => {
    const {name , value }= e.target
    const params = new URLSearchParams(searchParams);
    params.set(name ,value)
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="mt-12 flex justify-between ">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-sm font-medium bg-[#EBEDED] "
          onChange={handleFilterChgange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-sm rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChgange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-sm rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChgange}
        />
      
        <select
          name="cat"
          id=""
          className="py-2 px-4 text-xs font-medium rounded-2xl bg-[#EBEDED] "
          onChange={handleFilterChgange}
        >
          <option>Category</option>
          <option value="digital">New Arrival</option>
          <option value="digital">Popular</option>
        </select>
        <select
          name=""
          id=""
          className="py-2 px-4 text-xs font-medium rounded-2xl bg-[#EBEDED] "
        >
          <option>All Filters</option>
        </select>
      </div>
      <div>
        
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChgange}
        >
          <option>Default</option>
          <option value="asc price" >Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
