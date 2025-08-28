"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { TbMenu2 } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { navItems } from '@/constants/NavbarItems';
import { useSession } from 'next-auth/react';
import Logo from '@/elements/Logo';



const Navbar = () => {

    const { status } = useSession();

    const [ isOpen , setIsOpen ] = useState<boolean>(false)
    const [ isHover , setIsHover ] = useState<boolean>(false)
    const [ ShowItem , setShowItem ] = useState<boolean>(false)
    const [ navIndex, setnavIndex ] = useState<number>(0)


    const isOpenHandler = () => setIsOpen( !isOpen )
    const ShowItemHandler = () => setShowItem( !ShowItem )

    return (
        <div className="fixed w-full bg-primary-800 rounded-b-[20px]">
            <div className="container lg:py-8 py-5 text-Regular-Normal-text-1 text-primary-50">
                <div className='flex items-center md:gap-x-4 lg:gap-x-0 '>
                    <span onClick={isOpenHandler} className='text-3xl lg:hidden ml-4'>{isOpen ? <MdClose /> : <TbMenu2/>}</span>
                    <ul className='lg:flex gap-x-10 items-center flex-1  hidden' >
                        <li onMouseEnter={()=> setIsHover(true)}>
                            <Link href='/' className='flex items-center gap-x-2 w-fit hover:text-primary-400 rounded-2xl'>
                                <span className='text-2xl'>{isHover ? <MdClose /> : <TbMenu2/>}</span>
                                <p>دسته بندی محصولات</p>
                            </Link>
                        </li>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/' className='hover:text-primary-400'>خانه</Link>
                        </li>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/' className='hover:text-primary-400'>تماس با ما</Link>
                        </li>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/'className='hover:text-primary-400'>درباره ما</Link>
                        </li>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/' className='hover:text-primary-400'>بلاگ</Link>
                        </li>
                    </ul>
                    <ul className='text-primary-400 flex gap-x-4 flex-1 lg:flex-none  items-center md:w-full lg:w-fit '>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/' className='hover:text-primary-50 text-2xl'><LuSearch/></Link>
                        </li>
                        <li onMouseEnter={()=> setIsHover(false)}>
                            <Link href='/' className='hover:text-primary-50 text-2xl'><FaCartShopping/></Link>
                        </li>
                        {
                               status == "authenticated" ?
                                <li onMouseEnter={()=> setIsHover(false)}>
                                    <Link href='/dashboard' className='hover:text-primary-50 text-2xl'><IoPerson/></Link>
                                </li> : <li onMouseEnter={()=> setIsHover(false)}>
                                    <Link href='/login' className='hover:text-primary-50 text-2xl'><IoMdLogIn/></Link>
                                </li> 
                        }
                        <li className='hidden lg:flex'>
                            <Logo className='lg:w-20' pathClass='group-hover:fill-primary-50' />
                        </li>
                    </ul>
                    <Logo className='lg:hidden w-16' />
                </div>
                {
                    isHover ? <div onMouseLeave={()=> setIsHover(false)} className='pt-8 flex gap-x-8'>
                        <div className=' flex flex-col gap-y-4 border-l-2 border-primary-300 w-fit pl-7'>
                            {
                                navItems.map((it , index) => <Link  onMouseEnter={()=> setnavIndex(index)} href={it.href} key={index} className={`flex flex-col hover:cursor-pointer justify-center ${navIndex === index ? "text-primary-300" :null}`}>
                                    <span className='text-8xl'>{it.icon}</span>
                                    <p>{it.name}</p>
                                </Link>)
                            }
                        </div>
                        <ul className=' grid grid-cols-3 gap-y-4 gap-x-12 list-disc'>
                            {
                                navItems[navIndex].children.map((ch , index) => <li><Link className='hover:text-primary-400 hover:cursor-pointer' href={ch.href}>{ch.name}</Link></li>)
                            }
                        </ul>
                    </div> : null
                }
                {
                    isOpen? <div className='mt-8 mb-5'>
                        <ul className='flex flex-col gap-y-3 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-Secondary-400 scrollbar-track-Secondary-100'>
                            <li>
                                <Link onClick={ShowItemHandler} href='/' className={`py-2 px-3 ${ShowItem ? "bg-primary-600 text-primary-50" : "bg-primary-500 text-primary-50"} flex items-center gap-x-2 w-fit rounded-2xl`}>
                                    دسته بندی محصولات
                                </Link>
                            </li>
                            {ShowItem ? <li className='mr-3'>
                                {
                                    navItems.map((it, index) => <div key={index} className=''>
                                                <details className="group  ">
                                                    <summary className="flex items-center justify-between cursor-pointer">
                                                        <Link  className='p-1 flex items-center gap-x-1 group-open:text-primary-300' href={it.href}>{it.name}</Link>
                                                        <span className="text-2xl lg:text-3xl ml-3 text-primary-300 transition-transform duration-500 group-open:rotate-45"><MdArrowDropDown /></span>
                                                    </summary>
                                                    <div className='mr-8 mb-7 my-3'>
                                                            <ul className='flex flex-col gap-y-3 list-disc text-Body-RL-Small scale-up-ver-top'>
                                                            {
                                                                it?.children.map(ch => <li className='hover:cursor-pointer ' key={ch.href}><Link href={ch.href}>{ch.name}</Link></li>)
                                                            }
                                                            </ul>
                                                    </div>
                                                </details>
                                            </div> )
                                }
                            </li> : null}
                            <li >
                                <Link href='/' className='hover:text-Secondary-600'>خانه</Link>
                            </li>
                            <li >
                                <Link href='/' className='hover:text-Secondary-600'>تماس با ما</Link>
                            </li>
                            <li >
                                <Link href='/'className='hover:text-Secondary-600'>درباره ما</Link>
                            </li>
                            <li >
                                <Link href='/' className='hover:text-Secondary-600'>بلاگ</Link>
                            </li>
                            
                        </ul>
                    </div> : null
                }
            </div> 
        </div> 
    );
};

export default Navbar;