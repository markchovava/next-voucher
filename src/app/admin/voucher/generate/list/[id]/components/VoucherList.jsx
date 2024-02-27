"use client"
import axiosClientAPI from '@/api/axiosClientAPI';
import { tokenAuth } from '@/api/tokenAuth';
import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

export default function VoucherList({ id }) {
    const { getAuthToken } = tokenAuth();
    const [data, setData] = useState({});
    const [meta, setMeta] = useState({})
    const [nextURL, setNextURL] = useState()
    const [prevURL, setPrevURL] = useState()
    const [search, setSearch] = useState('');
    const [searchSubmit, setSearchSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }}

     /* PAGINATION */
    async function paginationHandler(url) {
        try{
          const result = await axiosClientAPI.get(url, config)
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
                const result = await axiosClientAPI.get(`generated-voucher/by-id/${id}`, config)
                .then((response) => {
                    setData(response.data.data)
                    console.log(response.data.data)
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
                const result = await axiosClientAPI.get(`generated-voucher/by-id/${id}?search=${search}`, config)
                .then((response) => {
                    setData(response.data.data)
                    console.log(response.data.links.prev)
                    setPrevURL(response.data.links.prev)
                    setNextURL(response.data.links.next)
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
          const result = await axiosClientAPI.get(`generated-voucher/by-id/${id}`, config)
            .then((response) => {
              setData(response.data.data);
              console.log(response.data);
              setMeta(response.data.meta)
              setPrevURL(response.data.links.prev)
              setNextURL(response.data.links.next)
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 

    useEffect(() => { 
        searchSubmit == true && searchData()
    }, [searchSubmit]); 
  
    useEffect(() => { 
        getData();
    }, []);
  

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Voucher List</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

         {/* SEARCH */}
         <div className='mx-auto w-[90%] flex items-center justify-between h-auto pb-[1.2rem]'>
                <div className='lg:w-[40%] w-[70%] flex items-center justify-start gap-2'>
                    <input 
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search by Code...' 
                        className='w-[100%] py-3 px-3 rounded-lg outline-none border border-blue-300' 
                    />
                    <button 
                        onClick={() => setSearchSubmit(true)}
                        className='bg-gradient-to-br transition-all duration-150 ease-in rounded-lg px-7 py-3 bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800 hover:text-white '>
                        Search</button>
                </div>

                <div className='text-2xl font-bold py-2 px-3 text-white bg-red-600 rounded-xl'>
                    Total: <span>{meta.total}</span>
                </div>

          </div>

          <section className="mx-auto w-[90%] lg:overflow-hidden overflow-auto">
              {/* ROW */}
              <div className="w-[50rem] lg:w-[100%] font-bold flex items-center justify-start bg-slate-100 py-3 border border-slate-200 ">
                    <div className="w-[40%] p-3 ">CODE</div>
                    <div className="w-[30%] p-3 border-l border-slate-300">CAMPAIGN</div>
                    <div className="w-[30%] p-3 border-l border-slate-300">AUTHOR</div>
              </div>
            { data.length > 0 ? 
                data.map((item, i) => (
                <div key={i} className="w-[50rem] lg:w-[100%] flex items-center justify-start py-3 border border-slate-200 ">
                    <div className="w-[40%] py-2 px-3">{item.code}</div>
                    <div className="w-[30%] py-2 px-3 border-l border-slate-300">
                        {item.campaign?.name}</div>
                    <div className="w-[30%] py-2 px-3 border-l border-slate-300">
                        {item.user.name ? item.user.name : item.user.email}
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
          <div className="mx-auto w-[90%] flex items-center justify-end gap-4 pb-[3rem] pt-[2rem]">
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
