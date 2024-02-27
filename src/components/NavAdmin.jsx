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
    const [isCompany, setIsCompany] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [ isCampaign, setIsCampaign] = useState(false);
    const [isCampaignCompany, setIsCampaignCompany] = useState(false)
    const [isClaim, setIsClaim] = useState(false);
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
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
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
                                setIsCompany(false);
                                setIsProfile(false);
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
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/app-info' className=" w-[100%]">AppInfo</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/delivery' className=" w-[100%] h-[100%]">Delivery</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        {/* Company */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsCompany(!isCompany);
                                setIsProfile(false);
                                setIsCampaign(false);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Company <IoChevronDownSharp />
                            </span>
                            { isCompany && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/app-info' className=" w-[100%]">Add Company</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/role' className=" w-[100%] h-[100%]">
                                                Roles</Link>
                                        </li>
                                    
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
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
                                setIsCompany(false);
                                setIsProfile(false);
                                setIsCampaign(!isCampaign);
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
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/campaign/add' className=" w-[100%]">Add Campaign</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/campaign/' className=" w-[100%]">Campaign List</Link>
                                        </li>

                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        {/* Campaign Company */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsCompany(false);
                                setIsProfile(false);
                                setIsCampaignCompany(!isCampaignCompany);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Campaign By Company <IoChevronDownSharp />
                            </span>
                            { isCampaignCompany && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/campaign-company' className=" w-[100%]">Add Company Campaign</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/campaign-company/list' className=" w-[100%]">Company Campaigns</Link>
                                        </li>   
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                        </li>
                        {/* Claim */}
                        <li className="relative"
                            onClick={() => {
                                setIsSetting(false);
                                setIsUser(false);
                                setIsCompany(false);
                                setIsProfile(false);
                                setIsCampaignCompany(false);
                                setIsClaim(!isClaim);
                            }}>
                            <span className="cursor-pointer flex items-center justify-start gap-1 hover:text-blue-100">
                                Claim <IoChevronDownSharp />
                            </span>
                            { isClaim && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/claim/add' className=" w-[100%]">Add Claim</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/claim' className=" w-[100%]">Claims List</Link>
                                        </li>   
                                        <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                            <Link href='/admin/claim/user' className=" w-[100%]">User Claims </Link>
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
                        setIsCompany(false);
                        setIsCampaign(false);
                        setIsProfile(!isProfile);
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
                                    className="top-[125%] left-[-0.5rem] w-[160%] bg-blue-800 absolute z-10">
                                    <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                        <Link href='/admin/profile' className=" w-[100%]">View Profile</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                        <Link href='/admin/profile/edit' className=" w-[100%]">Edit Profile</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                        <Link href='/admin/profile/password' className=" w-[100%]">Set Password</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-blue-900">
                                        <Link href='/login' className=" w-[100%]">Login</Link></li>
                                    <li className="px-[0.5rem] py-1 hover:bg-blue-900">
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
