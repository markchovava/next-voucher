"use client"
import { tokenAuth } from '@/api/tokenAuth';
import Link from 'next/link'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";



export default function NavMainResponsive() {
  const { getAuthToken } = tokenAuth();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='lg:hidden flex flex-col w-[100%]'>
      <div className="mx-auto w-[90%] py-2 flex items-center justify-end">
        { isOpen === false ?
                <GiHamburgerMenu
                    onClick={() => setIsOpen(true)} 
                    className='text-white text-xl' />
                :
                <GrClose 
                    onClick={() => setIsOpen(false)} 
                    className='text-white text-xl' />
        }
      </div>
      {isOpen && 
        <ul className="flex lg:flex-row flex-col items-center justify-start gap-4 font-semibold tracking-wider">
            <li><Link href='/' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                HOME</Link></li>
            <li><Link href='/about' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                ABOUT US</Link></li>
            {getAuthToken() &&
            <>
              <li><Link href='/voucher' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                  VOUCHERS</Link></li>
              <li><Link href='/campaign' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                  CAMPAIGNS</Link></li>
            </>
            }
            
            <li><Link href='/contact' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                CONTACT US</Link></li>
            <li className='my-[1rem]'>
              <Link href='/login' className='border border-white py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear hover:bg-white hover:text-[#50014c]'>
                Login
              </Link>
            </li>
            <li className='my-[1rem]'>
              <Link href='/register' className='border py-[0.8rem] px-[1.8rem] rounded-lg transition-all ease-linear bg-white text-[#50014c] hover:border-white hover:text-white hover:bg-[#50014c]'>
                Register
              </Link>
            </li>
              
        </ul>
      }
    </div>
  )
}
