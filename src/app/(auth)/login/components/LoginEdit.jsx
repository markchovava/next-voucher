"use client"
import { baseURL } from "@/api/baseURL";
import { tokenAuth } from "@/api/tokenAuth";
import { tokenId } from "@/api/tokenId";
import { tokenRole } from "@/api/tokenRole";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { CiSquareRemove } from "react-icons/ci";




export default function LoginEdit() {
    const router = useRouter();
    const [data, setData] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const { setAuthToken } = tokenAuth()
    const { setRoleToken } = tokenRole();
    const { setIdToken } = tokenId();

    const handleInput = (e) => {
      setData({...data, [e.target.name]: e.target.value})
    }

    async function postData() {
      setIsSubmit(false)
      if(!data.email){
        setErrorMsg('Email is required.');
        setIsError(true);
        setIsClick(false);
        return;
      }
      if(!data.password){
        setErrorMsg('Password is required.');
        setIsError(true);
        setIsClick(false);
        return;
      }
      if(Object.keys(data).length > 0){
        try{ 
            const result = await axios.post(`${baseURL}login`, data)
            .then((response) => {
              if(response.data.auth_token){
                setAuthToken(response.data.auth_token);
                setRoleToken(response.data.role_level);
                setIdToken(response.data.user_id)
                router.push('/program')
                setIsClick(false);
              } else if(response.data.message !== ''){
                setIsError(true);
                setErrorMsg(response.data.message);
                setIsClick(false);
              }
              setIsClick(false);
            })
          } catch (error) {
            console.error(`Error: ${error}`)
            setIsClick(false);
          } 
      } else{
        setErrorMsg('All input fields are required to be filled.');
        setIsError(true);
        setIsClick(false);
      }
    }  

 
    useEffect(() => { 
      isSubmit == true && postData();
    }, [isSubmit]);

  return (
    <section className='w-[100%] h-auto bg-white'>
      <div className="mx-auto lg:w-[60%] w-[80%] py-[4rem]">
        {/* Title */}
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pb-[1.5rem] text-center font-extrabold text-[4rem]">
                Login.</h1>
            <hr className="border-t-4 border-black w-[20%] pb-[1.5rem]" />
            <h6 className='pb-[2rem] flex gap-1'>
              Register 
              <Link className='underline hover:text-purple-900' href='/register'>here.</Link>
            </h6>
            {isError == true && 
              <p className='pb-[2rem] text-md text-red-500 flex items-center gap-4 justify-between'>
                {errorMsg}
                <CiSquareRemove onClick={() => setIsError(false)} />
              </p>
            }
        </div>
        <div className="w-[100%] mb-[2rem]">
            <input 
                type="email" 
                name="email" 
                onChange={handleInput}
                placeholder="Write your Email..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-purple-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <input 
                type="password" 
                name="password" 
                onChange={handleInput}
                placeholder="Enter Password here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-purple-300" />
        </div>
        {/*  */}
        <div className="w-[100%] mb-[2rem] flex items-center justify-center gap-4">
            <button disabled={isClick == true && true}
              onClick={() => {
                setIsSubmit(true);
                setIsClick(true);
              }}
              className='lg:w-[20%] group transition ease-in-out duration-200  flex items-center justify-center gap-1 rounded-xl py-[1.2rem] px-[2rem] bg-[#6c0868] text-white border hover:bg-gradient-to-br  hover:from-[#6c0868] hover:to-purple-900'>
                { isClick == true ? 
                'Processing' : 
                <> 
                  Submit <BsArrowRight className='transition ease-in-out duration-200 group-hover:translate-x-1' />
                </> 
                } 
            </button>
        </div>
              
      </div>
    </section>
  )
}
