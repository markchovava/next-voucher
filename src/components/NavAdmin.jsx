"use client"
import React, { useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5"; 
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NavAdminResponsive from './NavAdminResponsive';
import { tokenAuth } from '@/api/tokenAuth';
import { tokenRole } from '@/api/tokenRole';
import axiosClientAPI from '@/api/axiosClientAPI';



export default function NavAdmin() {
    const [isSetting, setIsSetting] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [ isCampaign, setIsCampaign] = useState(false);
    const [isProgram, setIsProgram] = useState(false);
    const [ isVoucher, setIsVoucher] = useState(false);
    const {getAuthToken, removeAuthToken} = tokenAuth();
    const { removeRoleToken } = tokenRole();
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
      }}


    /* LOGOUT */
    async function postLogout() {

        try{
        const result = await axiosClientAPI.get(`logout/`, config)
            .then((response) => {
                removeAuthToken();
                removeRoleToken();
                router.push(`/login`) 
            
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        } 
    } 

  return (
    <>
        <section className='hidden lg:block w-[100%] bg-[#570253] text-white'>
            <div className='mx-auto w-[90%] py-2 flex items-center justify-between '>
                <div className="w-[60%]">
                    <ul className="flex items-center justify-start gap-4">
                        {/* Settings */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(!isSetting);
                                setIsUser(false);
                                setIsProfile(false);
                                setIsCampaign(false);
                                setIsVoucher(false);
                                setIsProgram(false);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Settings <IoChevronDownSharp />
                            </span>
                            { isSetting && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/price' className=" w-[100%] h-[100%]">Price</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        
                        {/* Users */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(!isUser);
                                setIsProfile(false);
                                setIsCampaign(false);
                                setIsVoucher(false);
                                setIsProgram(false);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Users <IoChevronDownSharp />
                            </span>
                            { isUser && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/delivery' className=" w-[100%] h-[100%]">Delivery</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        
                        {/* Campaign */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsProfile(false);
                                setIsVoucher(false);
                                setIsCampaign(!isCampaign);
                                setIsProgram(false);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Campaign <IoChevronDownSharp />
                            </span>
                            { isCampaign && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/campaign/add' className=" w-[100%]">Add Campaign</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/campaign/' className=" w-[100%]">Campaign List</Link>
                                        </li>

                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        
                        {/* Program */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsProfile(false);
                                setIsCampaign(false);
                                setIsVoucher(false);
                                setIsVoucher(false);
                                setIsProgram(!isProgram);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Program <IoChevronDownSharp />
                            </span>
                            { isProgram && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/program/add' className=" w-[100%]">Add Program</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/program' className=" w-[100%]">Program List</Link>
                                        </li>    
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        
                        {/* Voucher */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsProfile(false);
                                setIsCampaign(false);
                                setIsProgram(false);
                                setIsVoucher(!isVoucher);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Voucher <IoChevronDownSharp />
                            </span>
                            { isVoucher && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/redeemed-voucher' className=" w-[100%]">Redeemed Vouchers</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                            <Link href='/admin/claimed-voucher' className=" w-[100%]">Claimed Vouchers</Link>
                                        </li>    
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>

                    </ul>
                </div>
                <div className="relative"
                    onClick={() => {
                        setIsSetting(false);
                        setIsUser(false);
                        setIsProfile(!isProfile);
                        setIsCampaign(false);
                        setIsProgram(false);
                    }}>
                    <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-slate-100">
                        <FaUser />
                        Profile 
                        <IoChevronDownSharp /></span>
                        { isProfile && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="top-[125%] left-[-0.5rem] w-[160%] bg-[#570253] absolute z-10">
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/admin/profile' className=" w-[100%]">View Profile</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/admin/profile/edit' className=" w-[100%]">Edit Profile</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/admin/profile/password' className=" w-[100%]">Set Password</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <Link href='/login' className=" w-[100%]">Login</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-[#6c0868]">
                                        <button 
                                            onClick={() => postLogout() }
                                            className="text-left w-[100%]">
                                                Logout
                                        </button>
                                    </li>
                                </motion.ul>
                            </AnimatePresence> 
                        }            
                </div>  
            </div>
        </section>
        <NavAdminResponsive />
    </>
  )
}
