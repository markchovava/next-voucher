"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsChevronRight } from 'react-icons/bs';
import { CiSquareRemove } from 'react-icons/ci';



export default function ProgramView({ id }) {
    const [data, setData] = useState({});
    const [message, setMessage] = useState('');
    const [redeemData, setRedeemData] = useState(null)
    const [voucher, setVoucher] = useState([]);
    const [nextURL, setNextURL] = useState();
    const [prevURL, setPrevURL] = useState();
    const [isClickGenerate, setIsClickGenerate] = useState(false);
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
    /* GET RedeemVoucher DATA */
    async function getRedeemVoucher(user_id, program_id) {
        try{
            const result = await axiosClientAPI.get(`redeem-voucher/check-by-id?user_id=${user_id}&program_id=${program_id}`, config)
            .then((response) => {
                setRedeemData(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`program/${id}`, config)
            .then((response) => {
              setData(response.data.data);
              getRedeemVoucher(response.data.data.user_id, response.data.data.id)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
    
    /* GET VOUCHERS */
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
     /* POST DATA */
     async function generateRedeemVoucher() {
        const formData = {
            reward_points: Number(data.reward_points),
            campaign_id: data.campaign_id,
            program_id: data.id,
            user_id: data.user_id,
        }
        try{
          const result = await axiosClientAPI.post(`redeem-voucher`, formData, config)
            .then((response) => {
                getData()
                setMessage(response.data.message);
                setIsClickGenerate(false)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsClickGenerate(false)
        } 
    } 


    useEffect(() => { 
        getData();
        getVoucher();
    }, []);

    useEffect(() => { 
        isClickGenerate === true && generateRedeemVoucher();
    }, [isClickGenerate]);

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
        { message !== '' &&
            <div className="w-[100%] mb-[1.5rem] flex items-center justify-center gap-5 text-green-600">
                {message} 
                <CiSquareRemove onClick={() => setMessage('')} />
            </div>
        }
        {/* Link */}
        <div className='mx-auto w-[90%] flex justify-end items-center gap-2 pb-[2rem] '>
            { data.total_points >= data.reward_points &&
                <button
                    onClick={() => {
                        setIsClickGenerate(true)
                    }}
                    className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-8 py-4 bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-[#3d003a] hover:text-white '>
                    {isClickGenerate == true ? 'Processing' : 'Get Redeem Voucher'}
                </button> 
            }
            {redeemData === 1 &&
                <Link
                    href={`/campaign-program/redeem-voucher/${id}`}
                    className='transition-all duration-150 ease-in rounded-lg px-8 py-4 bg-gradient-to-br from-blue-600 to-cyan-700 text-white hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800 hover:text-white'>
                    Redeem Vouchers
                </Link>
            }
            <Link
                href='/campaign-program'
                className='transition-all duration-150 ease-in rounded-lg  px-8 py-4 bg-gradient-to-br from-green-700 to-cyan-700 text-white border hover:bg-gradient-to-br  hover:from-blue-700 hover:to-green-800 hover:text-white'>
                My Campaigns
            </Link>
        </div>
        {/* Program Info */}
        <section className='w-[100%] h-auto pb-[3rem]'>
            <section className='mx-auto w-[90%] p-[2.5rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <h1 className='font-light text-5xl'>Program Info</h1>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Username:</label>
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
                        <span>{data?.start_date ? data.start_date : '--/--/--'}</span> to 
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
