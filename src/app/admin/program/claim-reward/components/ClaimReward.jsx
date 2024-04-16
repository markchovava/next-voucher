"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import Link from "next/link"
import { useEffect, useState } from "react";
import { BsArrowRight, BsChevronRight } from "react-icons/bs"
import { CiCircleRemove, CiSquareRemove } from "react-icons/ci";
import { useZxing } from "react-zxing";



export default function ClaimReward() {
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth()
    const [isSubmit, setIsSubmit] = useState(false);
    const [isMessage, setIsMessage] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isSearchResult, setIsSearchResult] = useState(false);
    const [mode, setMode] = useState('QRCode');
    const [isQrScan, setIsQrScan] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }};
    
    const { ref } = useZxing({
        onDecodeResult(result) {
          setSearchInput(result.getText())
        },
        paused: isQrScan
    });
   

  
    /* SEARCH DATA */
    async function searchData() {
        try{
            const result = await axiosClientAPI.get(`redeem-voucher/voucher-search?search=${searchInput}`, config)
            .then((response) => {
                if(response.data.status === 1){
                    setData(response.data.data);
                    console.log(response.data.data);
                    setIsSearchResult(true);
                } else {
                    setData(response.data);
                    console.log(response.data);
                    setIsSearchResult(true);
                }
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
            redeem_voucher_id: data.id,
            campaign_id: data.campaign.id,
            code: searchInput,
            program_id: data.program_id,
            reward_points: data.campaign.reward_points,
        }
        try{
            const result = await axiosClientAPI.post(`claimed-voucher`, formData, config)
            .then((response) => {
                setData({});
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
                <Link href='/voucher' className='font-semibold'>
                Voucher </Link>
            </li>
            </ul>
        </div>
    </section>
     {/* Title */}
     <div className="w-[100%] flex items-center justify-center flex-col">
        <h1 className="leading-none pt-[2rem] pb-[1.5rem] text-center font-black text-[4rem]">
            Claim Reward</h1>
            <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
    </div> 

    <section className="mx-auto lg:w-[70%] w-[90%] pb-[2rem]">
        <div className="w-[100%] mb-[2rem] flex items-center justify-between gap-4">
            <div className='flex items-center justify-start gap-4'>
                <button 
                    onClick={() => {
                        setMode('QRCode');
                        setIsQrScan(!isQrScan);
                    }}
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-blue-600 to-cyan-700 hover:bg-gradient-to-br hover:from-cyan-700 hover:to-blue-600 transition ease-in-out duration-200'>
                    QR Code</button>   
            </div>
            <div className='flex items-center justify-start gap-4'>
                <Link
                    href='/admin/campaign'
                    className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-[#6c0868] to-purple-800 hover:bg-gradient-to-br hover:from-purple-800 hover:to-[#6c0868] transition ease-in-out duration-200'>
                    Campaigns</Link>
                
            </div> 
        </div>

         {/* QR CODE */}
         <div className={`${isQrScan == false ? 'w-[100%] mb-[1rem]' : 'hidden' } flex justify-center items-start`}>
            <div className="w-[30rem] h-[20rem]">
                <video ref={ref} className="w-[100%] h-[100%] object-cover bg-white drop-shadow-xl"/>
            </div>
        </div>


        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1 text-lg'>Voucher Code</h6>
            <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[4rem]'>
                <input 
                    type="text" 
                    name="code" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Claim Voucher here..." 
                    className="lg:w-[80%] w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                <button 
                     onClick={ () => {
                        setIsSearch(true) 
                      }}
                    className='lg:w-[20%] w-[100%] lg:px-[2.5rem] py-[1rem] text-center rounded-xl text-white bg-gradient-to-br from-orange-600 to-red-700 hover:bg-gradient-to-br hover:from-red-700 hover:to-orange-600 transition ease-in-out duration-200'>
                    { isSearch === true ? 
                        'Processing' : 
                        'Claim Voucher'
                    }
                </button>
            </div>
        </div>

        {isSearchResult == true && data.campaign &&
            <section className="w-[100%] text-lg mb-[2rem] p-[1rem] bg-white drop-shadow-xl">
                <p className='text-xl font-semibold text-green-600 mt-4 mb-8 text-center'>
                    This voucher is available. Click the button below to Claim Reward it.
                </p>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Status:</div>
                    <div className='w-[80%]'>
                        <span className={`bg-green-700 text-white px-2 py-1 rounded-lg`}>
                            {data.status}
                        </span>
                    </div>      
                </div>
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
                <div className='my-4'>
                    <hr className="border-bottom border-slate-200" />  
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reciever Name:</div>
                    <div className='w-[80%] font-semibold'>{data.user?.name}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reciever ID Number:</div>
                    <div className='w-[80%] font-semibold'>{data.user?.id_number}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reciever Phone:</div>
                    <div className='w-[80%] font-semibold'>{data.user?.phone}</div>      
                </div>
                <div className='flex items-start justify-start gap-4 mb-2'>
                    <div className='w-[20%]'>Reciever Email:</div>
                    <div className='w-[80%] font-semibold'>{data.user?.email}</div>      
                </div>
                <div className='my-4'>
                    <hr className="border-bottom border-slate-200" />  
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
                            setIsSubmit(true);
                            setIsSearchResult(false)
                        }}
                        className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-gradient-to-br from-blue-600 to-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-blue-600'>
                        { isSubmit === true ? 'Processing' : 
                            <>
                            Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
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
