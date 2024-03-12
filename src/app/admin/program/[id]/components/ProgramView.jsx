"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsChevronRight } from 'react-icons/bs';



export default function ProgramView({ id }) {
    const [data, setData] = useState({});
    const [voucher, setVoucher] = useState([]);
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };

    /* PAGINATION */
     async function paginationHandler(url) {
        try{
          const result = await axiosClientAPI.get(url, config)
          .then((response) => {
                setVoucher(response.data.data)
                setPrevURL(response.data.links.prev)
                setNextURL(response.data.links.next)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }     
    
    }

    async function getData() {
        try{
          const result = await axiosClientAPI.get(`program/${id}`, config)
            .then((response) => {
              setData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    async function getVoucher() {
        try{
          const result = await axiosClientAPI.get(`program-voucher/by-program-user/${id}`, config)
            .then((response) => {
              setVoucher(response.data.data);
              setPrevURL(response.data?.links?.prev)
              setNextURL(response.data?.links?.next)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    useEffect(() => { 
        getData();
        getVoucher();
    }, []);

    if(!data.total_points && voucher.length <= 0){
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
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                View Program</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 
        {/* Link */}
        <div className='mx-auto w-[90%] flex justify-end items-center pb-[2rem] '>
            <Link
                href='/admin/program'
                className='transition-all duration-150 ease-in rounded-lg px-8 py-4 bg-gradient-to-br from-blue-600 to-[#6c0868] text-white border hover:bg-gradient-to-br hover:from-[#6c0868] hover:to-blue-600 hover:text-white'>
                Program List</Link>
        </div>
        {/* Program Info */}
        <section className='w-[100%] h-auto pb-[3rem]'>
            <section className='mx-auto w-[90%] p-[2.5rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <h1 className='font-light text-5xl'>Program Info</h1>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Campaign Name:</label>
                    <div className='w-[80%]'>
                        {data.user?.name ? data.user?.name : data.user?.email } </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Campaign Name:</label>
                    <div className='w-[80%]'>
                        {data.campaign?.name} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>User Email:</label>
                    <div className='w-[80%]'>
                        {data.user?.email} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Duration:</label>
                    <div className='w-[80%] flex items-center justify-start gap-2'>
                        <span>{data.start_date ? data.start_date : '--/--/--'}</span> to 
                        <span>{data.end_date ? data.end_date : '--/--/--'}</span>
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Reward:</label>
                    <div className='w-[80%]'>
                        {data.reward_name}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Reward Points:</label>
                    <div className='w-[80%]'>
                        {data.reward_points}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>User Points:</label>
                    <div className='w-[80%]'>
                        {data.total_points}
                    </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>User Voucher Quantity:</label>
                    <div className='w-[80%]'>
                        {data.total_quantity}
                    </div>
                </div>
            </section>
        </section>
        {/* Program Vouchers List */}
        <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto mb-[3rem] drop-shadow-lg bg-white">
            <div className="w-[100%] mb-[2rem] pt-[1.8rem] px-[1.6rem] flex items-center justify-start">
                <h1 className='font-light leading-none text-5xl'>Program Vouchers List</h1>
            </div>
              {/* ROW */}
              <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                    <div className="w-[25%] p-3 ">CODE</div>
                    <div className="w-[25%] p-3 border-l border-slate-300">CAMPAIGN</div>
                    <div className="w-[25%] p-3 border-l border-slate-300">AUTHOR</div>
                    <div className="w-[25%] p-3 border-l border-slate-300">DATE</div>
              </div>
            { voucher.length > 0 ? 
                voucher.map((item, i) => (
                <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start py-3 border border-slate-200 ">
                    <div className="w-[25%] py-2 px-3">{item.code}</div>
                    <div className="w-[25%] py-2 px-3 border-l border-slate-300">
                        {item.campaign?.name}</div>
                    <div className="w-[25%] py-2 px-3 border-l border-slate-300">
                        {item.user.email}
                    </div>
                    <div className="w-[25%] py-2 px-3 border-l border-slate-300">
                        {item.created_at}
                    </div>
                </div> 
                ))
            :
                <div className="w-[50rem] lg:w-[100%] flex items-center justify-center py-4 border border-slate-200 ">
                    <h6 className='text-2xl'>No Data Available at the moment.</h6>
                </div>
            }
        </section>
        {/* PAGINATION */}
        <div className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[4rem]">
            { prevURL && 
            <button
                onClick={() => paginationHandler(prevURL)}
                className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700 hover:text-white '>
                <BsArrowLeft className='transition ease-in-out duration-300 group-hover:-tranblue-x-1' />
                Prev 
            </button>
            }
            { nextURL &&
            <button
                onClick={() => paginationHandler(nextURL)}
                className='group flex items-center justify-center gap-1 rounded-lg px-4 py-3 bg-blue-500 text-white border hover:bg-gradient-to-br  hover:from-blue-500 hover:to-blue-700 hover:text-white '>
                Next 
                <BsArrowRight className='transition ease-in-out duration-300 group-hover:tranblue-x-1' />
            </button> 
            }
        </div>
    </>
    
  )
}
