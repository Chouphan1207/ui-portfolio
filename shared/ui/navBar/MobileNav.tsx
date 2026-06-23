'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'

const navLinks = [
  { name: 'About', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

const MobileNav = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnScroll = () => isOpen && setIsOpen(false)
    window.addEventListener('scroll', closeOnScroll)
    return () => window.removeEventListener('scroll', closeOnScroll)
  }, [isOpen])

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-7 right-6 z-50 text-2xl text-var(--foreground) md:hidden"
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-primary transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40 md:hidden`}
      >
        <nav className="flex flex-col items-center justify-start h-full">
            <Link href="/">
              <div className='rounded-sm overflow-hidden'>
                <Image src={"/Logo.png"} alt="Logo" height={80} width={80} />
              </div>
            </Link>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl py-4 ${
                pathname === link.path ? 
                "text-[#33d4ff]"
                : "text-neutral-500 hover:text-[#33d4ff]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
