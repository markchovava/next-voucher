"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';




export default function CampaignAdd({ id }) {
    const router = useRouter();
    const [data, setData] = useState({}) 
    const [company, setCompany] = useState({}) 
    const { getAuthToken } = tokenAuth();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [price, setPrice] = useState({});
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
          const result = await axiosClientAPI.get(`voucher-price`, config)
            .then((response) => {
                console.log(response.data.data);
                setPrice(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
    async function getCompany() {
        try{
          const result = await axiosClientAPI.get(`company/${id}`, config)
            .then((response) => {
              setCompany(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    /* POST DATA */
    async function postData() {
        setIsSubmit(false);
        const formData = {
          company_id: company.id,
          name: data.name,
          description: data.description,
          start_date: `${data.start_day}/${data.start_month}/${data.start_year}`,
          end_date: `${data.end_day}/${data.end_month}/${data.end_year}`,
          quantity: Number(data.quantity),
          points_per_voucher: Number(data.points_per_voucher),
          total_price: calculateTotal(),
        }
        console.log(formData)
        try{
          const result = await axiosClientAPI.post(`campaign-company`, formData, config)
            .then((response) => {
              router.push('/admin/campaign-company/list')
            })
          } catch (error) {
            console.error(`Error: ${error}`)
        }
    }  

    const calculateTotal = () => {
        let unitPrice = price.price / price.quantity;
        const totalPrice = unitPrice * Number(data.quantity);
        return totalPrice;
    }

    useEffect(() => {
        getCompany();
        getPrice();
    }, []);


    useEffect(() => { 
        isSubmit && postData();
        setIsClicked(false);
    }, [isSubmit]);
  


  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Edit Campaign</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div>

        {/*  */}
        <section className='mx-auto w-[90%] py-[2rem] px-[1.5rem] mb-[1.5rem] bg-white drop-shadow-lg'>
            <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                Company Info
            </div>
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Name:</label>
                <div className='w-[80%]'>
                    {company.name} </div>
            </div>
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Email:</label>
                <div className='w-[80%]'>
                    {company.email} </div>
            </div>
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Address:</label>
                <div className='w-[80%]'>
                    {company.address} </div>
            </div>
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Phone:</label>
                <div className='w-[80%]'>
                    {company.phone} </div>
            </div>
            <div className="w-[100%] flex items-center justify-start">
                <label className='w-[20%] gap-3 font-semibold'>Website:</label>
                <div className='w-[80%]'>
                    {company.website} </div>
            </div>

        </section>


        <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] pb-[3rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
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

            <section className='flex lg:flex-row flex-col items-center justify-start gap-5 mb-[2rem]'>
                <div className='w-[30%]'>
                    <h6 className='font-bold pb-1'>Quantity:</h6>
                    <input 
                        type="number" 
                        name="quantity"  
                        onChange={handleInput}
                        placeholder="00" 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />

                </div>
                <div className='w-[20%]'>
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
                        ${`${(price.price / 100).toFixed(2)} for ${price.quantity}`}
                    </div>
                </div>
                <div className='w-[25%] px-[1rem] text-center lg:text-right'>
                    <h6 className='font-bold pb-1'>Total Price:</h6>
                    <div className="w-[100%] font-bold text-xl py-[1rem] text-blue-800">
                        ${calculateTotal() ? (calculateTotal() / 100).toFixed(2) : (0).toFixed(2)}
                    </div>
                </div>
            </section>

            <div className="w-[100%] flex items-center justify-center gap-4">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                    setIsClicked(true)
                  }}
                  disabled={isClicked == true ? true : false}
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                  {isClicked === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              
              </button>
        </div>
           
       
        </section>


    </>
  )
}
