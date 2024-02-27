"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { CiSquareRemove } from "react-icons/ci";


export default function ClaimAdd() {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth()
    const [isSubmit, setIsSubmit] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [mode, setMode] = useState('Text');
    const [isSearch, setIsSearch] = useState(false);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }}


    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }


    /* SEARCH DATA */
    async function searchData() {
        console.log(searchInput);
        setIsSearch(false);
        try{
            const result = await axiosClientAPI.get(`generated-voucher/voucher-search?search=${searchInput}`, config)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSearch(false);
        }   
    }
    /* POST DATA */
    async function postData() {
        const formData = {
            campaign_id: data.campaign.id,
            total_points: data.campaign.points_per_voucher,
            total_quantity: 1,
            start_date: data.campaign.start_date,
            end_date: data.campaign.end_date,
            /* Claimed Voucher */
            code: data.voucher.code,
            points: data.campaign.points_per_voucher,
            generated_voucher_id: data.voucher.id,
        }
        console.log(formData)
       try{
            const result = await axiosClientAPI.post(`claim`, formData, config)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setIsSubmit(false);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }
    }

    useEffect(() => {
        isSearch == true && searchData();
    },[isSearch]);


    useEffect(() => {
        isSubmit == true && postData();
    },[isSubmit])




  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Claim Voucher</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div>

        <section className="mx-auto lg:w-[70%] w-[90%] pb-[2rem]">
            <div className="w-[100%] mb-[2rem] flex items-center justify-between gap-4">
                <div className='flex items-center justify-start gap-4'>
                    <button 
                        onClick={() => setMode('QRCode')}
                        className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-blue-500 to-cyan-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-cyan-900 transition ease-in-out duration-200'>
                        QR Code</button>
                    <button 
                        onClick={() => setMode('Text')}
                        className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-violet-500 to-violet-700 hover:bg-gradient-to-br hover:from-violet-500 hover:to-violet-900 transition ease-in-out duration-200'>
                        Text</button>
                </div>
                
            </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1 text-lg'>{mode}</h6>
            <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[4rem]'>
                <input 
                    type="text" 
                    name="code" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Write your Name here..." 
                    className="lg:w-[80%] w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                <button 
                     onClick={ () => {
                        setIsSearch(true) 
                      }}
                    className='lg:w-[20%] w-[100%] lg:px-[2.5rem] py-[1rem] text-center rounded-xl text-white bg-gradient-to-br from-orange-500 to-red-700 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-800 transition ease-in-out duration-200'>
                    { isSearch === true ? 
                        'Processing' : 
                        'Search'
                    }
                </button>
            </div>
        </div>

        {data.campaign &&
            <section className="w-[100%] text-lg mb-[2rem] p-[1rem] bg-white drop-shadow-xl">
                <p className='text-xl font-semibold text-green-600 my-4 text-center'>
                    The voucher is available. Click the button below to add voucher points.
                </p>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[15%]'>Name:</div>
                    <div className='w-[85%] font-semibold'>{data.campaign.name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[15%]'>Start Date:</div>
                    <div className='w-[85%] font-semibold'>{data.campaign.start_date}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[15%]'>End Date:</div>
                    <div className='w-[85%] font-semibold'>{data.campaign.end_date}</div>      
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                    <button 
                        onClick={ () => {
                            setIsSubmit(true) 
                        }}
                        className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                        {isSubmit === true ? 'Processing' : 
                            <>
                            Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>}
                    
                    </button>
                </div>
            </section>
        }

        {data.message &&
            <section className="w-[100%] text-lg mb-[2rem] p-[1rem] bg-white drop-shadow-xl">
                <p className='text-xl font-semibold text-blue-600 my-4 flex justify-center items-center gap-6'>
                   {data.message} 
                    <CiSquareRemove className='text-3xl rounded-lg text-white bg-red-600 hover:bg-red-500' onClick={() => setData({...data, message: undefined})} />
                </p>
            </section>
        }
     
       
      </section>
    </>
  )
}
