"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { baseURL } from '@/api/baseURL';
import { tokenAuth } from '@/api/tokenAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';




export default function CampaignAdd() {
    const router = useRouter();
    const [data, setData] = useState({}) 
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [price, setPrice] = useState({});
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function getPrice() {
        try{
          const result = await axios.get(`${baseURL}voucher-price`)
            .then((response) => {
                console.log('voucher-price');
                console.log(response.data.data);
                setPrice(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
   
    /* POST DATA */
    async function postData() {
        setIsSubmit(false);
        const formData = {
          name: data.name,
          description: data.description,
          start_date: `${data.start_day}/${data.start_month}/${data.start_year}`,
          end_date: `${data.end_day}/${data.end_month}/${data.end_year}`,
          vouchers_quantity: Number(data.vouchers_quantity),
          points_per_voucher: Number(data.points_per_voucher),
          price_of_voucher: Number(data.price_of_voucher),
          total_cost: Number(calculateTotal() * 100),
          /* REWARD */
          reward_name: data.reward_name,
          reward_points: data.reward_points,
          /* COMPANY */
          company_name: data.company_name,
          company_phone: data.company_phone,
          company_address: data.company_address,
          company_email : data.company_email,
          company_website: data.company_website,
        };
        console.log(formData)
        try{
          const result = await axiosClientAPI.post(`campaign`, formData, config)
            .then((response) => {
              router.push('/campaign')
              setIsClicked(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsClicked(false);
        }
    }  

    const calculateTotal = () => {
        let unitPrice = price.price / price.quantity;
        const totalPrice = unitPrice * Number(data.vouchers_quantity);
        return totalPrice;
    }

    useEffect(() => {
        getPrice();
    }, []);

    useEffect(() => { 
        isSubmit && postData();
    }, [isSubmit]);
  

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Add Campaign</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div>

         {/* Company Info */}
         <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Company Info
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Company Name:</h6>
                <input 
                    type="text" 
                    name="company_name" 
                    onChange={handleInput}
                    placeholder="Write your Company Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Company Phone:</h6>
                <input 
                    type="text" 
                    name="company_phone" 
                    onChange={handleInput}
                    placeholder="Write your Company Phone here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Company Address:</h6>
                <input 
                    type="text" 
                    name="company_address" 
                    onChange={handleInput}
                    placeholder="Write your Company Address here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Company Email:</h6>
                <input 
                    type="text" 
                    name="company_email" 
                    onChange={handleInput}
                    placeholder="Write your Company Email here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Company Website:</h6>
                <input 
                    type="text" 
                    name="company_website" 
                    onChange={handleInput}
                    placeholder="Write your Company Website here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
        </section>

        {/* Reward Info */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Reward Info
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Reward Name:</h6>
                <input 
                    type="text" 
                    name="reward_name" 
                    onChange={handleInput}
                    placeholder="Write your Reward Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Reward Points:</h6>
                <input 
                    type="text" 
                    name="reward_points" 
                    onChange={handleInput}
                    placeholder="Write your Company Website here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
        </section>

        {/* Campaign Info */}
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Campaign Info
            </div>

            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Name:</h6>
                <input 
                    type="text" 
                    name="name" 
                    onChange={handleInput}
                    placeholder="Write your Name here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Description:</h6>
                <textarea
                    name="description" 
                    onChange={handleInput}
                    placeholder="Write your Description here..." 
                    className="w-[100%] h-[8rem] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300"></textarea>
            </div>
        </section>
        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto py-[2rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'> 
            <section className='flex lg:flex-row flex-col items-center justify-start gap-5 lg:gap-8'>
                <div className="w-[100%] lg:w-[50%] mb-[2rem]">
                    <h6 className='font-bold pb-1'>Start Date:</h6>
                    <div className="flex items-center justify-start gap-4">
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Day:</h6>
                        <input 
                            type="number" 
                            name="start_day" 
                            onChange={handleInput}
                            placeholder="DD" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Month:</h6>
                        <input 
                            type="number" 
                            name="start_month"  
                            onChange={handleInput}
                            placeholder="MM" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Year:</h6>
                        <input 
                            type="number" 
                            name="start_year"  
                            onChange={handleInput}
                            placeholder="YYYY" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    </div>
                </div>  
                <div className="w-[100%] lg:w-[50%] mb-[2rem]">
                    <h6 className='font-bold pb-1'>End Date:</h6>
                    <div className="flex items-center justify-start gap-4">
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Day:</h6>
                        <input 
                            type="number" 
                            name="end_day" 
                            onChange={handleInput}
                            placeholder="DD" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Month:</h6>
                        <input 
                            type="number" 
                            name="end_month"  
                            onChange={handleInput}
                            placeholder="MM" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    <div className="w-[50%]">
                        <h6 className='pb-1'>Year:</h6>
                        <input 
                            type="number" 
                            name="end_year"  
                            onChange={handleInput}
                            placeholder="YYYY" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                    </div>
                    </div>
                </div>  
            </section>
            <div className="w-[100%] mb-[2rem]">
                <h6 className='font-bold pb-1'>Price of Voucher (cents):</h6>
                <input 
                    type="number" 
                    name="price_of_voucher" 
                    onChange={handleInput}
                    placeholder="Write your Price per Voucher here..." 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            <section className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                <div className='w-[25%]'>
                    <h6 className='font-bold pb-1'>Vouchers Quantity:</h6>
                    <input 
                        type="number" 
                        name="vouchers_quantity"  
                        onChange={handleInput}
                        placeholder="00" 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />

                </div>
                <div className='w-[25%]'>
                    <h6 className='font-bold pb-1'>Points Per Voucher:</h6>
                    <input 
                        type="number" 
                        name="points_per_voucher"  
                        onChange={handleInput}
                        placeholder="00" 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />

                </div>
                <div className='w-[25%] px-[1rem] text-center lg:text-right'>
                    <h6 className='font-bold pb-1'>Cost Price:</h6>
                    <div className="w-[100%] font-bold text-xl py-[1rem]">
                        {price.price ? '$' + (price.price / 100).toFixed(2) : (0).toFixed(2)} for {price.quantity ? price.quantity : 0}
                    </div>
                </div>
                <div className='w-[25%] px-[1rem] text-center lg:text-right'>
                    <h6 className='font-bold pb-1'>Total Cost:</h6>
                    <div className="w-[100%] font-bold text-xl py-[1rem] text-blue-800">
                        ${calculateTotal() ? (calculateTotal() / 100).toFixed(2) : (0).toFixed(2)}
                    </div>
                </div>
            </section>
        </section>

        <div className="w-[100%] flex items-center justify-center gap-4 pb-[4rem]">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                    setIsClicked(true)
                  }}
                  disabled={isClicked == true ? true : false}
                  className='lg:w-[20%] group transition ease-in-out duration-200 bg-[#6c0868] hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] text-white border'>
                  {isClicked === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>

       


    </>
  )
}
