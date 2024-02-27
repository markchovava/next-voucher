import Header from '@/components/Header';
import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import RegisterEdit from './components/RegisterEdit';





export default function page() {
  return (
    <div>
      <Header />
      {/* BREADCRUMBS */}
      <section className='w-[100%] bg-slate-100 text-black'>
        <div className='mx-auto w-[90%]'>
            <ul className='py-2 flex items-center justify-start gap-2'>
              <li className='flex gap-1 justify-start items-center'>
                <Link href='/' className='flex justify-start items-center'>
                  Home</Link> 
              </li>
              <li><BsChevronRight /></li>
              <li className='flex justify-start items-center'>
                <Link href='/register' className='font-semibold'>
                  Register</Link>
              </li>
            </ul>
        </div>
      </section>
      
      <RegisterEdit />

      <Footer />
    </div>
  )
}
