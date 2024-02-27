"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Link from 'next/link';



export default function CampaignSlider() {

  return (
    <>
    <section className='hidden lg:block mx-auto container h-auto lg:w-[90%] py-[4rem]'>
        <Swiper
        rewind={true}
        spaceBetween={25}
        slidesPerView={4}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{clickable: true}}
        className='rounded-lg'>

        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
    

        </Swiper>
    </section>
    <section className='lg:hidden block mx-auto container h-auto w-[90%] py-[4rem]'>
        <Swiper
        rewind={true}
        spaceBetween={25}
        slidesPerView={2}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
        }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{clickable: true}}
        className='rounded-lg'>

        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
        <SwiperSlide>
            {/* COL */}
            <div className='w-[100%] aspect-[1/1] relative overflow-hidden rounded-2xl bg-blue-800 hover:bg-blue-900 drop-shadow-md'>  
                <div className='w-[100%] h-[100%] text-white absolute z-10 flex justify-start gap-3 items-end p-4'>
                    <div className='text-lg w-[65%]'>Lorem ipsum dolor sit amet.</div>
                    <div className='text-sm w-[35%]'>Lorem, ipsum.</div>
                </div>   
            </div>
        </SwiperSlide>
    

        </Swiper>
    </section>
    </>

  )
}
