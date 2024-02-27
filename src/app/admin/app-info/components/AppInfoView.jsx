"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Loader from '@/components/Loader';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'



export default function AppInfoView({ id }) {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const [isLoading, setIsLoading] = useState(true);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`app-info`, config)
            .then((response) => {
              if(response.data.data !== undefined){
                setData(response.data.data);
                return;
              }
              console.log(response.data.message)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    useEffect(() => { 
        getData();
        setIsLoading(false);
    }, []);
    


  return (
    <>
        { isLoading == true ? <Loader /> :
        <>
            {/* Title */}
            <div className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                    View App Info</h1>
                <hr className="border-t-4 border-blue-900 w-[10%] pb-[3.5rem]" />
            </div> 
            {/* ROW */}
            <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
                <Link
                    href={`/admin/app-info/edit`}
                    className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg  px-8 py-3 bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800 hover:text-white'>
                    Edit</Link>
            </div>
            {/*  */}
            <section className='mx-auto w-[90%] pb-[4rem]'>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                    <div className='w-[80%]'>
                        {data.name} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Email:</label>
                    <div className='w-[80%]'>
                        {data.email} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Phone:</label>
                    <div className='w-[80%]'>
                        {data.phone} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Address:</label>
                    <div className='w-[80%]'>
                        {data.address} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Website:</label>
                    <div className='w-[80%]'>
                        {data.website} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>WhatsApp:</label>
                    <div className='w-[80%]'>
                        {data.whatsapp} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Facebook:</label>
                    <div className='w-[80%]'>
                        {data.facebook} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Description:</label>
                    <div className='w-[80%]'>
                        {data.description} </div>
                </div>
               
            </section>
        </>
        }

    </>
  )
}
