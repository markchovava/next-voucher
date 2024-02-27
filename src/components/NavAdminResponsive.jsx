"use client"
import React, { useState } from 'react'
import { IoChevronDownSharp } from "react-icons/io5"; 
import { motion, AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import Link from 'next/link';

function NavAdminResponsive() {
    const [isSetting, setIsSetting] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [isCompany, setIsCompany] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [ isCampaign, setIsCampaign] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


  return (
    <section className='w-[100%] lg:hidden bg-blue-800 text-white'>
        <div className="mx-auto w-[90%] py-2 flex items-center justify-end">
            { isOpen === false ?
                <GiHamburgerMenu
                    onClick={() => setIsOpen(true)} 
                    className='text-white text-xl' />
                :
                <GrClose 
                    onClick={() => setIsOpen(false)} 
                    className='text-white text-xl' />
            }
        </div>
        {isOpen &&
            <div className='mx-auto w-[100%] px-3 py-2 flex flex-col items-center justify-between'>
                <ul className="flex flex-col items-center justify-start gap-4">
                    {/* Settings */}
                    <li className="relative w-[100vw]"
                            onClick={() => {
                                setIsSetting(!isSetting);
                                setIsUser(false);
                                setIsProfile(false);
                                setIsCampaign(false);
                            }}>
                            <span className={`w-[100vw] py-2 ${isSetting && 'bg-blue-900'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                                Settings <IoChevronDownSharp />
                            </span>
                            { isSetting && 
                                <AnimatePresence>
                                    <motion.ul 
                                        initial={{ opacity:1 }}
                                        animate={{ opacity:1 }}
                                        exit={{ opacity:1 }}
                                        transition={{ duration: 0.6, type:'spring' }}
                                        className="flex flex-col items-center justify-center w-[100vw] bg-blue-800 relative">
                                        <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                            <Link 
                                                href='/admin/app-info' 
                                                className="text-center flex items-center justify-center w-[100%]" >
                                                AppInfo</Link>
                                        </li>
                                        <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                            <Link 
                                                href='/admin/role' 
                                                className="text-center flex items-center justify-center w-[100%]">
                                                Roles</Link>
                                        </li>
                                        
                                    </motion.ul>
                                </AnimatePresence> 
                            }
                    </li>
                    {/* Users */}
                    <li className="relative w-[100vw]"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(!isUser);
                            setIsCompany(false);
                            setIsProfile(false);
                        }}>
                        <span className={`w-[100vw] py-2 ${isUser && 'bg-blue-900'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Users <IoChevronDownSharp />
                        </span>
                        { isUser && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-blue-800 relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/app-info' className="text-center flex items-center justify-center w-[100%]">
                                            AppInfo</Link>
                                    </li>     
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/role' className="text-center flex items-center justify-center w-[100%]">
                                            Roles</Link>
                                    </li>
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/delivery' className="text-center flex items-center justify-center w-[100%]">
                                            Delivery</Link>
                                    </li>       
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                    {/* Company */}
                    <li className="relative w-[100vw]"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCompany(!isCompany);
                            setIsProfile(false);
                            setIsCampaign(false);
                        }}>
                        <span className={`w-[100vw] py-2 ${isCompany && 'bg-blue-900'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Company <IoChevronDownSharp />
                        </span>
                        { isCompany && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-blue-800 relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/app-info' className="text-center flex items-center justify-center w-[100%]">
                                            Add Company</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/role' className="text-center flex items-center justify-center w-[100%]">
                                            Roles</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/delivery' className="text-center flex items-center justify-center w-[100%]">
                                            Delivery</Link>
                                    </li>
                                    
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                    {/* Campaign */}
                    <li className="relative w-[100vw]"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCompany(false);
                            setIsProfile(false);
                            setIsCampaign(!isCampaign);
                        }}>
                        <span className={`w-[100vw] py-2 ${isCampaign && 'bg-blue-900'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Campaign <IoChevronDownSharp />
                        </span>
                        { isCampaign && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-blue-800 relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/app-info' className="text-center flex items-center justify-center w-[100%]">
                                            AppInfo</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/role' className="text-center flex items-center justify-center w-[100%]">
                                            Roles</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/delivery' className="text-center flex items-center justify-center w-[100%]">Delivery</Link>
                                    </li>      
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </li>
                </ul>
            {/* Profile */}
            <div className='py-2'>
                    <div className="relative"
                        onClick={() => {
                            setIsSetting(false);
                            setIsUser(false);
                            setIsCompany(false);
                            setIsCampaign(false);
                            setIsProfile(!isProfile);
                        }}>
                        <span className={`w-[100vw] py-2 ${isProfile && 'bg-blue-900'} cursor-pointer flex items-center justify-center gap-1 hover:text-slate-100`}>
                            Profile <IoChevronDownSharp />
                        </span>
                        { isProfile && 
                            <AnimatePresence>
                                <motion.ul 
                                    initial={{ opacity:1 }}
                                    animate={{ opacity:1 }}
                                    exit={{ opacity:1 }}
                                    transition={{ duration: 0.6, type:'spring' }}
                                    className="flex flex-col items-center justify-center w-[100vw] bg-blue-800 relative">
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/app-info' className="text-center flex items-center justify-center w-[100%]">
                                            AppInfo</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/role' className="text-center flex items-center justify-center w-[100%]">
                                            Roles</Link>
                                    </li>
                                
                                    <li className="px-[0.5rem] py-2 w-[100%] hover:bg-blue-900">
                                        <Link href='/admin/delivery' className="text-center flex items-center justify-center w-[100%]">Delivery</Link>
                                    </li>      
                                </motion.ul>
                            </AnimatePresence> 
                        }
                    </div>
            </div>
            </div>
        }
    </section>
  )
}

export default NavAdminResponsive