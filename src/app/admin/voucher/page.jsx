"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Voucher from './components/Voucher';
import { tokenAuth } from '@/api/tokenAuth';
import { redirect } from 'next/navigation'




export default function page() {
  const { getAuthToken } = tokenAuth();
  if(!getAuthToken()){
    redirect('/login-voucher')
  }

  return (
    <main>
        <Header />
        
        <Voucher />

        <Footer />
    </main>
  );
}
