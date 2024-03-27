"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import Link from "next/link"
import { useEffect, useState } from "react";
import { BsArrowRight, BsChevronRight } from "react-icons/bs"
import { CiCircleRemove, CiSquareRemove } from "react-icons/ci";
import { useZxing } from "react-zxing";



export default function Voucher() {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth()
    const [isSubmit, setIsSubmit] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [mode, setMode] = useState('Voucher Number');
    const [isSearch, setIsSearch] = useState(false);
    const [isQrScan, setIsQrScan] = useState(true);
    const { ref } = useZxing({
        onDecodeResult(result) {
          setSearchInput(result.getText())
        },
        paused: isQrScan
    });
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }}
    /* SEARCH DATA */
    async function searchData() {
        console.log(searchInput);
        try{
            const result = await axiosClientAPI.get(`generated-voucher/voucher-search?search=${searchInput}`, config)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setIsSearch(false);
                
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
            reward_name: data.campaign.reward_name,
            reward_points: data.campaign.reward_points,
            /* Claimed Voucher */
            code: data.voucher.code,
            points: data.campaign.points_per_voucher,
            generated_voucher_id: data.voucher.id,
        }
        console.log(formData)
       try{
            const result = await axiosClientAPI.post(`program`, formData, config)
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
        <h1 className="leading-none pt-[2rem] pb-[1.5rem] text-center font-black text-[4rem]">
            Redeem Voucher</h1>
            <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
    </div> 

    <section className="mx-auto lg:w-[70%] w-[90%] pb-[2rem]">
        <div className="w-[100%] mb-[1rem] flex items-center justify-between gap-4">
            <div className='flex items-center justify-start gap-4'>
                <button 
                    onClick={() => {
                        setMode('Voucher Number');
                        setIsQrScan(!isQrScan);
                    }}
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-blue-500 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-blue-500 transition ease-in-out duration-200'>
                    Scan Voucher</button>
              {/*   <button 
                    onClick={() => {
                        setMode('Text');
                        setIsQrScan(true);
                    }}
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-cyan-600 to-violet-800 hover:bg-gradient-to-br hover:from-violet-800 hover:to-cyan-600 transition ease-in-out duration-200'>
                    Text</button> */}
            </div>
            <div className='flex items-center justify-start gap-4'>
                <Link
                    href='/campaign-program'
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-[#6c0868] to-purple-800 hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-violet-900 transition ease-in-out duration-200'>
                    My Campaigns</Link>
                
            </div> 
        </div>

        <div className={`${isQrScan == false ? 'w-[100%] mb-[1rem]' : 'hidden' } flex justify-center items-start`}>
            <div className="w-[30rem] h-[20rem]">
                <video ref={ref} className="w-[100%] h-[100%] object-cover bg-white drop-shadow-xl"/>
            </div>
        </div>
        {/*  */}
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1 text-lg'>{mode}</h6>
            <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[4rem]'>
                <input 
                    type="text" 
                    name="code" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Voucher Number here..." 
                    className="lg:w-[80%] w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                <button 
                     onClick={ () => {
                        setIsSearch(true) 
                      }}
                    className='lg:w-[20%] w-[100%] lg:px-[2.5rem] py-[1rem] text-center rounded-xl text-white bg-gradient-to-br from-orange-500 to-red-700 hover:bg-gradient-to-br hover:from-red-500 hover:to-red-800 transition ease-in-out duration-200'>
                    { isSearch === true ? 
                        'Processing' : 
                        'Redeem Points'
                    }
                </button>
            </div>
        </div>


        {data.campaign &&
            <section className="w-[100%] text-lg mb-[2rem] p-[1rem] bg-white drop-shadow-xl">
                <p className='text-xl text-green-600 my-4 text-center'>
                    The voucher is available. It has <span className="font-semibold">{data.campaign.points_per_voucher} points.</span> Click the button below to redeem them.
                </p>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Name:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Company Name:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.company_name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reward:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.reward_name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Target Points:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.reward_points}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Start Date:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.start_date}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>End Date:</div>
                    <div className='w-[80%] font-semibold'>{data.campaign.end_date}</div>      
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                    <button 
                        onClick={ () => {
                            setIsSubmit(true) 
                        }}
                        className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                        { isSubmit === true ? 'Processing' : 
                            <>
                            Proceed <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                            </>
                        }
                    
                    </button>
                </div>
            </section>
        }

        {data.message &&
            <section className="w-[100%] text-lg mb-[2rem] p-[1rem] bg-white drop-shadow-xl">
                <p className='text-xl font-semibold text-blue-600 my-4 flex justify-center items-center gap-6'>
                   {data.message} 
                    <CiCircleRemove className='text-3xl rounded-lg text-red-600 hover:text-red-500' onClick={() => setData({...data, message: undefined})} />
                </p>
            </section>
        }
      
    </section>
    </>
  )
}
