"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Voucher from './components/Voucher';
import { tokenAuth } from '@/api/tokenAuth';
import { redirect } from 'next/navigation'
import { useEffect } from 'react';




export default function page() {
  const { getAuthToken } = tokenAuth();
  useEffect(() => {
    if(!getAuthToken()){
      redirect('/login-voucher')
    }
  }, []);

  return (
    <main>
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
                  <Link href='/voucher' className='font-semibold'>
                  Voucher </Link>
              </li>
              </ul>
          </div>
      </section>
        
        <Voucher />

        <Footer />
    </main>
  );
}
