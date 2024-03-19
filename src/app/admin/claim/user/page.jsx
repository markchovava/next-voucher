import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { BsChevronRight } from 'react-icons/bs';
import ClaimUserList from "./components/ClaimUserList";



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
                <li className='flex gap-1 justify-start items-center'>
                  <Link href='/' className='flex justify-start items-center'>
                    Admin</Link> 
                </li>
                <li><BsChevronRight /></li>
                <li className='flex justify-start items-center'>
                  <Link href='/admin/company' className='font-semibold'>
                    Claim List</Link>
                </li>
                <li className='flex justify-start items-center'>
                  <Link href='/admin/company' className='font-semibold'>
                    Claim List</Link>
                </li>
              </ul>
          </div>
        </section>
        
        <ClaimUserList />
        
        <Footer />
    </div>
  )
}
