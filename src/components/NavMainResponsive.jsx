"use client"
import Link from 'next/link'
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";



export default function NavMainResponsive() {
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
            <li><Link href='/contact' className="flex items-center justify-center gap-1 hover:border-b border-slate-300 hover:text-slate-100 py-3 transition-all ease-in duration-100">
                CONTACT US</Link></li>
        </ul>
      }
    </div>
  )
}
