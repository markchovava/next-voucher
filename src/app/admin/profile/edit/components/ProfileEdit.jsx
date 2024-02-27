"use client"
import axiosClientAPI from "@/api/axiosClientAPI";
import { tokenAuth } from "@/api/tokenAuth";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";




export default function ProfileEdit() {
  const router = useRouter();
  const { getAuthToken } = tokenAuth()
  const [data, setData] = useState({});
  const [dob, setDob] = useState({});
  const [roles, setRoles] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
        const result = await axiosClientAPI.get(`profile`, config)
          .then((response) => {
            setData(response.data.data);
            console.log(response.data.data);
            if(response.data.data.dob){
              let dbDob = response.data.data.dob.split('/');
              setDob({day: dbDob[0], month: dbDob[1], year: dbDob[2] })
            }
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 
    async function getRoles() {
      try{
        const result = await axiosClientAPI.get(`role/all`, config)
          .then((response) => {
            setRoles(response.data.data);
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }   
    } 

    /* POST DATA */
    async function postData() {
      setIsSubmit(false);
      const formData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        dob: `${dob.day && dob.month && dob.year ? dob.day + '/' + dob.month + '/' + dob.year : ''}`,
        id_number: data.id_number,
        gender: data.gender,
        role_level: data.role_level,
      }
      try{
        const result = await axiosClientAPI.post(`profile`, formData, config)
          .then((response) => {
            router.push('/admin/profile')
          })
        } catch (error) {
          console.error(`Error: ${error}`)
        }
    }  

    useEffect(() => { 
      getData();
      getRoles();
      setIsLoading(false)
    }, []);

    useEffect(() => { 
      isSubmit && postData();
      setIsClicked(false);
    }, [isSubmit]);

  return (
    <>  
    { isLoading == true ? <Loader /> : 
      <div>
        <div className="w-[100%] flex items-center justify-center flex-col">
            <h1 className="leading-none pt-[1.5rem] pb-[1.5rem] text-center font-black text-[4rem]">
                Edit User</h1>
            <hr className="border-t-4 border-black w-[10%] pb-[3.5rem]" />
        </div> 

        <section className="mx-auto lg:w-[80%] w-[90%]">
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Name:</h6>
            <input 
                type="text" 
                name="name" 
                value={data.name}
                onChange={handleInput}
                placeholder="Write your Name here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Phone:</h6>
            <input 
                type="text" 
                name="phone"
                value={data.phone} 
                onChange={handleInput}
                placeholder="Write your Phone here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Address:</h6>
            <input 
                type="text" 
                name="address" 
                value={data.address} 
                onChange={handleInput}
                placeholder="Write your Address here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Email:</h6>
            <input 
                type="text" 
                name="email" 
                value={data.email} 
                onChange={handleInput}
                placeholder="Write your Email here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>ID Number:</h6>
            <input 
                type="text" 
                name="id_number" 
                value={data.id_number} 
                onChange={handleInput}
                placeholder="Write your ID Number here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
        </div>
        <div className="w-[100%] lg:w-[50%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Date of Birth:</h6>
            <div className="flex items-center justify-start gap-4">
              <div className="w-[50%]">
                <h6 className='pb-1'>Day:</h6>
                <input 
                    type="number" 
                    name="day" 
                    value={dob.day}
                    onChange={(e) => setDob({...dob, day: e.target.value})}
                    placeholder="DD" 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
              </div>
              <div className="w-[50%]">
                <h6 className='pb-1'>Month:</h6>
                <input 
                    type="number" 
                    name="month"  
                    value={dob.month}
                    onChange={(e) => setDob({...dob, month: e.target.value})}
                    placeholder="MM" 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
              </div>
              <div className="w-[50%]">
                <h6 className='pb-1'>Year:</h6>
                <input 
                    type="number" 
                    name="year"  
                    value={dob.year}
                    onChange={(e) => setDob({...dob, year: e.target.value})}
                    placeholder="YYYY" 
                    className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300" />
              </div>
            </div>
        </div>    
        <div className="w-[100%] mb-[2rem]">
            <h6 className='font-bold pb-1'>Gender:</h6>
            <select 
                name="gender" 
                onChange={handleInput}
                placeholder="Write your Gender here..." 
                className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                <option value=''>Select an option.</option>
                <option value='Male' selected={data.gender === 'Male' && 'selected'}>Male</option>
                <option value='Female' selected={data.gender === 'Female' && 'selected'}>Female</option>
            </select>
        </div>
        { roles.length > 0 &&
          <div className="w-[100%] mb-[2rem]">
              <h6 className='font-bold pb-1'>Role Level:</h6>
              <select
                  type="text" 
                  name="role_level" 
                  onChange={handleInput}
                  placeholder="Write your Level here..." 
                  className="w-[100%] rounded-xl px-[1rem] py-[1rem] outline-none border border-slate-300">
                  <option value=''>Select an option.</option>
                  { roles.map((item, i) => (
                    <option 
                      key={i} 
                      value={item.level} 
                      selected={data.role_level === item.level && 'selected'}>
                        {item.name}
                      </option>
                  )) }
              </select>
          </div>
        }

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
    }
    </>
  )
}
