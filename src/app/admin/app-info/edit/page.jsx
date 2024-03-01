"use client";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { BsChevronRight } from 'react-icons/bs';
import AppInfoEdit from "./components/AppInfoEdit";
import { tokenAuth } from "@/api/tokenAuth";
import { tokenRole } from "@/api/tokenRole";
import { useEffect } from "react";




export default function page() {
  const { getAuthToken } = tokenAuth();
  const { getRoleToken } = tokenRole();

 
  if(getRoleToken() >= 3) {
    redirect('/admin/app-info'); 
  }


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
                  <Link href='/admin/app-info'>
                    App Info</Link>
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href={`/admin/app-ifo/edit`} className='font-semibold'>
                    Edit App Info</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <AppInfoEdit />

        <Footer />
    </div>
  )
}
