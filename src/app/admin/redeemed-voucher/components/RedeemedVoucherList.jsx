"use client";

import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'





export default function RedeemedVoucherList() {

    const [data, setData] = useState(null);
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };
    

    async function paginationHandler(url) {
      try{
        const result = await axios.get(url, config)
        .then((response) => {
          setData(response.data.data)
          setPrevURL(response.data.links.prev)
          setNextURL(response.data.links.next)
        })
      } catch (error) {
        console.error(`Error: ${error}`)
      }     
    }

     /* SEARCH DATA */
    async function searchData() {
      if(search == ''){
          try{
              const result = await axiosClientAPI.get(`redeem-voucher`, config)
              .then((response) => {
                  setData(response.data.data)
                  setPrevURL(response.data.links.prev)
                  setNextURL(response.data.links.next)
                  setSearch(search)
                  setSearchSubmit(false)

              })
          } catch (error) {
              console.error(`Error: ${error}`)
          }  
      }
          try{
              const result = await axiosClientAPI.get(`redeem-voucher?search=${search}`, config)
              .then((response) => {
                  setData(response.data.data)
                  console.log(response.data.data)
                  setPrevURL(response.data?.links?.prev)
                  setNextURL(response.data?.links?.next)
                  setSearch(search)
                  setSearchSubmit(false)
              })
          } catch (error) {
              console.error(`Error: ${error}`)
          }   
    }

    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`redeem-voucher`, config)
            .then((response) => {
              setData(response.data.data);
              console.log('redeem-voucher');
              console.log(response.data);
              setPrevURL(response.data.links?.prev)
              setNextURL(response.data.links?.next)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    }
    
    useEffect(() => { 
      searchSubmit == true && searchData()
    }, [searchSubmit]); 

    useLayoutEffect(() => {
      getData();
    }, [])

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
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Redeem Vouchers List</h1>
              <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>

         {/* SEARCH */}
         <div className='mx-auto w-[90%] flex items-center justify-between h-auto pb-[1.2rem]'>
                <div className='lg:w-[40%] w-[70%] flex items-center justify-start gap-2'>
                    <input 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type='text'
                      placeholder='Search by Code...' 
                      className='w-[100%] py-3 px-3 rounded-lg outline-none border border-purple-300' 
                    />
                    <button 
                      onClick={() => setSearchSubmit(true)}
                      className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-7 py-3 bg-[#6c0868] text-white border hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                      Search</button>
                </div>

                <div className='flex items-center justify-end gap-3'>    
                </div>

          </div>

          <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
              {/* ROW */}
              <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                    <div className="w-[25%] p-3 ">CODE </div>
                    <div className="w-[25%] p-3 border-l border-slate-300">STATUS </div>
                    <div className="w-[25%] p-3 border-l border-slate-300">CAMPAIGN </div>
                    <div className="w-[25%] p-3 border-l border-slate-300">USER </div>
              </div>

              <section className='border border-slate-300'>
                {/* ROW */}
                {data?.length > 0 ?
                  data?.map((item, i) => (
                  <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start py-3 border-b border-slate-300">
                    <div className="w-[25%] p-3 ">
                        {item.code}</div>
                    <div className="w-[25%] p-3 border-l border-slate-300">
                        <span className='bg-green-700 text-white px-2 py-1 rounded-lg'>
                            {item.status}
                        </span>
                    </div>
                    <div className="w-[25%] p-3 border-l border-slate-300">
                        {item?.campaign?.name}
                    </div>
                    <div className="w-[25%] p-3 border-l border-slate-300">
                        {item?.user?.name ? item?.user?.name : item?.user?.email}</div>
                  </div>
                  ))
                :
                  <div className="w-[50rem] lg:w-[100%] flex items-center justify-center py-4 border border-slate-200 ">
                      <h6 className='text-2xl'>No Data Available at the moment.</h6>
                  </div>
                }

              </section>

            
             
           
          </section>

          {/* PAGINATION */}
          <div className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[3rem] pt-[2rem]"> 
          {prevURL &&
            <button 
              onClick={() => paginationHandler(prevURL)}
              className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
              <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-translate-x-1' />
              Prev 
            </button>
          }
          {nextURL && 
            <button
              onClick={() => paginationHandler(nextURL)}
              className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
              Next 
              <BsArrowRight className='transition ease-in-out duration-300 group-hover:translate-x-1' />
            </button> 
          }
          </div>
    </>
  )
}
