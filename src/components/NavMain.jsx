"use client"
import Link from 'next/link'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import NavMainResponsive from './NavMainResponsive';



export default function NavMain() {
    

  return (
    <section className='w-[100%] py-2 bg-gradient-to-br from-[#6c0868] to-[#570253] text-white'>
        <div className='mx-auto w-[90%] flex lg:flex-row flex-col items-center justify-between'>
            <div className="lg:w-[15%] w-[100%] h-auto">
                <h1 className="leading-none font-black text-6xl py-3">RoyalVoucher</h1>
            </div>
            <ul className="hidden lg:flex lg:flex-row flex-col items-center justify-start gap-4 font-semibold tracking-wider">
                <li><Link href='/' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    HOME</Link></li>
                <li><Link href='/about' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    ABOUT US</Link>
                </li>
                <li><Link href='/campaign' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    CAMPAIGNS</Link>
                </li>
                <li><Link href='/contact' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                    CONTACT US</Link></li>
            </ul>
        </div>
        <NavMainResponsive />
    </section>
  )
}
