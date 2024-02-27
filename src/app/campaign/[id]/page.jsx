"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { BsChevronRight } from 'react-icons/bs';
import CampaignView from './components/CampaignView';



export default function page({ params: {id} }) {
  return (
    <main>
        <Header />
        
        <CampaignView id={id} />

        <Footer />
    </main>
  )
}
