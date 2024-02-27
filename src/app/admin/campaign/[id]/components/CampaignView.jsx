"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Loader from '@/components/Loader';
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import { CiSquareRemove } from "react-icons/ci";



export default function CampaignView({ id }) {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const [message, setMessage] = useState('');
    const [isMsg, setIsMsg] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [voucherExist, setVoucherExist] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`campaign-company/${id}`, config)
            .then((response) => {
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
                console.log(response.data.data)
                setVoucherExist(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    async function generateVouchers() {
        const formData = {
            name: data.name,
            campaign_id: id,
            quantity: data.quantity,
        };
        console.log(formData);
        try{
          const result = await axiosClientAPI.post(`generated-voucher`, formData, config)
            .then((response) => {
              setMessage(response.data.message);
              console.log(response.data);
              setIsSubmit(false);
              setIsMsg(true)
              setIsClicked(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsClicked(false);
        }   
    }

    useLayoutEffect(() => { 
        checkVoucher()
        getData();
        setIsLoading(false);
    }, []);


    useEffect(() => { 
        isSubmit && generateVouchers();
        checkVoucher();
    }, [isSubmit]);


    


  return (
    <>
        { isLoading == true ? <Loader /> :
        <>
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
            {/* ROW */}
            <div className='mx-auto w-[90%] flex justify-end items-center gap-3 pb-[2rem] '>
                { voucherExist ?
                    <Link href={`/admin/voucher/generate/list/${id}`}
                        className='group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                        View Vouchers 
                        <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />     
                    </Link>
                    :
                    <button 
                        onClick={ () => {
                            setIsClicked(true);
                            setIsSubmit(true);
                        }}
                        disabled={isClicked == true ? true : false}
                        className=' group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                        {isClicked === true ? 'Processing' : 
                            <>
                                Generate Vouchers 
                                <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>}
                    
                    </button>
                }
               
                <Link
                    href={`/admin/campaign/edit/${id}`}
                    className='flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-green-600 text-white border hover:bg-gradient-to-br  hover:from-green-600 hover:to-green-800'>
                    Edit</Link>
            </div>
            {/*  */}
            <section className='mx-auto w-[90%] p-[2rem] mb-[3rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Status:</label>
                    <div className='w-[80%]'>
                        <span className={`${data.status === 'Processing' && 'bg-green-700'}
                            ${data.status === 'Active' && 'bg-pink-600'}
                            ${data.status === 'Completed' && 'bg-blue-700'} text-white px-2 py-1 rounded-lg`}>
                            {data.status}
                        </span> </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                    <div className='w-[80%]'>
                        {data.name} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Start Date:</label>
                    <div className='w-[80%]'>
                        {data.start_date}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>End Date:</label>
                    <div className='w-[80%]'>
                        {data.end_date}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Quantity:</label>
                    <div className='w-[80%]'>
                        {data.quantity}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Total Price:</label>
                    <div className='w-[80%]'>
                        ${(data.total_price / 100).toFixed(2)}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Points per Voucher:</label>
                    <div className='w-[80%]'>
                        {data.points_per_voucher}
                    </div>
                </div>
                { data.company?.name &&
                    <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                        <label className='w-[20%] gap-3 font-semibold'>Company:</label>
                        <div className='w-[80%]'>
                            {data.company?.name}
                        </div>
                    </div>
                }
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Author:</label>
                    <div className='w-[80%]'>
                        {data.user?.name ? data.user?.name : data.user?.email}
                    </div>
                </div>
            </section>
        </>
        }

    </>
  )
}
