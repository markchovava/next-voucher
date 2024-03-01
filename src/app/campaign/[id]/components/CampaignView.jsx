"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import { tokenAuth } from '@/api/tokenAuth';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsArrowRight, BsChevronRight } from 'react-icons/bs';
import { CiSquareRemove } from "react-icons/ci";



export default function CampaignView({ id }) {
    const [data, setData] = useState({});
    const [isGenerate, setIsGenerate] = useState(false);
    const [voucherExist, setVoucherExist] = useState()
    const { getAuthToken } = tokenAuth();
    const [isMsg, setIsMsg] = useState(false);
    const [message, setMessage] = useState('')

    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function generateVouchers() {
        const formData = {
            name: data.name,
            campaign_id: id,
            vouchers_quantity: data.vouchers_quantity,
        };
        console.log(formData);
        try{
          const result = await axiosClientAPI.post(`generated-voucher`, formData, config)
            .then((response) => {
              setMessage(response.data.message);
              console.log(response.data);
              setIsMsg(true);
              checkVoucher();
              setIsGenerate(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsGenerate(false);
        }   
    }

    async function getData() {
        try{
          const result = await axios.get(`${baseURL}campaign/${id}`)
            .then((response) => {
              console.log(response.data.data);
              setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }

    async function checkVoucher() {
        try{
          const result = await axiosClientAPI.get(`generated-voucher/exist/${id}`, config)
            .then((response) => {
                console.log('VoucherExist')
                console.log(response.data.data)
                setVoucherExist(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

   
    useLayoutEffect(() => {
        checkVoucher()
        getData();
    }, [])

    useEffect(() => {
        isGenerate === true && generateVouchers();
    }, [isGenerate]);

    if(!data && !voucherExist){
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
        {/* BREADCRUMBS */}
        <section className='w-[100%] bg-slate-100 text-black'>
            <div className='mx-auto w-[90%]'>
                <ul className='py-2 flex items-center justify-start gap-2'>
                    <li className='flex gap-1 justify-start items-center'>
                    <Link href='/' className='flex justify-start items-center'>
                        Home</Link> 
                    </li>
                    <li><BsChevronRight /></li>
                    <li className='flex justify-start items-center'>
                    <Link href='/campaign'>
                        Campaigns</Link>
                    </li>
                    <li><BsChevronRight /></li>
                    <li className='flex justify-start items-center'>
                    <Link href={`/campaign/${id}`} className='font-semibold'>
                        View Campaign</Link>
                    </li>
                </ul>
            </div>
        </section>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Campaign</h1>
            <hr className="border-t-4 border-black w-[20%] pb-[3.5rem]" />
        </div>  
        {isMsg == true &&
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-center gap-5 text-green-600">
                {message} 
                <CiSquareRemove onClick={() => setIsMsg(false)} />
            </div>
        }
        {/* LINKS */}
        { getAuthToken() &&
            <div className='mx-auto w-[90%] flex justify-end items-center gap-3 pb-[2rem] '> 
                {!voucherExist ? 
                    <button onClick={ () => { setIsGenerate(true);}}
                        disabled={isGenerate == true ? true : false}
                        className=' group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] text-white border bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a]'>
                        { isGenerate === true ? 'Processing' : 
                            <>
                                Generate Vouchers 
                                <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>
                        }
                    
                    </button> 
                :
                    <Link
                        href={`/campaign/vouchers/${id}`}
                        className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] text-white border bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a]'>
                        View Vouchers
                    </Link>  
                }
                <Link
                    href={`/campaign/edit/${id}`}
                    className='flex items-center justify-center gap-1 rounded-xl py-[0.8rem] px-[2rem] bg-green-600 text-white border hover:bg-gradient-to-br  hover:from-green-600 hover:to-green-800'>
                    Edit Campaign</Link>
            </div>
        }

        {/*  */}
        <section className='mx-auto w-[90%] p-[2rem] mb-[3rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Status:</label>
                <div className='w-[80%]'>
                    <span className={`${data.status === 'Processing' && 'bg-green-700'}
                        ${data.status === 'Active' && 'bg-pink-600'}
                        ${data.status === 'Completed' && 'bg-blue-700'} text-white px-2 py-1 rounded-lg`}>
                        {data.status}
                    </span> </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                <div className='w-[80%]'>
                    {data.name} </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Description:</label>
                <div className='w-[80%]'>
                    {data.description} </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Duration:</label>
                <div className='w-[80%]'>
                    {`${data?.start_date && data.start_date} - ${data?.end_date && data.end_date}`}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Vouchers Quantity:</label>
                <div className='w-[80%]'>
                    {data.vouchers_quantity}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Total Price:</label>
                <div className='w-[80%]'>
                    ${data?.total_price}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Reward Name:</label>
                <div className='w-[80%] text-purple-900 font-semibold'>
                    {data.reward_name}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Reward Points:</label>
                <div className='w-[80%] text-blue-900 font-semibold'>
                    {data.reward_points}
                </div>
            </div>
            <div className="w-[100%] mb-[1.6rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Points per Voucher:</label>
                <div className='w-[80%] '>
                    {data.points_per_voucher}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Name:</label>
                <div className='w-[80%]'>
                    {data.company_name}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Address:</label>
                <div className='w-[80%]'>
                    {data.company_address}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Phone:</label>
                <div className='w-[80%]'>
                    {data.company_phone}
                </div>
            </div>
            <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Email:</label>
                <div className='w-[80%]'>
                    {data.company_email}
                </div>
            </div>
            <div className="w-[100%] mb-[1rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Company Website:</label>
                <div className='w-[80%]'>
                    {data.company_website}
                </div>
            </div>
            
            
        </section>  
    </>
  )
}
