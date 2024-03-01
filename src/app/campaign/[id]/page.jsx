"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CampaignView from './components/CampaignView';




export default function page({ params: {id} }) {
  

  
  return (
    <>
        <Header />  
        <CampaignView id={id} />
        <Footer />
    </>
  )
}
