"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CampaignList from './components/CampaignList';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import { baseURL } from '@/api/baseURL';
import fetcherWeb from '@/swr/fetcherWeb';
import useSWR from 'swr';



export default function page() {
  const { data: campaignData, error: campaignError } = useSWR(`${baseURL}campaign`, fetcherWeb)
  


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
                <Link href='/campaign' className='font-semibold'>
                  Campaigns</Link>
              </li>
            </ul>
        </div>
      </section>
        
      <CampaignList campaignData={campaignData} />

      <Footer />
    </main>
  );
}
