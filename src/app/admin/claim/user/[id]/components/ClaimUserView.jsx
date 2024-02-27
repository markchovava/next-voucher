"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { tokenAuth } from '@/api/tokenAuth';
import axiosClientAPI from '@/api/axiosClientAPI';




export default function ClaimUserView({ id }) {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`claim/${id}`, config)
            .then((response) => {
              setData(response.data.data);
              console.log(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    useEffect(() => { 
        getData();
    }, []);



  return (
    <>
         {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Claim</h1>
                <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div> 

        {/* ROW */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href={`/admin/claim`}
                className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg  px-8 py-3 bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800 hover:text-white'>
                Claim List</Link>
        </div>

        <section className='mx-auto w-[90%] text-lg mb-[4rem] bg-white drop-shadow-xl py-[1.5rem] px-[2rem]'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Claim Info
            </div>
            <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>Name:</label>
                <div className='lg:w-[85%] w-[80%]'>
                    {data.campaign?.name} </div>
            </div>
            <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>Duration:</label>
                <div className='lg:w-[85%] w-[80%] font-semibold text-blue-700'>
                    {`${data.start_date} - ${data.end_date}`}
                </div>
            </div>
            {data.campaign?.description &&
                <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                    <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>Description:</label>
                    <div className='lg:w-[85%] w-[80%]'>
                        {data.campaign.description}
                    </div>
                </div>
            }
            <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>Current Points:</label>
                <div className='lg:w-[85%] w-[80%] font-bold '>
                    <span className='bg-green-700 px-2 py-1 text-white rounded-xl'>
                        {data.total_points}</span>
                </div>
            </div>
            <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>Claimed Vouchers:</label>
                <div className='lg:w-[85%] w-[80%] font-bold'>
                    <span className='bg-red-700 px-2 py-1 text-white rounded-xl'>
                        {data.total_quantity} </span>
                </div>
            </div>
            { data.user?.email &&
                <div className="w-[100%] mb-[1.2rem] flex items-center justify-start">
                    <label className='lg:w-[15%] w-[20%] gap-3 font-semibold'>User:</label>
                    <div className='lg:w-[85%] w-[80%] '>
                        {data.user?.name ? data.user?.name : data.user?.email}
                    </div>
                </div>
            }

        </section>
    </>
  )
}
