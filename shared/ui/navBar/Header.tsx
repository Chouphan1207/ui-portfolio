'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { AnimatePresence } from 'framer-motion';

// Component Imports (Adjusted based on your ui barrel index)
import Nav from './Nav';
import MobileNav from './MobileNav';
import UserGrid from '../UserGrid';
import ModeToggle from '@/components/Themes';

import { useLoading } from '@/lib/loading/loading-context';

const Header = () => {
  const { isLoadingDone } = useLoading();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle smart scroll visibility logic
  useEffect(() => {
    if (!isLoadingDone) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        // Hide header if scrolling down and past 80px threshold
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
          className="fixed top-0 left-0 w-full h-20 z-9999 bg-background/20 backdrop-blur-md shadow-md flex items-center"
        >
          {/* Inner Content Wrapper */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center gap-10">

            {/* Logo Brand Link */}
            <Link href="/" className="rounded-sm overflow-hidden shrink-0">
              <Image src="/Logo.png" alt="Logo" height={80} width={80} priority />
            </Link>

            {/* Desktop Navigation */}
            <Nav />

            {/* Actions & Responsive Switcher */}
            <div className="flex items-center gap-6 md:gap-10">
              <ModeToggle />
              <UserGrid />

              {/* Responsive Mobile Menu wrapper */}
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
