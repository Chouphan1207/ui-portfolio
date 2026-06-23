'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './navBar/Nav';
import MobileNav from './navBar/MobileNav';
import ModeToggle from '@/components/Themes';
import UserGrid from './UserGrid';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/lib/loading/loading-context';

const Header = () => {
  const { isLoadingDone } = useLoading();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  if (!isLoadingDone) return;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY, isLoadingDone]);

  return (
    <AnimatePresence>
      {isLoadingDone && (
        <motion.header
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`fixed top-0 w-full z-[9999] transform transition-transform duration-500 ease-in-out ${hidden ? '-translate-y-full' : 'translate-y-0'}`}

        >
          <div className='py-5 w-full flex justify-center items-center bg-background/70 backdrop-blur-md shadow-md h-20'>
            <div className='w-full md:px-1 max-w-screen-xl mx-auto'>
              <div className='flex justify-between items-center gap-10'>
                <Link href="/">
                  <div className='rounded-sm overflow-hidden'>
                    <Image src={"/Logo.png"} alt="Logo" height={80} width={80} />
                  </div>
                </Link>

                <Nav />

                <div className='flex items-center gap-20'>
                  <ModeToggle />
                  <UserGrid />
                  <div className='lg:hidden xl:hidden'>
                    <MobileNav />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
