'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import clsx from "clsx";

const links = 
[{
    name: 'About',
    path: '/'
},
{
    name: 'Services',
    path: '/services'
},
{
    name: 'Blog',
    path: '/blog'
},
{
    name: 'Contact',
    path: '/contact'
}]
const Nav = () => {
    const pathname = usePathname();
    console.log(pathname);
  return (
    <nav className='flex gap-6 hidden md:flex lg:flex items-center justify-end gap-6 ml-auto'>
        {links.map((link, index) => {
            return <Link
            href={link.path}
            key={index}
            className={clsx(
              "capitalize font-medium transition-all duration-200",
              link.path === pathname
                ? "text-[#33d4ff] border-b-2 border-text-color"
                : "text-neutral-500 hover:text-[#33d4ff]"
            )}
          >
            {link.name}
          </Link>
        })}
    </nav>
    
  )
}

export default Nav