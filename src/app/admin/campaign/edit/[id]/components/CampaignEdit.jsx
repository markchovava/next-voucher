"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Loader from '@/components/Loader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';




export default function CampaignEdit({ id }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({}) 
    const [startDate, setStartDate] = useState({})
    const [endDate, setEndDate] = useState({})
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
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`campaign/${id}`, config)
            .then((response) => {
              setData(response.data.data);
              const start_date = response.data.data.start_date.split('/')
              const end_date = response.data.data.end_date.split('/')
              setStartDate({day: start_date[0], month: start_date[1], year: start_date[2]});
              setEndDate({day: end_date[0], month: end_date[1], year: end_date[2]});
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
          start_date: `${startDate.day}/${startDate.month}/${startDate.year}`,
          end_date: `${endDate.day}/${endDate.month}/${endDate.year}`,
          quantity: Number(data.quantity),
          points_per_voucher: Number(data.points_per_voucher),
          total_price: calculateTotal(),
        }
        console.log(formData)
        try{
          const result = await axiosClientAPI.post(`campaign/${id}`, formData, config)
            .then((response) => {
              router.push(`/admin/campaign/${id}`)
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
        getData();
        getCompany();
        getPrice();
        setIsLoading(false);
    }, []);


    useEffect(() => { 
        isSubmit && postData();
        setIsClicked(false);
    }, [isSubmit]);
  


  return (
    <>
        {isLoading === true ? <Loader /> :
        <>
            {/* Title */}
            <div className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                    Edit Campaign</h1>
                <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
            </div>
           
            {/*  */}
            <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] pb-[3rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                    Campaign Info
                </div>

                <div className="w-[100%] mb-[2rem]">
                    <h6 className='font-bold pb-1'>Name:</h6>
                    <input 
                        type="text" 
                        name="name" 
                        value={data.name}
                        onChange={handleInput}
                        placeholder="Write your Name here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                </div>
                <div className="w-[100%] mb-[2rem]">
                    <h6 className='font-bold pb-1'>Description:</h6>
                    <textarea
                        name="description" 
                        value={data.description}
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
                                value={startDate.day}
                                onChange={(e) => setStartDate({...startDate, day: e.target.value})}
                                placeholder="DD" 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                        </div>
                        <div className="w-[50%]">
                            <h6 className='pb-1'>Month:</h6>
                            <input 
                                type="number" 
                                name="start_month"  
                                value={startDate.month}
                                onChange={(e) => setStartDate({...startDate, month: e.target.value})}
                                placeholder="MM" 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                        </div>
                        <div className="w-[50%]">
                            <h6 className='pb-1'>Year:</h6>
                            <input 
                                type="number" 
                                name="start_year"  
                                value={startDate.year}
                                onChange={(e) => setStartDate({...startDate, year: e.target.value})}
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
                                value={endDate.day}
                                onChange={(e) => setEndDate({...endDate, day: e.target.value})}
                                placeholder="DD" 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                        </div>
                        <div className="w-[50%]">
                            <h6 className='pb-1'>Month:</h6>
                            <input 
                                type="number" 
                                name="end_month"  
                                value={endDate.month}
                                onChange={(e) => setEndDate({...endDate, month: e.target.value})}
                                placeholder="MM" 
                                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
                        </div>
                        <div className="w-[50%]">
                            <h6 className='pb-1'>Year:</h6>
                            <input 
                                type="number" 
                                name="end_year"  
                                value={endDate.year}
                                onChange={(e) => setEndDate({...endDate, year: e.target.value})}
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
                            value={data.quantity}
                            onChange={handleInput}
                            placeholder="00" 
                            className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />

                    </div>
                    <div className='w-[20%]'>
                        <h6 className='font-bold pb-1'>Points Per Voucher:</h6>
                        <input 
                            type="number" 
                            name="points_per_voucher"
                            value={data.points_per_voucher}  
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
        }


    </>
  )
}
