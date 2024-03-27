"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Loader from '@/components/Loader';
import fetcherAPI from '@/swr/fetcherAPI';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';



export default function PriceView() {
    const { data, error } = useSWR(`voucher-price`, fetcherAPI)
   /*  const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    }; */
    /* GET DATA */
   /*  async function getData() {
        try{
          const result = await axiosClientAPI.get(`voucher-price`, config)
            .then((response) => {
              setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }  */

    /* useEffect(() => { 
        getData();
    }, []); */


    if(!data){
      return (
      <>
        <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
            <h6 className='animate-pulse text-2xl'>Loading...</h6>
        </div>
      </>
      )
  }

    


  return (
 
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Price</h1>
            <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
        </div> 
        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/price/edit`}
                className='transition-all duration-150 ease-in rounded-lg  px-8 py-3 bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white border hover:bg-gradient-to-br  hover:from-[#50014c] hover:to-[#6c0868] hover:text-white'>
                Edit</Link>
        </div>
        {/*  */}
        <section className='mx-auto w-[90%] pb-[4rem]'>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Quantity:</label>
                <div className='w-[80%]'>
                    {data.data?.quantity} </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Price:</label>
                <div className='w-[80%]'>
                    {data.data?.price ? '$' + (data.data?.price / 100).toFixed(2) : 'Not yet Defined.'} </div>
            </div>
        </section>
    </>

  )
}
