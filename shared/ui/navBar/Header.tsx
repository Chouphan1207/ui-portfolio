'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

import MobileNav from './MobileNav';
import UserGrid from '../UserGrid';
import ModeToggle from '@/components/Themes';
import { useLoading } from '@/lib/loading/loading-context';
import { NAV_LINKS } from '@/shared/config/navigation';

const Header = () => {
  const { isLoadingDone } = useLoading();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hàm cuộn mượt mà dùng chung
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isLoadingDone) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isLoadingDone]);

  return (
    <AnimatePresence>
      {isLoadingDone && (
        <motion.header
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: hidden ? -80 : 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed top-0 left-0 w-full h-20 z-9999 bg-background/40 backdrop-blur-md shadow-md flex items-center"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center gap-10">

            {/* Logo trỏ về top */}
            <button
              onClick={() => scrollToSection('hero')}
              className="rounded-sm overflow-hidden shrink-0"
              aria-label="Back to top"
            >
              <Image src="/Logo.png" alt="Logo" height={80} width={80} priority />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.sectionId}
                  href={`#${link.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault(); // Ngăn nhảy trang mặc định
                    scrollToSection(link.sectionId);
                  }}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <ModeToggle />
              <UserGrid />
              <div className="md:hidden">
                <MobileNav />
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
