"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";




export default function PriceEdit() {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  }}

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }


    /* GET DATA */
    async function getData() {
      try{
        const result = await axiosClientAPI.get(`voucher-price`, config)
          .then((response) => {
            setData(response.data.data);
            console.log(response.data.data)
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 

    /* POST DATA */
    async function postData() {
      const formData = {
        price: data.price,
        quantity: data.quantity,
      };
      try{
        const result = await axiosClientAPI.post(`voucher-price`, formData, config)
          .then((response) => {
              router.push('/admin/price');
              setIsSubmit(false);
          })
        } catch (error) {
          console.error(`Error: ${error}`);
          setIsSubmit(false);
        } 
    }  

    useEffect(() => { 
      getData();
    }, []);

    useEffect(() => { 
      isSubmit && postData();
    }, [isSubmit]);

  return (
    <>  
      <div>
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Edit Price</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

        <section className="mx-auto lg:w-[70%] w-[90%]">
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Quantity:</h6>
              <input 
                  type="number" 
                  name="quantity" 
                  value={data.quantity}
                  onChange={handleInput}
                  placeholder="Write Quantity here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Price:</h6>
              <input 
                  type="number" 
                  name="price" 
                  value={data.price}
                  onChange={handleInput}
                  placeholder="Write Price in Cents here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                <button 
                    onClick={ () => {
                      setIsSubmit(true) }}
                    className='lg:w-[20%] group transition ease-in-out duration-200 flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-gradient-to-br from-[#6c0868] to-[#50014c] text-white border hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                    {isSubmit === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
                    
                </button>
          </div>
        </section>
      
      </div>
  
    </>
  )
}
