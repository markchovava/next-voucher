"use client"

import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import Link from "next/link"
import { useEffect, useRef, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
/* Toast */
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function IssueVoucher() {
    const phoneRef = useRef(null);
    const receipt_noRef = useRef(null);
    const amountRef = useRef(null);
    const campaign_idRef = useRef(null);
    const [errMsg, setErrMsg] = useState({})
    const [data, setData] = useState({});
    const { getAuthToken } = tokenAuth();
    const [campaign, setCampaign] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [message, setMessage] = useState('');
    const [isMsg, setIsMsg] = useState(false)
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
    }}

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* CAMPAIGN */
    async function campaignData() {
        const url = `campaign/active`;
        try{
            const result = await axiosClientAPI.get(url, config)
            .then((response) => {
                setCampaign(response.data.data);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
        } 
    }
    /* POST DATA */
    async function postData() {
        if(!data.phone){
            const message = 'Phone Number is required.';
            setErrMsg({message:  message});
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            setIsSubmit(false);
            return;
        }
        const formData = {
            phone: data.phone,
            receipt_no: data.receipt_no,
            amount: Number(data.amount) * 100,
            campaign_id: Number(data.campaign_id),
        };

        try{
            const result = await axiosClientAPI.post(`program/store-by-amount`, formData, config)
            .then((response) => {
                if(response.data.status == 0){
                    const message = response.data.message;
                    setErrMsg({message: message});
                    toast.success(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                    setIsSubmit(false);
                    return;
                }
                setMessage(response.data.message);
                phoneRef.current.value = '';
                receipt_noRef.current.value = '';
                amountRef.current.value = '';
                campaign_idRef.current.value = '';
                setData({ phone:'', receipt_no: '',amount: null,campaign_id: ''});
                setIsSubmit(false);
                setIsMsg(true);
            })
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }
    }

    useEffect(() => {
        campaignData();
    }, []);

    /* useEffect(() => {
        isSearch == true && searchData();
    },[isSearch]);  */

    useEffect(() => {
        isSubmit == true && postData();
    },[isSubmit])


    if(!campaign){
        return (
        <>
          <div className="w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
              <h6 className='animate-pulse text-2xl'>Loading...</h6>
          </div>
        </>
        )
    }


  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[2rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Issue Voucher</h1>
                <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div> 
        <section className="mx-auto lg:w-[70%] w-[90%] pb-[1.5rem]">
            <div className="w-[100%] mb-[2rem] flex items-center justify-between gap-4">
                <div className='flex items-center justify-start gap-4'>
                </div>
                {/*  */}  
                <div className='flex items-center justify-start gap-4'>
                    <Link
                        href='/campaign-program'
                        className='px-[2rem] py-[1rem] rounded-xl text-white bg-gradient-to-br from-[#6c0868] to-purple-800 hover:bg-gradient-to-br hover:from-purple-800 hover:to-[#6c0868] transition ease-in-out duration-200'>
                        My Campaigns
                    </Link>        
                </div> 

            </div>
                {errMsg.message && 
                    <div className="text-red-600 text-lg flex items-center justify-center">
                        {errMsg.message}
                    </div>
                }   
            <div className="w-[100%] mb-[2rem] bg-white drop-shadow-lg p-[2rem]">
                {/* Phone */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Phone:</h6>
                    <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                        <input 
                            type="phone"
                            name="phone"
                            ref={phoneRef} 
                            value={data?.phone}
                            onChange={handleInput} 
                            placeholder="Write your Phone here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    
                    </div>
                </div>
                {/* AMOUNT */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Receipt No. (Optional):</h6>
                    <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                        <input 
                            type="text" 
                            ref={receipt_noRef} 
                            name="receipt_no" 
                            onChange={handleInput}
                            value={data?.receipt_no}
                            placeholder="Write Receipt Number here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    
                    </div>
                </div>
                {/* Amount (in cents) */}
                <div>
                    <h6 className='font-bold pb-1 text-lg'>Amount:</h6>
                    <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                        <input 
                            type="number" 
                            name="amount" 
                            ref={amountRef} 
                            onChange={handleInput}
                            placeholder="Write Amount here..." 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    
                    </div>
                </div>
                {/* Campaign */}
                {campaign.length > 0 &&
                    <div>
                        <h6 className='font-bold pb-1 text-lg'>Campaign:</h6>
                        <div className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                            <select  
                                name="campaign_id" 
                                ref={campaign_idRef} 
                                onChange={handleInput}
                                value={data?.campaign_id}
                                placeholder="Write Amount in Cents here..." 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                                <option value=''>Select an option.</option> 
                                { campaign.map((item, i) => (
                                    <option key={i} value={item.id}>{item.name}</option>
                                )) }
                            </select>
                        
                        </div>
                    </div>
                }
                {/* SUBMIT */}
                <div>
                    <div className='flex items-center justify-center mb-[2rem]'>
                        <button
                            onClick={() => {
                                setIsSubmit(true);
                                postData();
                            }}
                            className='lg:w-[20%] w-[100%] lg:px-[2.5rem] py-[1rem] text-lg text-center rounded-xl text-white bg-gradient-to-br from-orange-600 to-red-700 hover:bg-gradient-to-br hover:from-red-700 hover:to-orange-600 transition ease-in-out duration-200'>
                            {isSubmit === true ? 'Processing' : 'Submit'}
                        </button>
                    
                    </div>
                </div>
            
            </div>
        </section>
        {isMsg === true &&
            <section className="w-[100%] text-lg mb-[2rem]">
                <div className="bg-white drop-shadow-xl mx-auto lg:w-[70%] w-[90%] py-[1rem] flex lg:flex-row flex-col items-center justify-between gap-6">
                    <p className='w-[90%]  text-xl text-center font-semibold text-green-600 my-4'>
                        {message}
                    </p>
                    <div className="w-[10%]  text-xl flex items-center justify-start text-left">
                        <CiCircleRemove
                            onClick={() => {
                                setIsMsg(false);
                                setData({});
                            }} className="text-3xl hover:text-red-600" />
                    </div>
                </div>
            </section>
        }
    </>
  )
}
