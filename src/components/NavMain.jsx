"use client"
import Link from 'next/link'
import NavMainResponsive from './NavMainResponsive';
import { tokenAuth } from '@/api/tokenAuth';
import { IoChevronDownSharp } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';


export default function NavMain() {
    const { getAuthToken } = tokenAuth();
    const [isCampaign, setIsCampaign] = useState(false);

  return (
    <section className='w-[100%] py-2 bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white'>
        <div className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between'>
            <div className="lg:w-[15%] w-[100%] h-auto py-[1rem]">
                <h1 className="leading-none font-black lg:text-6xl text-4xl py-3">RoyalVoucher</h1>
            </div>
            <ul className="hidden lg:flex lg:flex-row flex-col items-center justify-start gap-4 font-semibold tracking-wider">
                <li><Link href='/' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    HOME</Link></li>
                <li><Link href='/about' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    ABOUT US</Link>
                </li>
                <li className='relative'>
                    <span 
                        onClick={() => setIsCampaign(!isCampaign)} 
                        className="cursor-pointer flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                        CAMPAIGNS <IoChevronDownSharp />
                    </span>
                    {isCampaign == true &&
                        <AnimatePresence>
                            <motion.ul 
                                initial={{ opacity:1 }}
                                animate={{ opacity:1 }}
                                exit={{ opacity:1 }}
                                transition={{ duration: 0.6, type:'spring' }}
                                className="top-[125%] left-[-0.5rem] w-[200%] bg-[#570253] absolute z-10">
                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                    <Link href='/campaign' className=" w-[100%] h-[100%]">
                                        CURRENT CAMPAIGNS</Link>
                                </li>
                                <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                    <Link href='/voucher' className=" w-[100%]">VOUCHERS</Link>
                                </li>
                                <li className="px-[0.5rem] pb-3 pt-1 hover:bg-[#6c0868]">
                                    <Link href='/program' className=" w-[100%] h-[100%]">PROGRAMS</Link>
                                </li>
                                
                            </motion.ul>
                        </AnimatePresence>
                    }

                </li>
                  
                <li><Link href='/contact' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    CONTACT US</Link></li>

                
                <li className='lg:ml-[1rem]'><Link href='/login' className='border border-white py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear hover:bg-white hover:text-[#50014c]'>
                    Login</Link></li>
                <li>
                    <Link href='/register' className='border py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear bg-white text-[#50014c] hover:border-white hover:text-white hover:bg-[#50014c]'>
                    Register</Link></li>
            </ul>
        </div>
        <NavMainResponsive />
    </section>
  )
}
