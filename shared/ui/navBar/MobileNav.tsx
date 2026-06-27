'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'
// Import your centralized configuration (adjust path if your alias is different, e.g., @/shared/...)
import { NAV_LINKS } from '@/shared/config/navigation'

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
        className="fixed top-7 right-6 z-50 text-2xl text-foreground md:hidden"
        style={{ color: 'var(--foreground)' }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-primary transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40 md:hidden shadow-xl`}
      >
        <nav className="flex flex-col items-center justify-start h-full pt-24 gap-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className='rounded-sm overflow-hidden mb-6'>
              <Image src="/Logo.png" alt="Logo" height={80} width={80} priority />
            </div>
          </Link>

          {/* Using centralized NAV_LINKS here */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-xl py-2 w-full text-center transition-colors duration-200 ${
                pathname === link.path ?
                  "text-[#33d4ff] font-semibold" :
                  "text-neutral-500 hover:text-[#33d4ff]"
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
