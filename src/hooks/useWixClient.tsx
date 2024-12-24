'use client'

import { WixClintContext } from "@/context/WicContext";
import { useContext } from "react";

export  const useWixClient = () => {
    return useContext(WixClintContext);
}