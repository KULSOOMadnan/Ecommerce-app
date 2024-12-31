"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

interface PAGINATION {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}

function Pagination({ currentPage, hasPrev, hasNext }: PAGINATION) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="mt-12 flex w-full justify-between">
      <button
        className="rounded-md bg-adfok text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={() => currentPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-adfok text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => currentPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
