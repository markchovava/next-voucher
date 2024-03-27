"use client"
import Link from "next/link";
import { BsChevronRight } from 'react-icons/bs';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RedeemVoucherView from "./components/RedeemVoucherView";



export default function page({ params: {id} }) {

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
                  <Link href='/campaign-program' className='font-semibold'>
                    My Campaigns</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/campaign-program/redeem-voucher/view/${id}`} className='font-semibold'>
                    View Redeem Vouchers</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <RedeemVoucherView id={id} />

        <Footer />
    </div>
  )
}
