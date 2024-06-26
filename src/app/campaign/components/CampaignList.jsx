"use client";

import { baseURL } from '@/api/baseURL';
import { tokenAuth } from '@/api/tokenAuth';
import { tokenRole } from '@/api/tokenRole';
import fetcherWeb from '@/swr/fetcherWeb';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'




export default function CampaignList() {
    const { getRoleToken } = tokenRole();
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState({});
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    

    async function paginationHandler(url) {
      try{
        const result = await axios.get(url)
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
              const result = await axios.get(`${baseURL}campaign`)
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
              const result = await axios.get(`${baseURL}campaign?search=${search}`)
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
          const result = await axios.get(`${baseURL}campaign`)
            .then((response) => {
              setData(response.data.data);
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

    //if(Object.keys(data).length === 0){
    if(!data){
      return (
        <>
            <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
                <h6 className='animate-pulse text-2xl'>Loading...</h6>
            </div>
        </>
      )
    }


  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              All Campaigns
            </h1>
            <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>

         {/* SEARCH */}
         <div className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between gap-4 h-auto pb-[1.2rem]'>
                <div className='lg:w-[40%] w-[100%] flex items-center justify-start gap-2'>
                    <input 
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type='text'
                      placeholder='Search by name...' 
                      className='w-[100%] py-4 px-3 rounded-lg outline-none border border-purple-300' 
                    />
                    <button 
                      onClick={() => setSearchSubmit(true)}
                      className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-7 py-4 border text-white bg-[#6c0868] hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-[#3d003a] '>
                      Search</button>
                </div>
                {getAuthToken() &&
                  <div className='flex items-center justify-end gap-3'>
                    <Link
                      href='/campaign/add'
                      className='transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-gradient-to-br from-blue-600 to-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-blue-600 hover:text-white '>
                      Add Campaign</Link>
                    <Link
                      href='/campaign-program/issue-voucher'
                      className='transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-gradient-to-br from-green-700 to-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-green-700 hover:text-white '>
                      Issue Voucher</Link>
                    <Link
                      href='/voucher'
                      className='transition-all duration-150 ease-in rounded-lg px-7 py-4 bg-gradient-to-br from-[#6c0868] to-[#3d003a] text-white border hover:bg-gradient-to-br  hover:from-[#3d003a] hover:to-[#6c0868] hover:text-white '>
                      Redeem Voucher</Link>

                  </div>
                }
          </div>

          <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
              {/* ROW */}
              <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                    <div className="w-[20%] p-3 ">NAME</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">COMPANY</div>
                    <div className="w-[15%] p-3 border-l border-slate-300">DURATION</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">REWARD</div>
                    <div className="w-[15%] p-3 border-l border-slate-300">R. POINTS</div>
                    <div className="w-[10%] p-3 border-l border-slate-300">ACTION</div>
              </div>

              <section className='border border-slate-300'>
                {/* ROW */}
                {data?.length > 0 ?
                  data?.map((item, i) => (
                  <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start py-3 border-b border-slate-300">
                    <div className="w-[20%] p-3 ">
                        {item.name}</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">
                      {item?.company_name ? item?.company_name : 'Company not added.'}
                    </div>
                    <div className="w-[15%] p-3 border-l border-slate-300">
                      {`${item.start_date ? item.start_date : 'Not yet added.'} to ${item.end_date ? item.end_date : 'Not yet added.'}`}</div>
                    <div className="w-[20%] p-3 border-l border-slate-300">{item.reward_name}</div>
                    <div className="w-[15%] p-3 border-l border-slate-300">{item.reward_points} points</div>
                    <div className="w-[10%] p-3 border-l border-slate-300">
                      <Link href={`/campaign/${item.id}`}> 
                        <FaEye className='text-xl hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                      </Link>
                    </div>
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
