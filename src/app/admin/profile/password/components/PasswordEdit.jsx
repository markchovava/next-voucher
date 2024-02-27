"use client"

import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsArrowRight } from "react-icons/bs";




export default function PasswordEdit() {
  const { getAuthToken } = tokenAuth();
  const router = useRouter()
  const [data, setData] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  }}

  const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
  }

  
  /* SAVE DATA */
  async function postData() {
    try{
      const result = await axiosClientAPI.post(`profile/password/`, data, config)
        .then((response) => {
          setData(() => response.data.data)
          setIsSubmit(false);
          router.push(`/admin/profile`)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
        setIsSubmit(false);
    } 
  } 



  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);




  return (
    <section className='w-[100%] h-auto bg-gray-50'>
        <div className="mx-auto w-[75%] py-[4rem]">
            {/* Title */}
            <div className="w-[100%] flex items-center justify-center flex-col">
                <h1 className="leading-none pb-[1.5rem] text-center font-extrabold text-[4rem]">
                    Edit Password.</h1>
                <hr className="border-t-4 border-black w-[20%] pb-[2.5rem]" />
            </div>

            {/* <div className='flex justify-end items-center pb-[2rem] '>
                <Link
                      href='/admin/profile'
                      className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg  px-8 py-3 bg-slate-500 text-white border hover:bg-gradient-to-br  hover:from-slate-500 hover:to-slate-700 hover:text-white'>
                      View</Link>
            </div> */}
    
           
            {/* ROW */}
            <div className="w-[100%] mb-[2rem]">
                <input 
                  type="password" 
                  name='password'
                  onChange={handleInput}
                  placeholder="Write your New Password here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>
            {/* ROW */}
            <div className="w-[100%] mb-[2rem]">
                <input 
                  type="password" 
                  name='password_confirmation'
                  onChange={handleInput}
                  placeholder="Write Password Confirmation here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
            </div>  

            <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsSubmit(true)}
                  className='w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2rem] bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700'>
                  {isSubmit == true ? 
                    'Processing' :
                      <>
                       Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                      </>
                    }
                </button>
            </div>
        </div>
      </section>
  )
}
