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
        
        <Voucher />

        <Footer />
    </main>
  );
}
