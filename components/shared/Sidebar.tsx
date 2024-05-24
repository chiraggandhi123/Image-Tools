"use client";
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { navLinks } from '../../constants'
import { usePathname } from 'next/navigation'
const Sidebar = () => {
    const pathname = usePathname();
    return (
    <aside className='sidebar'>
        <div className="flex size-full flex-col gap-4">
            < Link href={'/'} className="sidebar-logo">
                <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28}/>
            </Link>
            <nav className="sidebar-nav">
                <SignedIn>
                    <ul className="sidebar-nav_elements">
                        {navLinks.map((link)=>{
                            const isActive = link.route === pathname;
                            return (
                                <Link key={link.route} className='sidebar-link' href={link.route}>   
                                    <Image src={link.icon}
                                    alt="logo"
                                    width={24}
                                    height={24}
                                    className={`${isActive && 'brightness-200'}`}/>
                                    {link.label}
                                </Link>
                            )
                        })}
                        <li className="flex-center cursor-pointer gap-2 p-4">
                            <UserButton afterSignOutUrl='/' showName/>
                        </li>
                    </ul>
                </SignedIn>
                <SignedOut>
                    <button  className='button bg-purple-gradient bg-cover'>
                        <Link href='/sign-in'>Login</Link>
                    </button>
                </SignedOut>

            </nav> 
        </div>
    </aside>
  )
}

export default Sidebar
