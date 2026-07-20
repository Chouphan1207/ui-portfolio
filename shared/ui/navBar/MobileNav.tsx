'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NAV_LINKS } from '@/shared/config/navigation'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Hàm cuộn mượt mà
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false) // Đóng menu sau khi nhấn
  }

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
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-background transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-40 md:hidden shadow-xl`}
      >
        <nav className="flex flex-col items-center justify-start h-full pt-24 gap-4">
          <button onClick={() => scrollToSection('hero')} className='rounded-sm overflow-hidden mb-6'>
            <Image src="/Logo.png" alt="Logo" height={80} width={80} priority />
          </button>

          {/* Render danh sách sử dụng sectionId */}
          {NAV_LINKS.map((link) => (
            <button
              key={link.sectionId}
              onClick={() => scrollToSection(link.sectionId)}
              className="text-xl py-2 w-full text-center text-neutral-500 hover:text-[#33d4ff] transition-colors duration-200"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
