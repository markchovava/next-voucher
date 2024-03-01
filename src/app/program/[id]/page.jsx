"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProgramView from './components/ProgramView';



export default function page({ params: {id} }) {
  return (
    <main>
        <Header />
        
        <ProgramView id={id} />

        <Footer />
    </main>
  )
}
