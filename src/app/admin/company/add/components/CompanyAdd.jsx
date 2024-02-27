"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";



export default function CompanyAdd() {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState({});
  const [roles, setRoles] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
  }}

  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  /* POST DATA */
  async function postData() {
    setIsSubmit(false);
    const formData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      website: data.website,
    }
    try{
      const result = await axiosClientAPI.post(`company`, formData, config)
        .then((response) => {
          setIsClicked(false)
          router.push('/admin/company')
        })
      } catch (error) {
        console.error(`Error: ${error}`)
        setIsClicked(false)
      }
  }   

  useEffect(() => { 
    isSubmit && postData();
  }, [isSubmit]);

  return (
    <div>
      <div className="w-[100%] flex items-center justify-center flex-col">
          <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
              Add Company</h1>
          <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
      </div> 

      <section className="mx-auto lg:w-[80%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Name:</h6>
            <input 
                type="text" 
                name="name" 
                onChange={handleInput}
                placeholder="Write your Name here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Phone:</h6>
            <input 
                type="text" 
                name="phone" 
                onChange={handleInput}
                placeholder="Write your Phone here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Address:</h6>
            <input 
                type="text" 
                name="address" 
                onChange={handleInput}
                placeholder="Write your Address here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Email:</h6>
            <input 
                type="text" 
                name="email" 
                onChange={handleInput}
                placeholder="Write your Email here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Website:</h6>
            <input 
                type="text" 
                name="website" 
                onChange={handleInput}
                placeholder="Write your Website here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
       

        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
              <button 
                  onClick={ () => {
                    setIsSubmit(true) 
                    setIsClicked(true)
                  }}
                  disabled={isClicked == true ? true : false}
                  className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] bg-blue-600 text-white border hover:bg-gradient-to-br  hover:from-blue-600 hover:to-blue-800'>
                  {isClicked === true ? 'Processing' : 
                    <>
                      Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
              </button>
        </div>
      </section>
    
    </div>
  )
}
