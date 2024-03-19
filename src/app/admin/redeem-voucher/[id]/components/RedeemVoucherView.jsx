"use client"

import fetcherAPI from "@/swr/fetcherAPI";
import useSWR from "swr";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";
import { useState, useRef, useEffect } from "react";
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";


export default function RedeemVoucherView({id}) {
    const [data, setData] = useState({})
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const qrCodeRef = useRef(null);
    const { getAuthToken } = tokenAuth();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        }
    };
    /* GET DATA */
    async function getData() {
        try{
          const result = await axiosClientAPI.get(`redeem-voucher/${id}`, config)
            .then((response) => {
              setData(response.data.data);
              console.log(response.data.data);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
          }   
    } 
    

    const downloadQRCode = () => {
        const randomNumber = Math.floor(Math.random() * 100);
        htmlToImage
          .toPng(qrCodeRef.current)
          .then(function (dataUrl) {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = `qr-code${randomNumber}.png`;
            link.click();
          })
          .catch(function (error) {
            console.error("Error generating QR code:", error);
          });
    };


    useEffect(() => {
        getData();
    }, []);






   if(!data?.code){
        return (
        <>
          <div className="w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
              <h6 className='animate-pulse text-2xl'>Loading...</h6>
          </div>
        </>
        )
    }
   

  return (
    <>
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.8rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Download Redeem Voucher </h1>
              <hr className="border-t-4 border-black lg:w-[15%] w-[30%] pb-[3.5rem]" />
        </div>

        {/* Redeem Voucher */}
        <section className='w-[100%] h-auto pb-[3rem]'>
            <section className='mx-auto w-[90%] p-[2.5rem] bg-white drop-shadow-lg'>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <h1 className='font-light text-5xl'>Redeem Voucher</h1>
                </div>
               
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Campaign Name:</label>
                    <div className='w-[80%]'>
                        {data.campaign?.name} </div>
                </div>
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>Code:</label>
                    <div className='w-[80%]'>
                        {data.code} </div>
                </div>
                { data.code &&
                <div className="w-[100%] mb-[2rem] flex items-center justify-start">
                    <label className='w-[20%] gap-3 font-semibold'>QR Code:</label>
                    <div className='w-[80%]'>
                        <div
                            ref={qrCodeRef} 
                            className="w-[600px] p-[50px] flex items-center justify-center bg-white drop-shadow-xl">
                            <QRCode value={data.code} size={500} />
                        </div>
                        <div className="pt-[1.5rem]">
                            <button 
                            onClick={downloadQRCode}
                            className="border border-[#570253] text-[#570253] hover:bg-[#570253] hover:text-white tansition-all px-[1rem] py-[0.7rem] rounded-lg">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
                } 
              
            </section>
        </section>

    </>
  )
}

