"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";




export default function AppInfoEdit({ id }) {
  const router = useRouter();
  const { getAuthToken } = tokenAuth();
  const [data, setData] = useState({});
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
  /* GET DATA */
  async function getData() {
      try{
        const result = await axiosClientAPI.get(`app-info`, config)
          .then((response) => {
            setData(response.data.data);
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
  } 

  /* POST DATA */
  async function postData() {
      const formData = {
        name : data?.name ? data?.name : '',
        description: data?.description ? data?.description : '',
        address: data?.address ? data?.address : '',
        phone: data?.phone ? data?.phone : '',
        email: data?.email ? data?.email : '',
        website: data?.website ? data?.website : '',
        whatsapp: data?.whatsapp ? data?.whatsapp : '',
        facebook: data?.facebook ? data?.facebook : '',
      }

      try{
        const result = await axiosClientAPI.post(`app-info`, formData, config)
          .then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
            setIsSubmit(false);
            router.push('/admin/app-info')
          })
      } catch (error) {
          console.error(`Error: ${error}`)
          setIsSubmit(false);
      }
       
    }  

    useEffect(() => { 
      getData();
    }, []);

    useEffect(() => { 
      isSubmit && postData();
    }, [isSubmit]);


    if(!data){
      return <>
        <div className="w-[50rem] lg:w-[100%] h-[50vh] flex items-center justify-center py-4 border border-slate-200 ">
            <h6 className='text-2xl'>Loading...</h6>
        </div>
      </>
    }


  return (
   
      <div>
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Edit App Info</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

        <section className="mx-auto lg:w-[80%] w-[90%]">
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Name:</h6>
              <input 
                  type="text" 
                  name="name" 
                  value={data?.name}
                  onChange={handleInput}
                  placeholder="Write your Name here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Phone:</h6>
              <input 
                  type="text" 
                  name="phone" 
                  value={data?.phone}
                  onChange={handleInput}
                  placeholder="Write your Phone here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Email:</h6>
              <input 
                  type="text" 
                  name="email" 
                  value={data?.email}
                  onChange={handleInput}
                  placeholder="Write your Email here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Address:</h6>
              <input 
                  type="text" 
                  name="address" 
                  value={data?.address}
                  onChange={handleInput}
                  placeholder="Write your Address here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Website:</h6>
              <input 
                  type="text" 
                  name="website" 
                  value={data?.website}
                  onChange={handleInput}
                  placeholder="Write your Website here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>WhatsApp:</h6>
              <input 
                  type="text" 
                  name="whatsapp" 
                  value={data?.whatsapp}
                  onChange={handleInput}
                  placeholder="Write your WhatsApp here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Facebook:</h6>
              <input 
                  type="text" 
                  name="facebook" 
                  value={data?.facebook}
                  onChange={handleInput}
                  placeholder="Write your Facebook here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
          </div>
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Description:</h6>
              <textarea
                  type="text" 
                  name="description" 
                  value={data?.description}
                  onChange={handleInput}
                  placeholder="Write your Description here..." 
                  className="w-[100%] h-[8rem] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300"></textarea>
          </div>
         
          <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
                <button 
                    onClick={ () => {
                      setIsSubmit(true); }}
                    className='lg:w-[20%] group transition ease-in-out duration-200 flex items-center justify-center gap-1 rounded-xl py-[1rem] px-[2.5rem] text-white bg-gradient-to-br from-[#6c0868] to-[#50014c] hover:bg-gradient-to-br hover:from-[#50014c] hover:to-[#6c0868]'>
                    { 
                      isSubmit === true ? 
                      'Processing' : 
                      <>
                        Submit 
                        <BsArrowRight 
                        className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                      </>
                    }
                    
                </button>
          </div>
        </section>
      
      </div>

  )
}
