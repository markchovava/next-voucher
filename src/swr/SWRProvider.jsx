"use client";
import fetcherWeb from "./fetcherWeb";
import fetcherAPI from "./fetcherAPI";
import { SWRConfig } from "swr";



export default function SWRProvider({ children }) {
  return (
    <SWRConfig
      value={{
        fetcherWeb,
        fetcherAPI,
      }}
    >
      {children}
    </SWRConfig>
  );
}