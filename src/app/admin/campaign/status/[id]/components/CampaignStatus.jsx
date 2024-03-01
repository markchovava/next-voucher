"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';




export default function CampaignStatus({ id }) {
    const router = useRouter();
    const [data, setData] = useState({}) 
    const { getAuthToken } = tokenAuth();
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };
    
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`campaign/${id}`, config)
            .then((response) => {
              setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    /* POST DATA */
    async function postData() {
        setIsSubmit(false);
        try{
          const result = await axiosClientAPI.post(`campaign/status/${id}`, data, config)
            .then((response) => {
              router.push(`/admin/campaign/${id}`);
              setIsClicked(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsClicked(false);
        }
    }  

    useEffect(() => {
        getData();
    }, []);


    useEffect(() => { 
        isSubmit && postData();
    }, [isSubmit]);


    if(!data){
        return <>
          <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
              <h6 className='text-2xl'>Loading...</h6>
          </div>
        </>
    }
  


    return (
        <>
            {/* Title */}
            <div className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                    Edit Campaign Status
                </h1>
                <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
            </div>
            
            {/*  */}
            <section className='mx-auto w-[90%] lg:overflow-hidden overflow-auto pt-[2rem] pb-[3rem] px-[1.5rem]  mb-[4rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] text-5xl font-light flex items-center justify-start">
                    Campaign Status
                </div>

                <div className="w-[100%] mb-[2rem]">
                    <h6 className='font-bold pb-1'>Name:</h6>
                    <select
                        name="status" 
                        value={data.status}
                        onChange={handleInput}
                        placeholder="Write your Name here..." 
                        className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                            <option value=''>Select an Option.</option>
                            <option value='Processing' selected={data.status === 'Processing' && 'selected'}>
                                Processing</option>
                            <option value='Active' selected={data.status === 'Active' && 'selected'}>
                                Active</option>
                            <option value='Completed' selected={data.status === 'Completed' && 'selected'}>
                                Completed</option>
                    </select>
                </div>
                
            
                


                <div className="w-[100%] flex items-center justify-center gap-4">
                <button 
                    onClick={ () => {
                        setIsSubmit(true) 
                        setIsClicked(true)
                    }}
                    disabled={isClicked == true ? true : false}
                    className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                    { isClicked === true ? 'Processing' : 
                        <>
                        Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                        </>
                    }
                
                </button>
            </div>
            
        
            </section>
        </> 
    )
}
